// 📁 src/common/filters/global-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = exception.getResponse?.();

    this.logger.error(
      `Error ${status} on ${request.method} ${request.url}`,
      exception,
    );

    response.status(status).json({
      statusCode: status,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      error:
        typeof errorResponse === 'string'
          ? { message: errorResponse }
          : errorResponse,
    });
  }
}
