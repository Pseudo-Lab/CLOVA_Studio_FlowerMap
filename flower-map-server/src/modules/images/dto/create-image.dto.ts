import { Flower } from "src/modules/flowers/entities/flower.entity";
import { Image } from "../entities/image.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Max, Min } from "class-validator";

export class CreateImageDto {

    @ApiProperty({ example: 'https://kr.object.ncloudstorage.com/flower-map-image-storage/dev/a89002c7-52a5-489a-a4e6-4a5294d4dfaf.png' })
    @IsString()
    originUrl: string;

    @ApiProperty({ example: 'b8d09d43f27f04231f036b4c2c9679c1' })
    @IsString()
    originETag: string;

    @ApiProperty({ example: 'https://kr.object.ncloudstorage.com/flower-map-image-storage/dev/b61b6c98-b24f-4fb5-a645-bb344dbe3ffe.jpeg' })
    @IsString()
    thumbUrl: string;

    @ApiProperty({ example: '75d85cd9a546a91a9269f8b3d7ef5df3' })
    @IsString()
    thumbETag: string;

    @ApiProperty({
        description: '꽃 식별자',
        minimum: 1,
        example: 1
    })
    @Min(1)
    flowerId: number;

    @ApiProperty({
        description: '개화 레벨 0~4단계 (상세 내용 영화님 참조)',
        minimum: 0,
        maximum: 4,
        example: 0
    })
    @Min(0)
    @Max(4)
    floweringStatus: number;

    constructor(
        originUrl: string,
        originETag: string,
        thumbUrl: string,
        thumbETag: string,
        flowerId: number,
        floweringStatus: number
    ) {
        this.originUrl = originUrl;
        this.originETag = originETag;
        this.thumbUrl = thumbUrl;
        this.thumbETag = thumbETag;
        this.flowerId = flowerId;
        this.floweringStatus = floweringStatus;
    }

    toEntity(idx: number): Image {
        const image = new Image();

        image.originUrl = this.originUrl;
        image.originETag = this.originETag;
        image.thumbUrl = this.thumbUrl;
        image.thumbETag = this.thumbETag;
        const flower = new Flower()
        flower.flowerId = this.flowerId;
        image.flower = flower;
        image.floweringStatus = this.floweringStatus;
        image.idx = idx;

        return image;
    }
}
