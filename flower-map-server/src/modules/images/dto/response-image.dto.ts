import { ApiProperty } from "@nestjs/swagger";
import { Image } from "../entities/image.entity";
import { ResponseFlowerDto } from "src/modules/flowers/dto/response-flower.dto";

export class ResponseImageDto {

    @ApiProperty()
    imageId: number;

    @ApiProperty()
    idx: number;

    @ApiProperty()
    originUrl: string;

    @ApiProperty()
    originETag: string;

    @ApiProperty()
    thumbUrl: string;

    @ApiProperty()
    thumbETag: string;

    @ApiProperty()
    flower: ResponseFlowerDto;

    @ApiProperty()
    floweringStatus: number;

    constructor(image: Image) {
        this.imageId = image.imageId;
        this.idx = image.idx;
        this.originUrl = image.originUrl;
        this.originETag = image.originETag;
        this.thumbUrl = image.thumbUrl;
        this.thumbETag = image.thumbETag;
        this.flower = image.flower
            ? new ResponseFlowerDto(image.flower)
            : null;
        this.floweringStatus = image.floweringStatus;
    }

}