import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env';
import { setupSwagger } from './swagger/swagger.config';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './common/all-exception-filter';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new LoggerService();

  const app = await NestFactory.create(AppModule, { logger });
  const isProd = env.NODE_ENV === 'production';

  if (isProd) {
    app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginOpenerPolicy: { policy: 'same-origin' },
        crossOriginResourcePolicy: { policy: 'same-site' },
        crossOriginEmbedderPolicy: false,
        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
        referrerPolicy: { policy: 'no-referrer' },
        noSniff: true,
        xssFilter: true,
      }),
    );
  } else {
    app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginOpenerPolicy: false,
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        crossOriginEmbedderPolicy: false,
        referrerPolicy: { policy: 'no-referrer' },
      }),
    );
  }

  app.enableCors(
    isProd
      ? {
          origin: ['https://api.splitlier.com'],
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        }
      : {
          origin: '*',
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        },
  );

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
