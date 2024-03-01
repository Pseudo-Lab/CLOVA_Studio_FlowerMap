import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedsModule } from './api/feeds/feeds.module';
import { PlacesModule } from './api/places/places.module';
import { FlowersModule } from './api/flowers/flowers.module';
import { PhotosModule } from './api/photos/photos.module';

@Module({
  imports: [FeedsModule, PlacesModule, FlowersModule, PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
