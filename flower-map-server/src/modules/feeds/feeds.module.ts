import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';
import { LocationsModule } from '../locations/locations.module';
import { ImagesModule } from '../images/images.module';
import { Heart } from './entities/heart.entity';
import { HeartsService } from './hearts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feed, Heart]),
    LocationsModule,
    ImagesModule,
  ],
  controllers: [FeedsController],
  providers: [FeedsService, HeartsService],
})
export class FeedsModule { }
