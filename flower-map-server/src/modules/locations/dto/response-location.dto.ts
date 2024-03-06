import { Point } from "src/common/point";
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

    @ApiProperty({ type: Point })
    coordinates: Point;

    @ApiProperty({ type: ResponseFlowerDto })
    flower: ResponseFlowerDto;

    constructor(location: Location) {
        this.locationId = location.locationId;
        this.numberAddress = location.numberAddress;
        this.roadAddress = location.roadAddress;
        this.coordinates = new Point(location.coordinates);
        this.flower = location.flower;
    }

}