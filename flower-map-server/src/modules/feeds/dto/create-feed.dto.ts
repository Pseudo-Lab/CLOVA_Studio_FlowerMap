import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsDateString, IsNotEmpty, IsString, Length, Matches, Min, ValidateNested } from "class-validator";
import { Feed } from "../entities/feed.entity";
import { Location } from "src/modules/locations/entities/location.entity";
import { CreateImageDto } from "src/modules/images/dto/create-image.dto";
import { Type } from "class-transformer";

export class CreateFeedDto {

    @ApiProperty({
        description: '피드에 대한 간단한 설명입니다. [공백포함 10자 이상 200자 이하]',
        example: '피드에 대한 설명 글을 작성합시다.',
        required: true,
    })
    @IsString()
    @Length(10, 200)
    content: string;

    @ApiProperty({
        description: `
        게시글에 대한 비밀번호 입니다.
        [정규표현식: "^[0-9a-zA-Z]{6}$]" (6자 숫자,영문(소,대문자)]`,
        example: 'Hello7',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    @Matches(/^[0-9a-zA-Z]{6}$/)
    password: string; // UpdateFeedDto.currentPassword 수정 함께 할것.

    @ApiProperty({
        type: Date,
        description: '촬영한 연도,월,일,시간입니다.(ISO8601에 맞춰 입력해주세요)',
        example: "2024-03-25T09:00:00Z",
        required: true
    })
    @IsDateString()
    capturedAt: Date;

    @ApiProperty({
        description: 'Location 식별자 입니다. [1이상]',
        example: 1,
        required: true,
    })
    @Min(1)
    locationId: number;

    @ApiProperty({
        type: CreateImageDto,
        description: 'Image 정보 배열',
        required: true,
        isArray: true
    })
    @Type(() => CreateImageDto)
    @ArrayMinSize(1)
    @ArrayMaxSize(3)
    @ValidateNested({ each: true })
    images: CreateImageDto[];

    userIp: string; // controller에서 입력할 것

    toEntity(): Feed {
        const feed = new Feed()

        feed.userIp = this.userIp;
        feed.content = this.content;
        feed.password = this.password;
        feed.capturedAt = this.capturedAt;
        // Image 추가
        this.images.map((createImageDto, idx) => feed.addImage(createImageDto.toEntity(idx)));

        // Location 추가
        const location = new Location();
        location.locationId = this.locationId;
        feed.location = location;

        return feed;
    }

}
