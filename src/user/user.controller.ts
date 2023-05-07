import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User): Promise<User> {
    return this.service.getUser(user.id);
  }

  @Patch()
  update(@GetUser() user: User, @Body() dto: UpdateUserDto): Promise<User> {
    return this.service.update(user.id, dto);
  }
}
