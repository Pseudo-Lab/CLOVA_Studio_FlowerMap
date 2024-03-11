import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';
import { LocationsModule } from '../locations/locations.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feed]),
    LocationsModule,
    ImagesModule,
  ],
  controllers: [FeedsController],
  providers: [FeedsService],
})
export class FeedsModule { }
