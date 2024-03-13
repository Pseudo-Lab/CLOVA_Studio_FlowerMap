import { Flower } from "src/modules/flowers/entities/flower.entity";
import { Image } from "../entities/image.entity";

export class CreateImageDto {

    userIp: string;
    originUrl: string;
    originETag: string;
    thumbUrl: string;
    thumbETag: string;
    flowerId: number;
    floweringStatus: number;

    constructor(
        userIp: string,
        originUrl: string,
        originETag: string,
        thumbUrl: string,
        thumbETag: string,
        flowerId: number,
        floweringStatus: number
    ) {
        this.userIp = userIp;
        this.originUrl = originUrl;
        this.originETag = originETag;
        this.thumbUrl = thumbUrl;
        this.thumbETag = thumbETag;
        this.flowerId = flowerId;
        this.floweringStatus = floweringStatus;
    }

    toEntity(): Image {
        const image = new Image();

        image.userIp = this.userIp;
        image.originUrl = this.originUrl;
        image.originETag = this.originETag;
        image.thumbUrl = this.thumbUrl;
        image.thumbETag = this.thumbETag;
        const flower = new Flower()
        flower.flowerId = this.flowerId;
        image.flower = flower;
        image.floweringStatus = this.floweringStatus;

        return image;
    }
}
