import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto';

@Injectable()
export class TaskService {
  createTask(dto: CreateTaskDto) {
    this;
  }
}
