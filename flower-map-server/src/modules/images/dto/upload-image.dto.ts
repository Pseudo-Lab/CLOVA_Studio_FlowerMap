import { ApiProperty } from "@nestjs/swagger";

export class UploadImageDto {

    @ApiProperty({
        description: '업로드할 이미지를 등록해주세요.',
        required: true,
        type: 'string',
        format: 'binary'
    })
    image: Express.Multer.File; // Express.Multer.File와 같은 타입 사용

    @ApiProperty({
        description: 'Flower 식별자',
        required: true,
        example: 1
    })
    flowerId: number;

    @ApiProperty({
        description: '개화 레벨 0~4'
    })
    floweringStatus: number;

}
