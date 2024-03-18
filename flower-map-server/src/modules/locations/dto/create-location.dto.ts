import { Location } from "../entities/location.entity";
import { ArrayMinSize, ArrayUnique, IsString, Length, Matches, Max, Min, NotEquals } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {

    @ApiProperty({
        description: `
        장소명 제약 조건: 2~15자, 영문, 숫자, 한글, 특수문자 ()<>[]{} 허용
        ^[a-zA-Z가-힣0-9()<>[\]{}]*$
    ` })
    @IsString()
    @Matches(/^[a-zA-Z가-힣0-9()<>[\]{}]*$/)
    @Length(2, 15)
    name: string;

    @ApiProperty()
    @IsString()
    numberAddress: string;

    @ApiProperty()
    @IsString()
    roadAddress: string;

    @ApiProperty({
        type: Number,
        description: '-180 < 경도 <= 180',
        minimum: -180,
        exclusiveMinimum: true,
        maximum: 180,
        example: 131.8676
    })
    @Min(-180)
    @NotEquals(-180)
    @Max(180)
    longitude: number; // 경도

    @ApiProperty({
        type: Number,
        description: '-90 <= 위도 <= 90',
        minimum: -90,
        maximum: 90,
        example: 37.2422
    })
    @Min(-90)
    @Max(90)
    latitude: number; // 위도

    @ApiProperty({
        type: Number,
        isArray: true,
        example: [1, 2]
    })
    @ArrayMinSize(1)
    @ArrayUnique()
    @Min(1, { each: true })
    flowerIds: number[];

    public toEntity(): Location {
        const location = new Location()
        location.name = this.name;
        location.numberAddress = this.numberAddress;
        location.roadAddress = this.roadAddress;
        location.coordinates = [this.longitude, this.latitude];
        this.flowerIds.forEach(flowerId => location.addFlower(flowerId));
        return location;
    }

}