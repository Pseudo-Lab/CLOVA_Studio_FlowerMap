import { ApiProperty } from "@nestjs/swagger";
import { Image } from "../entities/image.entity";

export class ResponseImageDto {

    @ApiProperty()
    imageId: number;

    @ApiProperty()
    index: number;

    @ApiProperty()
    originUrl: string;

    @ApiProperty()
    thumbUrl: string;

    constructor(image: Image) {
        this.imageId = image.imageId;
        this.index = image.index;
        this.originUrl = image.originUrl;
        this.thumbUrl = image.thumbUrl;
    }

}