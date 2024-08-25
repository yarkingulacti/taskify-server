import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { urlencoded, json } from 'express';
import { PrismaClient } from '@prisma/client';
import { GlobalExceptionsFilter } from './filters/GlobalExceptions.filter';
import { AppModule } from './app.module';
import { PasswordTool } from './helpers/password.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: process.env.APP_CORS_ORIGINS.split('|'),
  });
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const db = new PrismaClient();

  const data = {
    first_name: 'Yarkin',
    last_name: 'Gulacti',
    email: 'yarkingulacti98@hotmail.com',
    username: 'yarkingulacti',
    password: PasswordTool.hashPassword(process.env.DEFAULT_PASSWORD),
  };

  db.user
    .upsert({
      where: { username: 'yarkingulacti' },
      update: data,
      create: data,
    })
    .then(() => {
      logger.log('🤡 Default user created');
    })
    .catch((error) => {
      logger.error('💩 Default user creation failed. Error: ', error);
    });

  await app.listen(process.env.APP_PORT);

  logger.verbose(`======================================================`);
  logger.verbose(`   🚀 Server is running 🚀`);
  logger.verbose(`      PORT: ${process.env.APP_PORT}`);
  logger.verbose(`      URL: ${await app.getUrl()}`);
  logger.verbose(`======================================================`);
}
bootstrap();
