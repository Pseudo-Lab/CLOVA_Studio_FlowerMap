import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesEditingService } from './images-editing.service';
import { ImagesUploadService } from './images-upload.service';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { UploadImageDto } from './dto/upload-image.dto';
import { FlowersService } from '../flowers/flowers.service';

// API 문서
@ApiTags('Image(이미지) API')
@ApiBadRequestResponse({ description: `잘못된 요청 형식입니다. (body, query, param 등) [errorCode=${CustomErrorCode.VALIDATION_BAD_REQUEST.errorCode}]` })
@Controller('api/v1/images')
export class ImagesController {
  constructor(
    private readonly imagesEditingService: ImagesEditingService,
    private readonly imagesUploadService: ImagesUploadService,
    private readonly imagesService: ImagesService,
    private readonly flowersService: FlowersService,
  ) { }

  // API 문서
  @ApiOperation({
    summary: 'Image 업로드', description: `
    이미지를 변환 및 리사이징하여 해당 주소 반환
    이미지: maxSize: 20 * 1024 * 1024 bytes
    확장자: jpeg|jpg|png|webp|heif|heic
  `})
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '업로드할 이미지',
    type: UploadImageDto
  })
  @ApiCreatedResponse({
    description: '요청 성공',
    content: {
      'application/json': {
        example: {
          originUrl: "https://kr.object.ncloudstorage.com/flower-map-image-storage/dev/a89002c7-52a5-489a-a4e6-4a5294d4dfaf.png",
          originETag: "b8d09d43f27f04231f036b4c2c9679c1",
          thumbUrl: "https://kr.object.ncloudstorage.com/flower-map-image-storage/dev/b61b6c98-b24f-4fb5-a645-bb344dbe3ffe.jpeg",
          thumbETag: "75d85cd9a546a91a9269f8b3d7ef5df3"
        }
      }
    }
  })
  @ApiBadRequestResponse({ description: `잘못된 요청 형식입니다. (body, query, param 등), 지원하지 않는 이미지 형식일 경우 [errorCode=${CustomErrorCode.VALIDATION_BAD_REQUEST.errorCode}, ${CustomErrorCode.IMAGE_UNSUPPORTED_EXT.errorCode}]` })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 20 * 1024 * 1024 }), // 20메가바이트
      new FileTypeValidator({ fileType: /^image\/(jpeg|jpg|png|webp|heif|heic)$/ })
    ]
  })) image: Express.Multer.File) {

    // origin 이미지 1080 * 1080
    const originExt = 'png';
    const editedOriginImage: Buffer = await this.imagesEditingService.editImage(image.buffer, originExt, 1080, 1080);
    const { imageUrl: originUrl, ETag: originETag } = await this.imagesUploadService.upload(editedOriginImage, originExt);

    // thumb 이미지 400 * 400
    const thumbExt = 'jpeg';
    const editedThumbImage: Buffer = await this.imagesEditingService.editImage(image.buffer, thumbExt, 400, 400);
    const { imageUrl: thumbUrl, ETag: thumbETag } = await this.imagesUploadService.upload(editedThumbImage, thumbExt);

    return { originUrl, originETag, thumbUrl, thumbETag };
  }

}
