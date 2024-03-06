import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ResponseLocationDto } from './dto/response-location.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SingleResponseDto } from 'src/common/single-response.dto';
import { ResponsePageDto } from 'src/common/response-page.dto';
import { Location } from './entities/location.entity';
import { Point } from 'src/common/point';
import { Flower } from '../flowers/entities/flower.entity';

@ApiTags('Location(위치정보) API')
@ApiBadRequestResponse({ description: '잘못된 요청 형식입니다. (body, query, param 등)' })
@Controller('api/v1/locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  @Post()
  @ApiOperation({ summary: 'Location 생성 (미완)', description: '새로운 장소를 등록한다.' })
  @ApiCreatedResponse({ description: '요청 성공', type: SingleResponseDto })
  @ApiNotFoundResponse({ description: '존재하지 않는 Flower' })
  async create(@Body() createLocationDto: CreateLocationDto) {
    // const location = await this.locationsService.create(createLocationDto);
    return new SingleResponseDto('Location', Math.floor(Math.random() * 1000) + 1);
  }

  @Get()
  @ApiOperation({ summary: '특정 좌표 중심으로 Location 검색 (미완)', description: '' })
  @ApiOkResponse({ description: '요청 성공', type: ResponsePageDto<ResponseLocationDto> })
  findAll(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('range') range: number,
    @Query('limit') limit: number,
    @Query('offset') offset: number) {

    const data: ResponseLocationDto[] = []
    const flower = new Flower()
    flower.flowerId = 1;
    flower.name = '벚꽃'
    for (let i = 1; i <= limit; i++) {
      const location = new Location()
      location.locationId = i;
      location.numberAddress = '지번주소' + i
      location.roadAddress = '도로명주소' + i
      location.coordinates = `POINT(${latitude + i / 1000} ${longitude + i / 1000})`
      location.flower = flower;
      data[i - 1] = new ResponseLocationDto(location)
    }


    return new ResponsePageDto<ResponseLocationDto>(100, offset, limit, data);
  }

  @Get(':locationId')
  @ApiOperation({ summary: 'Location 단건 조회 (미완)', description: '특정 Location을 id로 조회한다.' })
  @ApiOkResponse({ description: '요청 성공', type: ResponseLocationDto })
  @ApiNotFoundResponse({ description: '요청한 Locatioon이 존재하지 않음' })
  async findOne(@Param('locationId', ParseIntPipe) locationId: number): Promise<ResponseLocationDto> {
    // return new ResponseLocationDto(await this.locationsService.findOne(locationId));
    const location = new Location();
    location.locationId = locationId;
    location.numberAddress = '지번주소';
    location.roadAddress = '도로명주소';
    location.coordinates = 'POINT(12.123 23.23443)';
    const flower = new Flower()
    flower.flowerId = 23;
    flower.name = '벚꽃';
    location.flower = flower;
    return new ResponseLocationDto(location);
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
