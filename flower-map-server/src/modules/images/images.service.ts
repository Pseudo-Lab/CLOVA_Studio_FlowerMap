import { Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private feedsRepository: Repository<Image>,
  ) { }

  async create(image: Image): Promise<Image> {
    return await this.feedsRepository.create(image).save();
  }

}
