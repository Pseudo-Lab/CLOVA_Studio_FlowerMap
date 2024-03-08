import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsDateString, IsNotEmpty, IsNumber, IsString, Length, Matches, Max, Min } from "class-validator";
import { Feed } from "../entities/feed.entity";
import { Location } from "src/modules/locations/entities/location.entity";

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
    password: string;

    @ApiProperty({
        type: Date,
        description: '촬영한 연도,월,일,시간 입니다.',
        required: true
    })
    @IsDateString()
    capturedAt: Date;

    @ApiProperty({
        description: '개화상태 레벨입니다. 1 ~ 5단계 별로 나타냅니다. [1이상 5이하]',
        example: 1,
        required: true,
    })
    @Min(1)
    @Max(5)
    floweringStatus: number;

    @ApiProperty({
        description: 'Location 식별자 입니다. [1이상]',
        example: 1,
        required: true,
    })
    @Min(1)
    locationId: number;

    @ApiProperty({
        type: [Number],
        description: 'Image Id를 배열 형태로 입력, 배열에 입력된 순서대로 index가 결정됨 [배열크기 1이상 3이하, 배열 원소 중복 금지]',
        example: [1, 2, 3],
        required: true,
    })
    @ArrayMinSize(1) // 최소 배열 크기
    @ArrayMaxSize(3) // 최대 배열 크기
    @ArrayUnique() // 입력된 배열 중복 금지
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true }) // 숫자 여부 체크
    imageIds: number[];

    userIp: string; // controller에서 입력할 것

    toEntity(): Feed {
        const feed = new Feed()

        feed.userIp = this.userIp;
        feed.content = this.content;
        feed.password = this.password;
        feed.capturedAt = this.capturedAt;
        feed.floweringStatus = this.floweringStatus;
        // Image 추가
        this.imageIds.forEach(imageId => feed.addImage(imageId));
        // Location 추가
        const location = new Location();
        location.locationId = this.locationId;
        feed.location = location;

        return feed;
    }

}
