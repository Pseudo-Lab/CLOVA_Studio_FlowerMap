import { ApiProperty } from "@nestjs/swagger";

export class SingleResponseDto {
    
    @ApiProperty({ description: '요청받은 데이터 종류' })
    data: string;

    @ApiProperty({ description: '요청처리된 데이터 식별자' })
    id: number;

    constructor(data: string, id: number) {
        this.data = data;
        this.id = id;
    }

}