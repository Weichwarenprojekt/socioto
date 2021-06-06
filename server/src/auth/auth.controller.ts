import { Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  public async login(@Req() request: Request): Promise<any> {
    return this.authService.login(request.user);
  }

  @Public()
  @Put('register')
  public async register(@Req() request: Request): Promise<any> {
    const username = request.body.username;
    const password = request.body.password;

    return this.authService.register(username, password);
  }
}
