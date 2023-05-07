import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class DailyJobService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  // @Cron('0 0 * * *') // Runs at the start of every day (midnight)
  // handleCron() {
  //   console.log('Starting a new day!');
  //   // Your code here
  // }

  @Cron('*/2 * * * * *') // Runs every 2 seconds
  handleCron() {
    console.log('Running the job every 2 seconds!');
  }
}
