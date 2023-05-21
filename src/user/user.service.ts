import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Flow, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

interface UserWithChosenFlow extends User {
  chosenFlow?: Flow;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: string): Promise<UserWithChosenFlow> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    delete user.password;

    const chosenFlow = await this.prisma.flow.findFirst({
      where: { userId: user.id, chosen: true },
    });

    return {
      ...user,
      chosenFlow,
    };
  }

  async update(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
    });

    delete user.password;

    return user;
  }

  async refresh() {
    console.log('refreshing user');
    return this.prisma.user.updateMany({
      data: { doneTasks: 0, earnedCoins: 0 },
    });
  }
}
