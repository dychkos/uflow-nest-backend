import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

interface TaskWithDays extends Task {
  days?: number[];
}

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(
    flowId: string,
    userId: string,
    dto: CreateTaskDto,
  ): Promise<TaskWithDays> {
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

    const daysArr = await this.prisma.day.findMany({
      where: {
        id: {
          in: days.map((day) => day.dayId),
        },
      },
    });

    return {
      ...task,
      days: daysArr.map((day) => day.id),
    };
  }

  async update(
    id: string,
    flowId: string,
    userId: string,
    dto: UpdateTaskDto,
  ): Promise<TaskWithDays> {
    const flow = await this.checkDoesExistFlow(flowId, userId);

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

      try {
        await this.prisma.daysOnTasks.createMany({
          data: days,
        });
      } catch (e) {
        if (e.code === 'P2003') {
          throw new ForbiddenException('Provide correct Days values [1-7]');
        }
      }
    }

    const task = await this.prisma.task.update({
      where: { id },
      data: {
        action: dto.action,
        how_many: dto.how_many,
        unit: dto.unit,
        reward: dto.reward,
        done: dto.done,
      },
    });

    const daysArr = await this.prisma.daysOnTasks.findMany({
      where: { taskId: id },
    });

    return {
      ...task,
      days: daysArr.map((day) => day.dayId),
    };
  }

  async remove(id: string, flowId: string, userId: string) {
    const flow = await this.checkDoesExistFlow(flowId, userId);

    if (!flow) {
      throw new ForbiddenException('Provide correct flow id');
    }

    return await this.prisma.task.delete({ where: { id } });
  }

  async findOne(
    id: string,
    flowId: string,
    userId: string,
  ): Promise<TaskWithDays> {
    const flow = await this.checkDoesExistFlow(flowId, userId);

    if (!flow) {
      throw new ForbiddenException('Provide correct flow id');
    }
    const task = await this.prisma.task.findFirst({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException();
    }

    const daysArr = await this.prisma.daysOnTasks.findMany({
      where: { taskId: id },
    });

    return {
      ...task,
      days: daysArr.map((day) => day.dayId),
    };
  }

  async findAll(flowId: string, userId: string): Promise<TaskWithDays[]> {
    console.log(flowId, userId);
    const flow = await this.checkDoesExistFlow(flowId, userId);
    console.log(flow);

    if (!flow) {
      throw new ForbiddenException('Provide correct flow id');
    }

    const tasks = await this.prisma.task.findMany({
      where: { flowId: flowId },
    });

    const final = [];

    for (const tasksKey in tasks) {
      const daysArr = await this.prisma.daysOnTasks.findMany({
        where: { taskId: tasks[tasksKey].id },
      });

      final.push({
        ...tasks[tasksKey],
        days: daysArr.map((day) => day.dayId),
      });
    }

    return final;
  }

  private async checkDoesExistFlow(flowId: string, userId: string) {
    return await this.prisma.flow.findFirst({
      where: { id: flowId, userId: userId },
    });
  }

  public async refresh() {
    return this.prisma.task.updateMany({
      data: { done: false },
    });
  }
}
