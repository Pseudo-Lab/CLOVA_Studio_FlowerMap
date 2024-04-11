import { HttpException, HttpExceptionOptions, HttpStatus } from "@nestjs/common";
import { CustomErrorCode } from "./custom-error-code";

export class CustomHttpException extends HttpException {
    readonly errorCode: CustomErrorCode;

    constructor(
        status: HttpStatus,
        errorCode: CustomErrorCode,
        response?: string | Record<string, any>,
        options?: HttpExceptionOptions
    ) {
        super(response, status, options);
        this.errorCode = errorCode;
    }
}