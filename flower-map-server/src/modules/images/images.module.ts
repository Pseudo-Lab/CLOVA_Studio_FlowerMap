import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImagesEditingService } from './images-editing.service';
import { ImagesUploadService } from './images-upload.service';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesEditingService, ImagesUploadService],
  exports: [ImagesService]
})
export class ImagesModule { }
