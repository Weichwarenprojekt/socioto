import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Validates the authentication data provided by the request
   * @param username  The username of the user
   * @param password  The password of the user
   */
  public async validate(
    username: string,
    password: string,
  ): Promise<{ id: number; username: string }> {
    const user = await this.authService.authenticateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { id: user.id, username: user.username };
  }
}
