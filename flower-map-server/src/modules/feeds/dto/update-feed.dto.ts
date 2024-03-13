import { ApiProperty } from '@nestjs/swagger';

// export class UpdateFeedDto extends PartialType(CreateFeedDto) {}
export class UpdateFeedDto {

    @ApiProperty()
    content: string;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ type: Date })
    capturedAt: string;

    @ApiProperty({ type: [Number] })
    imageIds: number[];

    @ApiProperty()
    locationId: number;

}
