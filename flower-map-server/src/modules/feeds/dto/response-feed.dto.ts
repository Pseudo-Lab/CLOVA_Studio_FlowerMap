import { ApiProperty } from "@nestjs/swagger";
import { Feed } from "../entities/feed.entity";
import { ResponseImageDto } from "src/modules/images/dto/response-image.dto";
import { ResponseLocationDto } from "src/modules/locations/dto/response-location.dto";

export class ResponseFeedDto {

    @ApiProperty({ description: 'Feed 식별자' })
    feedId: number;

    @ApiProperty({ description: '피드에 대한 간단한 설명입니다.' })
    content: string;

    @ApiProperty()
    capturedAt: Date;

    @ApiProperty()
    heartsCount: number;

    @ApiProperty({ description: '사진과 관련된 내용, 관련 내용 개발중입니다.', type: [ResponseImageDto] })
    images: ResponseImageDto[];

    @ApiProperty()
    location: ResponseLocationDto;

    constructor(feed: Feed) {
        this.feedId = feed.feedId;
        this.content = feed.content;
        this.capturedAt = feed.capturedAt;
        this.heartsCount = feed.hearts
            ? feed.hearts.length
            : 0;
        this.images = [];
        for (let i = 0; i < feed.images.length; i++) {
            this.images.push(new ResponseImageDto(feed.images[i]));
        }
        this.location = new ResponseLocationDto(feed.location);
    }
}