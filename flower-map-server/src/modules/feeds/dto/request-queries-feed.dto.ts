import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { RequestPageDto } from "src/common/request-page.dto";

export class RequestQueriesFeedDto extends RequestPageDto {

    @ApiProperty({
        description: '정렬 기준 feedId(최신순), heart(좋아요 많은 순)',
        enum: ['feedId', 'heart'],
    })
    @IsIn(['feedId', 'heart'])
    orderBy: 'feedId' | 'heart';

    // @ApiProperty()
    // @IsString()
    // @IsIn(["ASC", "DESC", "asc", "desc"])
    // sort: FindOptionsOrderValue;

}