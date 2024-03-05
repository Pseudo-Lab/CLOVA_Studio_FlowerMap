import { ApiProperty } from "@nestjs/swagger";

export class ResponsePageDto<T>{
    @ApiProperty()
    total: number;
    @ApiProperty()
    offset: number;
    @ApiProperty()
    limit: number;
    @ApiProperty()
    data: T[]

    constructor(total: number,
        offset: number,
        limit: number,
        data: T[]) {
        this.total = total;
        this.offset = offset;
        this.limit = limit;
        this.data = data;
    }
}