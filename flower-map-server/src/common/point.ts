import { InternalServerErrorException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class Point {
    constructor(pointString: string) {
        const match = pointString.match(/\(([^)]+)\)/);
        if (match && match.length > 1) {
            const split = match[1].split(' ');
            this.latitude = parseFloat(split[0]);
            this.longitude = parseFloat(split[1]);
        } else {
            //TODO 예외처리 구체화할 것.
            throw new InternalServerErrorException();
        }
    }

    @ApiProperty()
    @IsNotEmpty()
    latitude: number;

    @ApiProperty()
    @IsNotEmpty()
    longitude: number;

    toPointString(): string {
        return `POINT(${this.latitude} ${this.longitude})`;
    }

}