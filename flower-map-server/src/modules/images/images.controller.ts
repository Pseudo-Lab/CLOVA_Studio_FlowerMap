import { Controller, Post, UploadedFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SingleResponseDto } from 'src/common/single-response.dto';

@ApiTags('Image(이미지) API')
@ApiBadRequestResponse({ description: '잘못된 요청 형식입니다. (body, query, param 등)' })
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post()
  @ApiOperation({ summary: 'Image 업로드 (미완)', description: '파일 업로드 받을 예정' })
  @ApiCreatedResponse({ description: '요청 성공', type: SingleResponseDto })
  upload(@UploadedFile() file) {
    return new SingleResponseDto('image', Math.floor(Math.random() * 1000) + 1);
  }

}
