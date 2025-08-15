import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

interface HttpErrorResponseObject {
  message?: string | string[];
  [key: string]: any;
}

type HttpErrorResponse = string | HttpErrorResponseObject;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string | string[];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const res = exception.getResponse() as HttpErrorResponse;

      if (typeof res === 'string') {
        message = res;
      } else if (res && typeof res === 'object') {
        if (Array.isArray(res.message)) {
          message = res.message;
        } else if (typeof res.message === 'string') {
          message = res.message;
        } else {
          message = JSON.stringify(res);
        }
      } else {
        message = 'Unexpected error response format';
      }
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    const errorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    if (
      statusCode === (HttpStatus.INTERNAL_SERVER_ERROR as unknown as number)
    ) {
      this.logger.error(
        exception instanceof Error
          ? (exception.stack ?? exception.message)
          : JSON.stringify(exception),
      );
    } else {
      this.logger.warn(JSON.stringify(errorResponse));
    }

    response.status(statusCode).json(errorResponse);
  }
}
