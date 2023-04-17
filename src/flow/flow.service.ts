import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FlowService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createFlowDto: CreateFlowDto) {
    return await this.prisma.flow.create({
      data: {
        title: createFlowDto.title,
        userId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.flow.findMany({
      where: { userId },
      include: {
        tasks: true,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const flow = await this.prisma.flow.findFirst({
      where: { id, userId },
      include: {
        tasks: true,
      },
    });

    if (!flow) {
      throw new NotFoundException();
    }
    delete flow.userId;

    return flow;
  }

  async update(id: string, userId: string, updateFlowDto: UpdateFlowDto) {
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

  async remove(id: string, userId: string) {
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
