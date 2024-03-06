import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feed])],
  controllers: [FeedsController],
  providers: [FeedsService],
})
export class FeedsModule { }
