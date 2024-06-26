import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './setup-swagger';
import cors from 'cors';

export const PORT_API = Number(process.env.PORT_API);

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const appReflector = app.get(Reflector);

  const pipes = [new ValidationPipe()];
  const interceptors = [new ClassSerializerInterceptor(appReflector)];

  app.use(cors());
  app.use(cookieParser());
  app.useGlobalPipes(...pipes);
  app.useGlobalInterceptors(...interceptors);

  setupSwagger(app);

  await app.listen(PORT_API);
};

bootstrap();
