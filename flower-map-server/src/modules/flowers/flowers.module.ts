import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';

@Module({
  controllers: [FlowersController],
  providers: [FlowersService],
})
export class FlowersModule {}
