import { Image } from "../entities/image.entity";

export class CreateImageDto {

    userIp: string;
    originUrl: string;
    originETag: string;
    thumbUrl: string;
    thumbETag: string;

    constructor(
        userIp: string,
        originUrl: string,
        originETag: string,
        thumbUrl: string,
        thumbETag: string,
    ) {
        this.userIp = userIp;
        this.originUrl = originUrl;
        this.originETag = originETag;
        this.thumbUrl = thumbUrl;
        this.thumbETag = thumbETag;
    }

    toEntity(): Image {
        const image = new Image();

        image.userIp = this.userIp;
        image.originUrl = this.originUrl;
        image.originETag = this.originETag;
        image.thumbUrl = this.thumbUrl;
        image.thumbETag = this.thumbETag;

        return image;
    }
}
