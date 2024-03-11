import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImagesEditingService } from './images-editing.service';
import { ImagesUploadService } from './images-upload.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, ImagesEditingService, ImagesUploadService],
})
export class ImagesModule { }
