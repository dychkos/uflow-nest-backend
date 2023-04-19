import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Flow, User } from '@prisma/client';

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
}
