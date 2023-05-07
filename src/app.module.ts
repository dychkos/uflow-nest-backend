import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { FlowModule } from './flow/flow.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DailyJobService } from './jobs/dayli-job.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    TaskModule,
    FlowModule,
    ScheduleModule.forRoot(),
  ],
  providers: [DailyJobService],
})
export class AppModule {}
