import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { HistoryModule } from './api/v1/history/history.module';
import { TaskModule } from './api/v1/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register([
      {
        path: 'task',
        module: TaskModule,
      },
      {
        path: 'history',
        module: HistoryModule,
      },
    ]),
    TaskModule,
    HistoryModule,
  ],
})
export class AppModule {}
