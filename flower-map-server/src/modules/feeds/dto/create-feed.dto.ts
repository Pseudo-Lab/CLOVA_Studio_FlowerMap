import { ApiProperty } from "@nestjs/swagger";

export class CreateFeedDto {

    @ApiProperty({ description: '피드에 대한 간단한 설명입니다.' })
    content: string;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ type: Date })
    capturedAt: Date;

    @ApiProperty({ description: '개화상태 레벨입니다. 1 ~ 5단계 별로 나타냅니다.' })
    floweringStatus: number;

    @ApiProperty({ description: 'Location 식별자 입니다.' })
    locationId: number;

    @ApiProperty({ description: 'Image Id를 배열 형태로 입력, 배열에 입력된 순서대로 index가 결정됨', type: [Number] })
    imageIds: number[];
}
