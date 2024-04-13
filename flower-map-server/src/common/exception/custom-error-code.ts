import { HttpStatus } from "@nestjs/common";

export const CustomErrorCode = {
    // 공통
    /** 서버 측 에러 관리자 문의 요망 */
    INTERNAL_SERVER_ERROR: {
        errorCode: '500',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    /** 데이터 유효성 검사 통과 실패 */
    VALIDATION_BAD_REQUEST: {
        errorCode: 'V400',
        statusCode: HttpStatus.BAD_REQUEST
    },

    // Flower
    /** 존재하지 않는 Flower */
    FLOWER_NOT_FOUND: {
        errorCode: 'FL404',
        statusCode: HttpStatus.NOT_FOUND
    },

    // Feed
    /** 존재하지 않는 Feed */
    FEED_NOT_FOUND: {
        errorCode: 'F404',
        statusCode: HttpStatus.NOT_FOUND
    },
    /** Feed에 대한 접근 권한이 없음 */
    FEED_UNAUTHORIZED: {
        errorCode: 'FU401',
        statusCode: HttpStatus.UNAUTHORIZED
    },

    // Location
    /** 존재하지 않는 Location */
    LOCATION_NOT_FOUND: {
        errorCode: 'L404',
        statusCode: HttpStatus.NOT_FOUND
    },

    // Image
    /** 존재하지 않는 Image */
    IMAGE_NOT_FOUND: {
        errorCode: 'I404',
        statusCode: HttpStatus.NOT_FOUND
    },
    /** 지원하지 않는 Image 확장자 타입 */
    IMAGE_UNSUPPORTED_EXT: {
        errorCode: 'IUE400',
        statusCode: HttpStatus.BAD_REQUEST
    },
} as const;
export type CustomErrorCode = typeof CustomErrorCode[keyof typeof CustomErrorCode];