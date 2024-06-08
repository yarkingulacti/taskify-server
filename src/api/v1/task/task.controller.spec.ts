import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TaskService } from './task.service';
import CreateDto from './dto/request/Create.dto';

describe('TaskController', () => {
  let controller: TaskController;
  const createdTaskIds: string[] = [];
  const taskData: CreateDto = {
    title: 'Task 1',
    description: 'Description 1',
  };
  const taskList: (CreateDto & { id?: string })[] = [
    {
      title: 'Task 1',
      description: 'Description 1',
    },
    {
      title: 'Task 2',
      description: 'Description 2',
    },
    {
      title: 'Task 3',
      description: 'Description 3',
    },
    {
      title: 'Task 4',
      description: 'Description 4',
    },
    {
      title: 'Task 5',
      description: 'Description 5',
    },
    {
      title: 'Task 6',
      description: 'Description 6',
    },
    {
      title: 'Task 7',
      description: 'Description 7',
    },
    {
      title: 'Task 8',
      description: 'Description 8',
    },
    {
      title: 'Task 9',
      description: 'Description 9',
    },
    {
      title: 'Task 10',
      description: 'Description 10',
    },
    {
      title: 'Task 11',
      description: 'Description 11',
    },
    {
      title: 'Task 12',
      description: 'Description 12',
    },
    {
      title: 'Task 13',
      description: 'Description 13',
    },
    {
      title: 'Task 14',
      description: 'Description 14',
    },
    {
      title: 'Task 15',
      description: 'Description 15',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, PrismaService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('task retreived', async () => {
    const task = await controller.get(createdTaskIds[0]);
    expect(task).toHaveProperty('id');
    expect(task.title).toBe(taskData.title);
    expect(task.description).toBe(taskData.description);
  });

  it('another task created', async () => {
    const created = await controller.create({
      title: 'Task N',
      description: 'Description N',
    });
    expect(created).toHaveProperty('id');
    createdTaskIds.push(created.id);
  });

  it('task list count should be 10', async () => {
    for (const index in taskList) {
      const { id } = await controller.create(taskList[index]);
      createdTaskIds.push(id);
    }

    const tasks = await controller.list({
      take: 10,
      skip: 3,
    });
    expect(tasks.length).not.toBe(10);
  });

  it('task updated', async () => {
    const updatedTask = await controller.update(createdTaskIds[0], {
      title: 'Task 2',
      description: 'Description 2',
    });
    expect(updatedTask).toHaveProperty('id');
    expect(updatedTask.title).toBe('Task 2');
    expect(updatedTask.description).toBe('Description 2');
  });

  it('task deleted', async () => {
    const deletedTask = await controller.delete(createdTaskIds[0]);
    expect(deletedTask).toHaveProperty('id');
    const task = await controller.get(createdTaskIds[0]);
    expect(task).toBeNull();
  });

  afterAll(async () => {
    for (const id of createdTaskIds) {
      await controller.delete(id);
    }
  });
});
