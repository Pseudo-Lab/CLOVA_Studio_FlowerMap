import { ApiProperty } from "@nestjs/swagger";

export class UploadImageDto {

    @ApiProperty({
        description: '업로드할 이미지를 등록해주세요.',
        required: true,
        // type: 'string',
        type: 'file'
        // format: 'binary'
    })
    image: Express.Multer.File; // Express.Multer.File와 같은 타입 사용

}
