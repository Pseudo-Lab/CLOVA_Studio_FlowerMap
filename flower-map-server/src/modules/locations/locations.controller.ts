import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ResponseLocationDto } from './dto/response-location.dto';

@Controller('api/v1/locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto): Promise<ResponseLocationDto> {
    const location = await this.locationsService.create(createLocationDto);
    return new ResponseLocationDto(location);
  }

  // @Get()
  // findAll() {
  //   return this.locationsService.findAll();
  // }

  @Get(':locationId')
  async findOne(@Param('locationId', ParseIntPipe) locationId: number): Promise<ResponseLocationDto> {
    return new ResponseLocationDto(await this.locationsService.findOne(locationId));
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
  //   return this.locationsService.update(+id, updateLocationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.locationsService.remove(+id);
  // }
}
