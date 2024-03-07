import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsDateString, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CreateFeedDto {

    @ApiProperty({ description: '피드에 대한 간단한 설명입니다. [필수, 공백포함 1자 이상 300자 이하]' })
    @IsString()
    @Length(1, 300) //TODO 규칙 다시 확인할 것
    content: string;

    @ApiProperty({ description: '[필수]' })
    @IsNotEmpty() //TODO 규칙 다시 확인할 것
    password: string;

    @ApiProperty({ type: Date, description: '촬영한 연도,월,일,시간 입니다. [필수]' })
    @IsDateString()
    capturedAt: Date;

    @ApiProperty({ description: '개화상태 레벨입니다. 1 ~ 5단계 별로 나타냅니다. [필수, 1이상 5이하]' })
    @Min(1)
    @Max(5)
    floweringStatus: number;

    @ApiProperty({ description: 'Location 식별자 입니다. [필수, 1이상]' })
    @Min(1)
    locationId: number;

    @ApiProperty({ description: 'Image Id를 배열 형태로 입력, 배열에 입력된 순서대로 index가 결정됨 [필수, 배열크기 1이상 3이하, 배열 원소 중복 금지]', type: [Number] })
    @ArrayMinSize(1) // 최소 배열 크기
    @ArrayMaxSize(3) // 최대 배열 크기
    @ArrayUnique() // 입력된 배열 중복 금지
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true }) // 숫자 여부 체크
    imageIds: number[];

}
