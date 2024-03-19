import { Controller, Get, Post, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ResponseLocationDto } from './dto/response-location.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SingleResponseDto } from 'src/common/single-response.dto';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { FlowersService } from '../flowers/flowers.service';
import { RequestNearbyQueriesDto } from './dto/request-nearby-queries.dto';
import { ResponsePageDto } from 'src/common/response-page.dto';

@ApiTags('Location(위치정보) API')
@ApiBadRequestResponse({ description: `잘못된 요청 형식입니다. (body, query, param 등)[errorCode=${CustomErrorCode.VALIDATION_BAD_REQUEST}]` })
@Controller('api/v1/locations')
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly flowersService: FlowersService
  ) { }

  @ApiOperation({ summary: 'Location 생성 (미완)', description: '새로운 장소를 등록한다.' })
  @ApiCreatedResponse({ description: '요청 성공', type: SingleResponseDto })
  @ApiNotFoundResponse({ description: '존재하지 않는 Flower' })
  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    // flower 검사
    for (let i = 0; i < createLocationDto.flowerIds.length; i++) {
      await this.flowersService.exists(createLocationDto.flowerIds[i]);
    }
    // location 생성
    const location = await this.locationsService.create(createLocationDto.toEntity());

    return new SingleResponseDto('Location', location.locationId);
  }

  @ApiOperation({
    summary: '특정 좌표 중심 반경 x미터 이내의 Location 검색',
    description: '특정 좌표(경도, 위도) 기준으로 반경 x미터 이내의 Location들을 모두 검색합니다.'
  })
  @ApiOkResponse({
    description: '요청 성공',
    content: { 'application/json': { example: { total: 10, data: ['ResponseLocationDto ...(스키마 하단참조)'] } } }
  })
  @Get('nearby')
  async getNearbyLocations(@Query() queries: RequestNearbyQueriesDto): Promise<ResponsePageDto<ResponseLocationDto>> {

    const [locations, total] = await this.locationsService.findAllByCoordinates(queries);
    const data = locations.map(location => new ResponseLocationDto(location));

    return new ResponsePageDto(total, null, null, data);
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

}
