import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import CreateDto from './dto/request/Create.dto';
import TaskDto from './dto/response/Task.dto';
import UpdateDto from './dto/request/Update.dto';
import ListDto from './dto/request/List.dto';
import { PaginationResponse } from '../common/dto/PaginationResponse.dto';

@Controller()
export class TaskController {
  @Inject(TaskService) private readonly service: TaskService;

  @Post()
  async create(@Body() data: CreateDto): Promise<TaskDto> {
    return this.service.create(data);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<TaskDto> {
    return this.service.get(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<TaskDto> {
    return this.service.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateDto,
  ): Promise<TaskDto> {
    return this.service.update(id, data);
  }

  @Get()
  async list(@Query() query: ListDto): Promise<PaginationResponse<TaskDto>> {
    const [items, totalCount] = await this.service.list(query);

    const res = new PaginationResponse<TaskDto>();

    res.items = items;
    res.meta = {
      currentPage: Math.floor(query.skip / query.take) + 1,
      totalPages: Math.ceil(totalCount / query.take),
      currentPageSize: items.length,
      totalItemsCount: totalCount,
    };

    return res;
  }
}
