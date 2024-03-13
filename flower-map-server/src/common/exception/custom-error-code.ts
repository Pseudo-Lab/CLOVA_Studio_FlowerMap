export enum CustomErrorCode {
    // 공통
    INTERNAL_SERVER_ERROR = '500', // 서버 측 에러 관리자 문의 요망
    VALIDATION_BAD_REQUEST = 'V400', // 데이터 유효성 검사 통과 실패

    // Feed
    FEED_NOT_FOUND = 'F404', // 존재하지 않는 Feed

    // Location
    LOCATION_NOT_FOUND = 'L404', // 존재하지 않는 Location

    // Image
    IMAGE_NOT_FOUND = 'I404', // 존재하지 않는 Image
    IMAGE_UNSUPPORTED_EXT = 'IUE400', // 지원하지 않는 Image 확장자 타입
    FEED_UNAUTHORIZED = 'FU401' // Feed에 대한 접근 권한이 없음
}