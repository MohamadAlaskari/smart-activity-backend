import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let stack: string | undefined;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            if (typeof res === 'string') {
                message = res;
            } else if (typeof res === 'object' && res !== null) {
                message = (res as any).message || message;
            }
            stack = exception.stack;
        } else if (exception instanceof Error) {
            message = exception.message;
            stack = exception.stack;
        }

        const logMessage = `HTTP ${status} - ${request.method} ${request.url}`;

        if (status >= 500) {
            this.logger.error(logMessage, stack);
        } else if (status >= 400) {
            this.logger.warn(logMessage);
        } else {
            this.logger.log(logMessage);
        }

        response.status(status).json({
            statusCode: status,
            path: request.url,
            method: request.method,
            timestamp: new Date().toISOString(),
            error: { message },
        });
    }
}
