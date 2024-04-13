import { HttpException, HttpExceptionOptions } from "@nestjs/common";
import { CustomErrorCode } from "./custom-error-code";

/**
 * 의도적으로 예외를 발생시켜 http응답을 하고자 할때 사용.
 * Nest.js에서 기본제공되는 HttpException에 errorCode를 추가한 것.
 */
export class CustomHttpException extends HttpException {
    readonly customErrorCode: CustomErrorCode;
    /**
     * @param customErrorCode CustomErrorCode.
     * @param response Optional. 추가적으로 전할 message가 존재한다면 작성.
     * @param options Optional. HttpException과 동일.
     * @example throw new CustomHttpException(CustomErrorCode.VALIDATION_BAD_REQUEST);
     *          throw new CustomHttpException(CustomErrorCode.VALIDATION_BAD_REQUEST, '잘못된 값으로 요청했어요!');
     */
    constructor(
        customErrorCode: CustomErrorCode,
        response?: string | Record<string, any>,
        options?: HttpExceptionOptions
    ) {
        super(response, customErrorCode.statusCode, options);
        this.customErrorCode = customErrorCode;
    }
}