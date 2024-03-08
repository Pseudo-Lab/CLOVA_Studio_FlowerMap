export enum CustomErrorCode {
    // 공통
    INTERNAL_SERVER_ERROR = '500',
    VALIDATION_BAD_REQUEST = "V400",

    // Feed
    FEED_NOT_FOUND = 'F404',

    // Location
    LOCATION_NOT_FOUND = "L404",

    // Image
    IMAGE_NOT_FOUND = "I404"
}