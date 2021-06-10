import { Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { NoAuth } from './decorators/no-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @NoAuth()
  @Post('login')
  public async login(@Req() request: Request): Promise<any> {
    return this.authService.login(request.user);
  }

  @NoAuth()
  @Put('register')
  public async register(@Req() request: Request): Promise<any> {
    const username = request.body.username;
    const password = request.body.password;

    return this.authService.register(username, password);
  }
}
