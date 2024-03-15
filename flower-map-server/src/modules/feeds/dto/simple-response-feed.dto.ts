import { ApiProperty } from "@nestjs/swagger";
import { Feed } from "../entities/feed.entity";
import { ResponseImageDto } from "src/modules/images/dto/response-image.dto";

export class SimpleResponseFeedDto {

    @ApiProperty()
    feedId: number;

    @ApiProperty()
    capturedAt: Date;

    @ApiProperty()
    heartsCount: number;

    @ApiProperty()
    image: ResponseImageDto;

    constructor(feed: Feed) {
        this.feedId = feed.feedId;
        this.capturedAt = feed.capturedAt;
        this.heartsCount = feed.hearts
            ? feed.hearts.length
            : feed.heartCount;
        this.image = feed.images && feed.images.length > 0
            ? new ResponseImageDto(feed.images[0])
            : null;
    }

}