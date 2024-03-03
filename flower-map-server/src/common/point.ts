import { IsNotEmpty } from "class-validator";

export class Point {

    @IsNotEmpty()
    latitude: number;

    @IsNotEmpty()
    longitude: number;

    toPointString(): string {
        return `POINT(${this.latitude} ${this.longitude})`;
    }

}