import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayUnique, IsArray, IsNumber, IsOptional, IsString, Max, Min, NotEquals } from "class-validator";

export class RequestNearbyQueriesDto {

    @ApiProperty({
        type: Number,
        description: '-180 < 경도 <= 180',
        minimum: -180,
        exclusiveMinimum: true,
        maximum: 180,
        example: 131.8676
    })
    @Type(() => Number)
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
    @Type(() => Number)
    @Min(-90)
    @Max(90)
    latitude: number; // 위도

    @ApiProperty({
        type: Number,
        description: '중심 좌표로부터 요청할 Location **반경** (단위: m)',
        example: 1000
    })
    @Type(() => Number)
    @IsNumber()
    meter: number; // 반경

    @ApiProperty({
        type: Number,
        description: '특정 꽃들만 검색 하고 싶은 경우',
        required: false,
        isArray: true,
        example: [1, 2, 3]
    })
    @IsOptional()
    @Type(() => Number)
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    @IsArray()
    @ArrayUnique()
    @Min(1, { each: true })
    flowerIds: number[];
}