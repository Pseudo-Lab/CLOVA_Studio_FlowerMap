import { ApiProperty } from "@nestjs/swagger";
import { Image } from "../entities/image.entity";

export class ResponseImageDto {

    @ApiProperty()
    originUrl: string;

    @ApiProperty()
    thumbUrl: string;

    constructor(image: Image) {
        this.originUrl = image.originUrl;
        this.thumbUrl = image.thumbUrl;
    }

}