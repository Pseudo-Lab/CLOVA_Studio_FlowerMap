import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { SimpleResponseFeedDto } from "src/modules/feeds/dto/simple-response-feed.dto";
import { ResponseLocationDto } from "src/modules/locations/dto/response-location.dto";

@ApiExtraModels(ResponseLocationDto, SimpleResponseFeedDto)
export class ResponsePageDto<T>{

    @ApiProperty()
    total: number;

    @ApiProperty()
    offset: number;

    @ApiProperty()
    limit: number;

    //TODO : 제네릭 타입 고민할것.
    @ApiProperty({
        type: [],
        items: {
            oneOf: [
                { $ref: getSchemaPath(ResponseLocationDto) },
                { $ref: getSchemaPath(SimpleResponseFeedDto) },
            ]
        }
    })
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