import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { FlowersModule } from '../flowers/flowers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    FlowersModule,
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService]
})
export class LocationsModule { }
