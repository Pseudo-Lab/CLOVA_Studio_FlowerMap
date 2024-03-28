import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, MaxLength } from "class-validator";
import { RequestPageDto } from "src/common/request-page.dto";

export class SearchQueriesDto extends RequestPageDto {
    @ApiProperty({
        description: '검색어',
        required: false,
        maxLength: 45
    })
    @IsOptional()
    @MaxLength(45)
    query: string;

}