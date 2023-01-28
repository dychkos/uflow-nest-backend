import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.service.createTask(dto);
  }
}
