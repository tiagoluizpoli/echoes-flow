import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { env } from 'src/shared-modules/core';

export class ExceptionResponseDto {
  statusCode: number;
  message: string;
  name: string;
  cause?: any;
  timestamp: string;
  stack?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    this.logger.error(`Exception: ${exception.message}, status: ${status}`);

    const error: ExceptionResponseDto = {
      statusCode: status,
      name: exception.name,
      message: exception.message,
      cause: exception.cause,
      timestamp: new Date().toISOString(),
    };

    const { NODE_ENV, DEBUG } = env;
    const isDevelopment = NODE_ENV === 'development';

    if (isDevelopment && DEBUG) {
      Object.assign(error, { stack: exception.stack });
    }

    response.status(status).json(error);
  }
}
