import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomHttpException } from '../exception/custom-http-exception';

@Catch(CustomHttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
    catch(exception: CustomHttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        // 응답값
        response
            .status(status)
            .json({
                statusCode: status,
                errorCode: exception.errorCode,
                message: exception.getResponse(),
                timestamp: new Date().toISOString(),
                path: request.url
            });
    }
}