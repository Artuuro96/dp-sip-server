import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/orders');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(AppModule.port);
}
bootstrap();
