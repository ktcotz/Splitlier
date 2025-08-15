import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env';
import { setupSwagger } from './swagger/swagger.config';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './common/all-exception-filter';

async function bootstrap() {
  const logger = new LoggerService();

  const app = await NestFactory.create(AppModule, { logger });

  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  setupSwagger(app);

  await app.listen(env.PORT);

  Logger.log(`Server running on http://localhost:${env.PORT}`);
}

bootstrap();
