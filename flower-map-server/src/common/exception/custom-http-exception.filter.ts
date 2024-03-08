import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomErrorCode } from './custom-error-code';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const statusCode = exception.getStatus();
        const errorResponse = exception.getResponse();

        response
            .status(statusCode)
            .json({
                errorCode: errorResponse['error'] === 'Bad Request'
                    ? CustomErrorCode.VALIDATION_BAD_REQUEST
                    : errorResponse['error'],
                message: errorResponse['message'],
                statusCode: statusCode,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}