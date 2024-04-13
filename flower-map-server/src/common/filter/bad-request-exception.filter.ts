import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomErrorCode } from '../exception/custom-error-code';

/**
 * class-validator에서 발생시키는 모든 예외가 BadRequestException으로 나가기 때문에 해당 예외만을 타겟팅.
 * @todo 만약 class-validator가 발생시킨 예외가 아니라면 추적해서 따로 핸들링 과정 추가해야함.
 */
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                errorCode: CustomErrorCode.VALIDATION_BAD_REQUEST.errorCode,
                message: exception.getResponse()['message'],
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}