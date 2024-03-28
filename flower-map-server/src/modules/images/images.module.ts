import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImagesEditingService } from './images-editing.service';
import { ImagesUploadService } from './images-upload.service';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowersModule } from '../flowers/flowers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    FlowersModule
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesEditingService, ImagesUploadService],
  exports: [ImagesService]
})
export class ImagesModule { }
