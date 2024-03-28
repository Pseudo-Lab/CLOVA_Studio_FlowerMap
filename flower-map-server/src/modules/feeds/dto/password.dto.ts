import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class PasswordDto {
    @ApiProperty({
        description: `
        게시글에 대한 비밀번호 입니다.
        [정규표현식: "^[0-9a-zA-Z]{6}$]" (6자 숫자,영문(소,대문자)]`,
        example: 'Hello7',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    @Matches(/^[0-9a-zA-Z]{6}$/)
    password: string;
}