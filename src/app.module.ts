import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoryModule } from './history/history.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
