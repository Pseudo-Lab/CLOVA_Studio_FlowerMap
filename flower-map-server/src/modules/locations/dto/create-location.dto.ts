import { Flower } from "src/modules/flowers/entities/flower.entity";
import { Location } from "../entities/location.entity";
import { ArrayMaxSize, ArrayMinSize, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {

    @ApiProperty()
    @IsString()
    numberAddress: string;

    @ApiProperty()
    @IsString()
    roadAddress: string;

    @ApiProperty({
        type: [Number, Number],
        description: '[위도, 경도]',
        example: [37.2422, 131.8676],
        isArray: true,
        required: true,
    })
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({}, { each: true })
    coordinates: number[];

    @ApiProperty({ example: 1 })
    @IsNumber()
    @Min(1)
    flowerId: number;

    public toEntity(): Location {
        const location = new Location()
        const flower = new Flower();
        flower.flowerId = this.flowerId;
        location.numberAddress = this.numberAddress;
        location.roadAddress = this.roadAddress;
        location.coordinates = this.coordinates;
        location.flower = flower;
        return location;
    }

}