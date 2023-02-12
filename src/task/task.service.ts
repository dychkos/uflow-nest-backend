import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(flowId: string, userId: string, dto: CreateTaskDto) {
    const userFlow = await this.prisma.flow.findFirst({
      where: { id: flowId, userId: userId },
    });

    if (!userFlow) {
      throw new BadRequestException('Invalid flow id argument');
    }

    const task = await this.prisma.task.create({
      data: {
        flowId: flowId,
        how_many: dto.how_many,
        action: dto.action,
        reward: dto.reward,
        unit: dto.unit,
      },
    });

    const days = dto.days.map((dayId: number) => ({
      dayId: +dayId,
      taskId: task.id,
    }));

    try {
      await this.prisma.daysOnTasks.createMany({
        data: days,
      });
    } catch (e) {
      if (e.code === 'P2003') {
        throw new ForbiddenException('Provide correct Days values [1-7]');
      }
    }

    return await this.prisma.task.findFirst({
      where: { id: task.id, flowId: flowId },
      include: {
        days: {
          include: { day: true },
        },
      },
    });
  }

  async update(id: string, flowId: string, userId: string, dto: UpdateTaskDto) {
    const flow = this.checkDoesExistFlow(flowId, userId);

    if (!flow) {
      throw new ForbiddenException('Provide correct flow id');
    }

    if (dto.days) {
      const days = dto.days.map((dayId: number) => ({
        dayId: +dayId,
        taskId: id,
      }));

      await this.prisma.daysOnTasks.deleteMany({
        where: { taskId: id },
      });

      await this.prisma.daysOnTasks.createMany({
        data: days,
      });
    }

    return await this.prisma.task.update({
      where: { id },
      data: {
        action: dto.action,
        how_many: dto.how_many,
        unit: dto.unit,
        reward: dto.reward,
        done: dto.done,
      },
      include: { days: { include: { day: true } } },
    });
  }

  async remove(id: string, flowId: string, userId: string) {
    const flow = this.checkDoesExistFlow(flowId, userId);

    if (!flow) {
      throw new ForbiddenException('Provide correct flow id');
    }

    return await this.prisma.task.delete({ where: { id } });
  }

  async findOne(id: string, flowId: string, userId: string) {
    const flow = this.checkDoesExistFlow(flowId, userId);

    if (!flow) {
      throw new ForbiddenException('Provide correct flow id');
    }
    const task = await this.prisma.task.findFirst({
      where: { id },
      include: {
        days: {
          include: {
            day: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async findAll(flowId: string, userId: string) {
    const flow = this.checkDoesExistFlow(flowId, userId);

    if (!flow) {
      throw new ForbiddenException('Provide correct flow id');
    }

    return this.prisma.task.findMany({
      where: { flowId: flowId },
      include: { days: { include: { day: true } } },
    });
  }

  private async checkDoesExistFlow(flowId: string, userId: string) {
    return await this.prisma.flow.findFirst({
      where: { id: flowId, userId: userId },
    });
  }
}
