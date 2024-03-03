import { Point } from "src/common/point";
import { Location } from "../entities/location.entity";

export class ResponseLocationDto {
    constructor(location: Location) {
        this.locationId = location.locationId;
        this.numberAddress = location.numberAddress;
        this.roadAddress = location.roadAddress;
        this.coordinates = new Point(location.coordinates);
        // this.flower = location.flower;
    }

    locationId: number;
    numberAddress: string;
    roadAddress: string;
    coordinates: Point;
    // flower: ResponseFlowerDto;

}