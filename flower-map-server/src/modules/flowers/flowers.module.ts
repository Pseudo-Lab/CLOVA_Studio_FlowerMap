import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './entities/flower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flower])],
  controllers: [FlowersController],
  providers: [FlowersService],
  exports: [FlowersService]
})
export class FlowersModule { }
