import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ResponseLocationDto } from './dto/response-location.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SingleResponseDto } from 'src/common/single-response.dto';
import { ResponsePageDto } from 'src/common/response-page.dto';
import { Location } from './entities/location.entity';
import { Flower } from '../flowers/entities/flower.entity';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';

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
      location.coordinates = [latitude + i / 1000, longitude + i / 1000]
      location.flower = flower;
      data[i - 1] = new ResponseLocationDto(location)
    }


    return new ResponsePageDto<ResponseLocationDto>(100, offset, limit, data);
  }

  // API 문서
  @ApiOperation({ summary: 'Location 단건 조회', description: '특정 Location을 id로 조회한다.' })
  @ApiOkResponse({ description: '요청 성공', type: ResponseLocationDto })
  @ApiNotFoundResponse({ description: `Locatioon이 존재하지 않습니다. [errorCode=${CustomErrorCode.LOCATION_NOT_FOUND}]` })

  @Get(':locationId')
  async findOne(@Param('locationId', ParseIntPipe) locationId: number): Promise<ResponseLocationDto> {
    const location = await this.locationsService.findOne(locationId);
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
