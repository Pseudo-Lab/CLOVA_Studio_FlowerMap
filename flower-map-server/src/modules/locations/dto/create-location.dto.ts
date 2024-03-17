import { Location } from "../entities/location.entity";
import { ArrayMaxSize, ArrayMinSize, IsNumber, IsString, Length, Matches, Min, MinLength } from "class-validator";
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
        description: '[경도, 위도]',
        example: [131.8676, 37.2422],
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
        location.name = this.name;
        location.numberAddress = this.numberAddress;
        location.roadAddress = this.roadAddress;
        location.coordinates = this.coordinates;
        this.flowerIds.forEach(flowerId => location.addFlower(flowerId));
        return location;
    }

}