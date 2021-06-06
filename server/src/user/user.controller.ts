import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  public async getUserData(@Param('id') id): Promise<User> {
    return await this.userService.get(id);
  }
}
