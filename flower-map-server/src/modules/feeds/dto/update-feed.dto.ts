import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedDto } from './create-feed.dto';
import { ApiProperty } from '@nestjs/swagger';

// export class UpdateFeedDto extends PartialType(CreateFeedDto) {}
export class UpdateFeedDto {

    @ApiProperty()
    content: string;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    capturedAt: string;

    @ApiProperty()
    floweringStatus: number;

    @ApiProperty()
    photos: string;

    @ApiProperty()
    location: string;

}
