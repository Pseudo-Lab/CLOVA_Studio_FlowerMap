import { Location } from "../entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseFlowerDto } from "src/modules/flowers/dto/response-flower.dto";

export class ResponseLocationDto {

    @ApiProperty()
    locationId: number;

    @ApiProperty()
    numberAddress: string;

    @ApiProperty()
    roadAddress: string;

    @ApiProperty({ type: [Number, Number], example: [37.2422, 131.8676] })
    coordinates: number[];

    @ApiProperty({ type: ResponseFlowerDto })
    flower: ResponseFlowerDto;

    constructor(location: Location) {
        this.locationId = location.locationId;
        this.numberAddress = location.numberAddress;
        this.roadAddress = location.roadAddress;
        this.coordinates = location.coordinates;
        this.flower = location.flower;
    }

}