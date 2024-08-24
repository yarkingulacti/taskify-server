import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { GlobalExceptionsFilter } from './filters/GlobalExceptions.filter';
import { PasswordTool } from './helpers/password.helper';
import { PrismaClient } from '@prisma/client';

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
