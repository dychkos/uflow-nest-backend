import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TaskService } from './task/task.service';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  console.log('App was started on port 4000');

  await app.get(TaskService).refresh();
  await app.get(UserService).refresh();
  await app.listen(4000);
}
bootstrap();
