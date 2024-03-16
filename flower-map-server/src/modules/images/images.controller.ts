import { BadRequestException, Body, Controller, FileTypeValidator, Ip, MaxFileSizeValidator, ParseFilePipe, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SingleResponseDto } from 'src/common/single-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesEditingService } from './images-editing.service';
import { ImagesUploadService } from './images-upload.service';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { UploadImageDto } from './dto/upload-image.dto';
import { FlowersService } from '../flowers/flowers.service';

// API 문서
@ApiTags('Image(이미지) API')
@ApiBadRequestResponse({ description: `잘못된 요청 형식입니다. (body, query, param 등) [errorCode=${CustomErrorCode.VALIDATION_BAD_REQUEST}]` })

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
    게시글 등록시 해당 API로 반환된 이미지 id만 입력하도록 되어있어, id만 반환합니다.
    (생성된 이미지의 주소가 필요하다면 말씀해주세요)
    이미지: maxSize: 20 * 1024 * 1024 bytes
    확장자: jpeg|jpg|png|webp|heif|heic
  `})
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '업로드할 이미지',
    type: UploadImageDto
  })
  @ApiCreatedResponse({ description: '요청 성공', type: SingleResponseDto })
  @ApiBadRequestResponse({ description: `잘못된 요청 형식입니다. (body, query, param 등), 지원하지 않는 이미지 형식일 경우 [errorCode=${CustomErrorCode.VALIDATION_BAD_REQUEST}, ${CustomErrorCode.IMAGE_UNSUPPORTED_EXT}]` })
  @ApiNotFoundResponse({ description: `Flower가 존재하지 않습니다. [errorCode=${CustomErrorCode.FLOWER_NOT_FOUND}]` })

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 20 * 1024 * 1024 }), // 20메가바이트
      new FileTypeValidator({ fileType: /^image\/(jpeg|jpg|png|webp|heif|heic)$/ })
    ]
  })) image: Express.Multer.File,
    @Body('flowerId', ParseIntPipe) flowerId: number,
    @Body('floweringStatus', ParseIntPipe) floweringStatus: number,
    @Ip() userIp: string) {

    // 유효성 검사
    if (floweringStatus < 0 || 4 < floweringStatus || flowerId < 1) {
      throw new BadRequestException(CustomErrorCode.VALIDATION_BAD_REQUEST);
    }

    // Flower 존재 여부 확인
    await this.flowersService.exists(flowerId);

    // origin 이미지 1080 * 1080
    const originExt = 'png';
    const editedOriginImage: Buffer = await this.imagesEditingService.editImage(image.buffer, originExt, 1080, 1080);
    const { imageUrl: originUrl, ETag: originETag } = await this.imagesUploadService.upload(editedOriginImage, originExt);

    // thumb 이미지 400 * 400
    const thumbExt = 'jpeg';
    const editedThumbImage: Buffer = await this.imagesEditingService.editImage(image.buffer, thumbExt, 400, 400);
    const { imageUrl: thumbUrl, ETag: thumbETag } = await this.imagesUploadService.upload(editedThumbImage, thumbExt);

    // 이미지 엔티티 디비 저장
    const createImageDto: CreateImageDto = new CreateImageDto(userIp, originUrl, originETag, thumbUrl, thumbETag, flowerId, floweringStatus);
    const createdImage: Image = await this.imagesService.create(createImageDto.toEntity());

    return new SingleResponseDto('Image', createdImage.imageId);
  }

}
