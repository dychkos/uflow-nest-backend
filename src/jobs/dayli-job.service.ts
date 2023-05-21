import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';

@Injectable()
export class DailyJobService {
  constructor(
    private schedulerRegistry: SchedulerRegistry, // private userService: UserService, // private taskService: TaskService,
  ) {}

  // @Cron('0 0 * * *') // Runs at the start of every day (midnight)
  // handleCron() {
  //   console.log('Starting a new day!');
  //   // Your code here
  // }

  // @Cron('*/2 * * * * *') // Runs every 2 seconds
  @Cron('0 0 * * *') // Run at 12:00 AM every day
  async handleCron() {
    console.log('Running midnight job!');
    // await this.userService.refresh();
    // await this.taskService.refresh();
  }
}
