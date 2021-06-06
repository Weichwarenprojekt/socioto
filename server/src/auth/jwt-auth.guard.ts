import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super();
  }

  /**
   * Route handler for routes
   * @param context The execution handler of the route
   */
  canActivate(context: ExecutionContext) {
    // Public routes don't need to be guarded
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return this.validateRequest(context);
  }

  /**
   * Validates a request based on two requirements:
   *    1. Is the token issued by this server?
   *    2. Is the token valid?
   *
   * The request needs to have a Bearer authorization token
   * @param context
   */
  async validateRequest(context: ExecutionContext): Promise<boolean> {
    const authorizationHeader = context
      .switchToHttp()
      .getRequest()
      .headers.authorization?.split(' ')[1];

    try {
      this.jwtService.verify(authorizationHeader);
    } catch (error) {
      // if the token is expired it needs to be deleted from the database
      if (error.name === 'TokenExpiredError') {
        await this.authService.deleteIssuedToken(authorizationHeader);
      }
      throw new UnauthorizedException(error);
    }

    return await this.authService.checkIfTokenIssued(authorizationHeader);
  }
}
