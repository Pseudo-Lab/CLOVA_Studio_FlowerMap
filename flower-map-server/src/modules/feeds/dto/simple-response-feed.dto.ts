import { ApiProperty } from "@nestjs/swagger";
import { Feed } from "../entities/feed.entity";

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
    responseImageDtos: Object[];

    @ApiProperty()
    responseLocationDto: Object;

    constructor(feed: Feed) {
        this.feedId = feed.feedId;
        this.capturedAt = feed.capturedAt;
        this.floweringStatus = feed.floweringStatus;
        this.heartsCount = 10;
        this.responseImageDtos = [{ thumbnailUrl: 'https://item.kakaocdn.net/do/c5c470298d527ef65eb52883f0f186c48f324a0b9c48f77dbce3a43bd11ce785' }];
        this.responseLocationDto = {
            numberAddress: '지번주소',
            roadAddress: '도로명주소'
        }
    }

}