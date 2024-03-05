import { ApiProperty } from "@nestjs/swagger";

export class CreateFeedDto {

    @ApiProperty({ description: '피드에 대한 간단한 설명입니다.' })
    content: string;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    capturedAt: Date;

    @ApiProperty({ description: '개화상태 레벨입니다. 1 ~ 5단계 별로 나타냅니다.' })
    floweringStatus: number;

    @ApiProperty({ description: 'Location 식별자 입니다.' })
    locationId: number;

    @ApiProperty({ description: '사진과 관련된 내용, 관련 내용 개발중입니다.' })
    photo: string;
}
