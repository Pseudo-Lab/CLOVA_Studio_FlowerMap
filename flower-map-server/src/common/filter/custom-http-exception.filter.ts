import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomHttpException } from '../exception/custom-http-exception';

/**
 * CustomHttpException 핸들러.
 */
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
                errorCode: exception.customErrorCode.errorCode,
                message: exception.getResponse(), // 예외를 발생시킬때, response에 추가적으로 작성한 부분. 없으면 나가지 않음
                timestamp: new Date().toISOString(),
                path: request.url
            });
    }
}