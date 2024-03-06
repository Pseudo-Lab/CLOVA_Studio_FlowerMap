import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Flower(꽃) API - 보류(관련 기능 정의되면 생성 예정)')
@Controller('api/v1/flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) { }

  // @Post()
  // create(@Body() createFlowerDto: CreateFlowerDto) {
  //   return this.flowersService.create(createFlowerDto);
  // }

  // @Get()
  // findAll() {
  //   return this.flowersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.flowersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFlowerDto: UpdateFlowerDto) {
  //   return this.flowersService.update(+id, updateFlowerDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowersService.remove(+id);
  }

}
