import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/sales');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(AppModule.port);
}
bootstrap();
