import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomErrorCode } from '../exception/custom-error-code';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                errorCode: CustomErrorCode.VALIDATION_BAD_REQUEST,
                message: (exception.getResponse())['message'],
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}