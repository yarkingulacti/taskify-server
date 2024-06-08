import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import CreateDto from './dto/request/Create.dto';
import UpdateDto from './dto/request/Update.dto';
import ListDto from './dto/request/List.dto';

@Injectable()
export class TaskService {
  @Inject(PrismaService) private readonly prisma: PrismaService;

  async create(data: CreateDto) {
    return this.prisma.task.create({
      data,
    });
  }

  async get(id: string) {
    if ((await this.prisma.task.findUnique({ where: { id } })) === null)
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);

    return this.prisma.task.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    if ((await this.get(id)) === null)
      throw new HttpException(
        'Task to be deleted not found',
        HttpStatus.NOT_FOUND,
      );

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateDto) {
    if ((await this.get(id)) === null)
      throw new HttpException(
        'Task to be updated not found',
        HttpStatus.NOT_FOUND,
      );

    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async list(query: ListDto) {
    return this.prisma.task.findMany({
      skip: query.skip || 0,
      take: query.take || 10,
      where: {
        OR: query.search
          ? [
              {
                title: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            ]
          : undefined,
      },
    });
  }
}
