import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FlowService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createFlowDto: CreateFlowDto) {
    return await this.prisma.flow.create({
      data: {
        title: createFlowDto.title,
        userId: userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.flow.findMany({
      where: { userId },
    });
  }

  async findOne(id: number, userId: number) {
    const flow = await this.prisma.flow.findFirst({
      where: { id, userId },
    });

    if (!flow) {
      throw new NotFoundException();
    }
    delete flow.userId;

    return flow;
  }

  async update(id: number, userId: number, updateFlowDto: UpdateFlowDto) {
    const flow = await this.prisma.flow.findFirst({
      where: { id, userId },
    });

    if (!flow) {
      throw new NotFoundException();
    }

    return await this.prisma.flow.update({
      where: { id: flow.id },
      data: updateFlowDto,
    });
  }

  async remove(id: number, userId: number) {
    let flow = await this.prisma.flow.findFirst({
      where: { id, userId },
    });

    if (!flow) {
      throw new NotFoundException();
    }

    flow = await this.prisma.flow.delete({
      where: { id: flow.id },
    });

    return {
      message: 'Removed successful!',
      data: flow,
    };
  }
}
