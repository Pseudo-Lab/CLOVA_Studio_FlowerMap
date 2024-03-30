import { Controller, Param, Delete } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Flower(꽃) API - 보류(관련 기능 정의되면 생성 예정)')
@Controller('api/v1/flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) { }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowersService.remove(+id);
  }

}
