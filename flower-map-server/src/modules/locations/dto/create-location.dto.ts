import { Location } from "../entities/location.entity";
import { ArrayMaxSize, ArrayMinSize, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    numberAddress: string;

    @ApiProperty()
    @IsString()
    roadAddress: string;

    @ApiProperty({
        type: Number,
        description: '[위도, 경도]',
        example: [37.2422, 131.8676],
        isArray: true,
        required: true,
    })
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({}, { each: true })
    coordinates: number[];

    @ApiProperty({
        type: Number,
        isArray: true,
        example: [1, 2]
    })
    @ArrayMinSize(1)
    @Min(1, { each: true })
    flowerIds: number[];

    public toEntity(): Location {
        const location = new Location()
        location.numberAddress = this.numberAddress;
        location.roadAddress = this.roadAddress;
        location.coordinates = this.coordinates;
        this.flowerIds.forEach(flowerId => location.addFlower(flowerId));
        return location;
    }

}