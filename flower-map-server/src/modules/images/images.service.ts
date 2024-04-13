import { Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { CustomHttpException } from 'src/common/exception/custom-http-exception';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) { }

  async create(image: Image): Promise<Image> {
    return await this.imagesRepository.create(image).save();
  }

  async isUsableImage(imageId: number) {
    // 사용중이지 않는(feed==null) 이미지를 찾는다
    if (!await this.imagesRepository.existsBy({ imageId, feed: IsNull() })) {
      throw new CustomHttpException(CustomErrorCode.IMAGE_NOT_FOUND);
    }
  }

  async isUsableImages(imageIds: number[]) {
    for (let i = 0; i < imageIds.length; i++) {
      await this.isUsableImage(imageIds[i]);
    }
  }

}
