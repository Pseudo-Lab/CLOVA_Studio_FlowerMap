import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateFeedDto } from './create-feed.dto';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateFeedDto extends PickType(CreateFeedDto, ['content']) {

    @ApiProperty({
        description: `
        현재 비밀번호를 입력해주세요.
        [정규표현식: "^[0-9a-zA-Z]{6}$]" (6자 숫자,영문(소,대문자)]`,
        example: 'curr12',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    @Matches(/^[0-9a-zA-Z]{6}$/)
    currentPassword: string;

}
