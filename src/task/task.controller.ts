import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('flows/:flow_id/tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @Post()
  create(
    @GetUser('id') userId: string,
    @Param('flow_id') flowId: string,
    @Body() dto: CreateTaskDto,
  ) {
    return this.service.createTask(flowId, userId, dto);
  }

  @Get(':id')
  findOne(
    @GetUser('id') userId: string,
    @Param('flow_id') flowId: string,
    @Param('id') id: string,
  ) {
    return this.service.findOne(id, flowId, userId);
  }

  @Get()
  findAll(@GetUser('id') userId: string, @Param('flow_id') flowId: string) {
    return this.service.findAll(flowId, userId);
  }

  @Patch(':id')
  update(
    @GetUser('id') userId: string,
    @Param('flow_id') flowId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.service.update(id, flowId, userId, dto);
  }

  @Delete(':id')
  remove(
    @GetUser('id') userId: string,
    @Param('flow_id') flowId: string,
    @Param('id') id: string,
  ) {
    return this.service.remove(id, flowId, userId);
  }
}
