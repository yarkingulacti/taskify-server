import { Module } from '@nestjs/common';
import { HistoryModule } from './api/v1/history/history.module';
import { TaskModule } from './api/v1/task/task.module';

@Module({
  imports: [TaskModule, HistoryModule],
})
export class AppModule {}
