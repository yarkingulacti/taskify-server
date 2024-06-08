import { Inject, Injectable } from '@nestjs/common';
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
    return this.prisma.task.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateDto) {
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
