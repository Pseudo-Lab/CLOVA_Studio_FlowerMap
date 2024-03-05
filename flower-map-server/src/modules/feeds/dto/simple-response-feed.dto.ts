import { ApiProperty } from "@nestjs/swagger";
import { Feed } from "../entities/feed.entity";
import { ResponseImageDto } from "src/modules/images/dto/response-image.dto";

export class SimpleResponseFeedDto {

    @ApiProperty()
    feedId: number;

    @ApiProperty()
    capturedAt: Date;

    @ApiProperty()
    floweringStatus: number;

    @ApiProperty()
    heartsCount: number;

    @ApiProperty()
    responseImageDto: ResponseImageDto;

    @ApiProperty()
    responseLocationDto: Object;

    constructor(feed: Feed) {
        this.feedId = feed.feedId;
        this.capturedAt = feed.capturedAt;
        this.floweringStatus = feed.floweringStatus;
        this.heartsCount = 10;
        this.responseImageDto = feed.images[0];
        this.responseLocationDto = {
            numberAddress: '지번주소',
            roadAddress: '도로명주소'
        }
    }

}