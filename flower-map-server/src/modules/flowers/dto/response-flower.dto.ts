import { ApiProperty } from "@nestjs/swagger";
import { Flower } from "../entities/flower.entity";

export class ResponseFlowerDto {

    @ApiProperty()
    flowerId: number;

    @ApiProperty()
    name: string;

    constructor(flower: Flower) {
        this.flowerId = flower.flowerId;
        this.name = flower.name;
    }

}