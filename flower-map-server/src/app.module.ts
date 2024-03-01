import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedsModule } from './api/feeds/feeds.module';
import { FlowersModule } from './api/flowers/flowers.module';
import { PhotosModule } from './api/photos/photos.module';
import { LocationsModule } from './api/locations/locations.module';

@Module({
  imports: [FeedsModule, FlowersModule, PhotosModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
