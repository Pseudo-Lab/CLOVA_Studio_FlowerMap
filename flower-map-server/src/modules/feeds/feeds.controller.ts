import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, HttpCode, Ip, ParseIntPipe } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseFeedDto } from './dto/response-feed.dto';
import { ResponsePageDto } from 'src/common/response-page.dto';
import { Feed } from './entities/feed.entity';
import { SimpleResponseFeedDto } from './dto/simple-response-feed.dto';
import { SingleResponseDto } from 'src/common/single-response.dto';
import { LocationsService } from '../locations/locations.service';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { PasswordDto } from './dto/password.dto';
import { RequestQueriesFeedDto } from './dto/request-queries-feed.dto';
import { FlowersService } from '../flowers/flowers.service';

// API 문서
@ApiTags('Feed(게시글) API')
@ApiBadRequestResponse({ description: `잘못된 요청 형식입니다. (body, query, param 등) [errorCode=${CustomErrorCode.VALIDATION_BAD_REQUEST.errorCode}]` })
@Controller('api/v1/feeds')
export class FeedsController {
  constructor(
    private readonly feedsService: FeedsService,
    private readonly locationsService: LocationsService,
    private readonly flowersService: FlowersService
  ) { }

  // API 문서
  @ApiOperation({
    summary: 'Feed 생성', description: `
    Feed 생성을 위한 API 입니다.
    Image표시 순서는 입력 순서대로 설정됩니다.
  ` })
  @ApiBody({ type: CreateFeedDto })
  @ApiCreatedResponse({ description: '요청 성공', type: SingleResponseDto })
  @ApiNotFoundResponse({ description: `Flower, Location이 존재하지 않습니다. [errorCode=${CustomErrorCode.FLOWER_NOT_FOUND.errorCode} or ${CustomErrorCode.LOCATION_NOT_FOUND.errorCode}]` })
  @Post()
  async create(
    @Body() createFeedDto: CreateFeedDto,
    @Ip() userIp: string): Promise<SingleResponseDto> {

    // Location 존재 여부 확인
    await this.locationsService.existsById(createFeedDto.locationId);
    // Flower 존재 여부 확인
    for (let i = 0; i < createFeedDto.images.length; i++) {
      await this.flowersService.exists(createFeedDto.images[i].flowerId);
    }
    // IP주소 설정
    createFeedDto.userIp = userIp;
    // Feed 생성
    const feed: Feed = await this.feedsService.create(createFeedDto.toEntity());

    return new SingleResponseDto('Feed', feed.feedId);
  }

  // API 문서화 데코레이터
  @ApiOperation({
    summary: 'Feed 다건 조회 (locationId)',
    description: `
    locationId로 Feed들을 조회하기 위한 API 입니다.
    각 정렬방법(heart, feedId)에 따라 내림차순 정렬하여 조회합니다.
    이미지와 꽃은 각 Feed의 대표 이미지와 꽃을 가져옵니다.
  ` })
  @ApiOkResponse({
    description: '요청 성공',
    content: { 'application/json': { example: { total: 3321, offset: 0, limit: 10, data: ['SimpleResponseFeedDto ...(스키마 하단참조)'] } } }
  })
  // API
  @Get('locations/:locationId')
  async getFeedsByLocationId(
    @Param('locationId') locationId: number,
    @Query() queries: RequestQueriesFeedDto): Promise<ResponsePageDto<SimpleResponseFeedDto>> {

    const { orderBy, limit, offset } = queries;
    const [feeds, total] = await this.feedsService.findAllByLocationId(locationId, orderBy, limit, offset);
    const data = feeds.map(feed => new SimpleResponseFeedDto(feed));

    return new ResponsePageDto<SimpleResponseFeedDto>(total, offset, limit, data);
  }

  // API 문서
  @ApiOperation({ summary: 'Feed 단건 조회', description: '특정 Feed의 상세정보를 조회합니다.' })
  @ApiOkResponse({ description: '요청 성공', type: ResponseFeedDto })
  @ApiNotFoundResponse({ description: `요청하신 Feed가 존재하지 않습니다. [errorCode=${CustomErrorCode.FEED_NOT_FOUND.errorCode}]` })
  @Get(':feedId')
  async findOne(@Param('feedId', ParseIntPipe) feedId: number): Promise<ResponseFeedDto> {
    return new ResponseFeedDto(await this.feedsService.findOne(feedId));
  }

  @ApiOperation({ summary: 'Feed 수정 (미완)', description: '특정 Feed의 정보를 수정합니다.<br>수정을 원하는 값만 보내면 됩니다.<br>@비밀번호 변경 여부 논의 필요<br>password : 비밀번호 확인을 위해 필수' })
  @ApiOkResponse({ description: '요청 성공', type: SingleResponseDto })
  @ApiNotFoundResponse({ description: '요청하신 Feed가 존재하지 않습니다.' })
  @ApiUnauthorizedResponse({ description: '잘못된 비밀번호' })
  @Patch(':feedId')
  async update(@Param('feedId') feedId: number,
    @Body() updateFeedDto: UpdateFeedDto) {

    const feed = await this.feedsService.update(feedId, updateFeedDto);

    return new SingleResponseDto('Feed', feed.feedId);
  }

  // API 문서화
  @ApiOperation({ summary: 'Feed 삭제', description: '특정 Feed를 삭제합니다.' })
  @ApiBody({ type: PasswordDto })
  @ApiNoContentResponse({ description: '요청 성공' })
  @ApiNotFoundResponse({ description: `요청하신 Feed가 존재하지 않습니다. [errorCode=${CustomErrorCode.FEED_NOT_FOUND.errorCode}]` })
  @ApiUnauthorizedResponse({ description: `잘못된 비밀번호 [errorCode=${CustomErrorCode.FEED_UNAUTHORIZED.errorCode}]` })

  @Delete(':feedId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('feedId', ParseIntPipe) feedId: number,
    @Body() passwordDto: PasswordDto): Promise<void> {
    await this.feedsService.remove(feedId, passwordDto.password);
    return;
  }
}
