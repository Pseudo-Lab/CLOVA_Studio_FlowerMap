import { Flower } from "src/modules/flowers/entities/flower.entity";
import { Point } from "../../../common/point";
import { Location } from "../entities/location.entity";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateLocationDto {

    @IsString()
    numberAddress: string;

    @IsString()
    roadAddress: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Point)
    coordinates: Point;

    @IsNumber()
    flowerId: number;

    public toEntity(): Location {
        const location = new Location()
        const flower = new Flower();
        flower.flowerId = this.flowerId;
        location.numberAddress = this.numberAddress;
        location.roadAddress = this.roadAddress;
        location.coordinates = this.coordinates.toPointString();
        location.flower = flower;
        return location;
    }

}