import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User): Promise<User> {
    return this.service.getUser(user.id);
  }
}
