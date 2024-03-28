import { Location } from "../entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseFlowerDto } from "src/modules/flowers/dto/response-flower.dto";

export class ResponseLocationDto {

    @ApiProperty()
    locationId: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    numberAddress: string;

    @ApiProperty()
    roadAddress: string;

    @ApiProperty({ description: '[경도, 위도]', type: [Number, Number], example: [131.8676, 37.2422] })
    coordinates: number[];

    @ApiProperty({
        type: ResponseFlowerDto,
        isArray: true
    })
    flowers: ResponseFlowerDto[] = [];

    constructor(location: Location) {
        this.locationId = location.locationId;
        this.name = location.name;
        this.numberAddress = location.numberAddress;
        this.roadAddress = location.roadAddress;
        this.coordinates = location.coordinates;
        if (location.flowers) {
            location.flowers.forEach(flower => this.flowers.push(new ResponseFlowerDto(flower)));
        }
    }

}