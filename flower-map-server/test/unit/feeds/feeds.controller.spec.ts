import { Test, TestingModule } from '@nestjs/testing';
import { FeedsController } from '../../../src/modules/feeds/feeds.controller';
import { FeedsService } from '../../../src/modules/feeds/feeds.service';
import { LocationsService } from 'src/modules/locations/locations.service';
import { FlowersService } from 'src/modules/flowers/flowers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Feed } from 'src/modules/feeds/entities/feed.entity';
import { Repository } from 'typeorm';
import { Location } from 'src/modules/locations/entities/location.entity';
import { Flower } from 'src/modules/flowers/entities/flower.entity';
import { CreateFeedDto } from 'src/modules/feeds/dto/create-feed.dto';
import { CreateImageDto } from 'src/modules/images/dto/create-image.dto';
import { SingleResponseDto } from 'src/common/single-response.dto';

describe('FeedsController', () => {
  let controller: FeedsController;
  let feedsService: FeedsService;
  let locationsService: LocationsService;
  let flowersService: FlowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedsController],
      providers: [
        FeedsService,
        LocationsService,
        FlowersService,
        {
          provide: getRepositoryToken(Feed),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(Location),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(Flower),
          useClass: Repository
        },
      ],
    }).compile();

    controller = module.get<FeedsController>(FeedsController);
    feedsService = module.get<FeedsService>(FeedsService);
    locationsService = module.get<LocationsService>(LocationsService);
    flowersService = module.get<FlowersService>(FlowersService);
  });

  describe('create', () => {
    it('userIp를 createFeedDto에 세팅한 다음 feed를 생성하고 id를 반환한다.', async () => {
      // given
      const userIp = '::1';
      const createFeedDto = new CreateFeedDto();
      createFeedDto.locationId = 1;
      createFeedDto.images = Array.from({ length: 3 }, (v, i) => new CreateImageDto(
        `mockOriginUrl${i + 1}`,
        `mockOriginEtag${i + 1}`,
        `mockThumbUrl${i + 1}`,
        `mockThumbEtag${i + 1}`,
        i + 1,
        0
      ));

      const feed = createFeedDto.toEntity();
      feed.feedId = 1;
      feed.userIp = userIp;

      jest.spyOn(locationsService, 'existsById').mockResolvedValueOnce();
      jest.spyOn(flowersService, 'exists').mockResolvedValue();
      jest.spyOn(feedsService, 'create').mockResolvedValue(feed);

      // when
      const result = await controller.create(createFeedDto, userIp);

      // then
      expect(locationsService.existsById).toHaveBeenCalledWith(createFeedDto.locationId);
      expect(flowersService.exists).toHaveBeenCalledTimes(createFeedDto.images.length);
      expect(flowersService.exists).toHaveBeenCalledWith(createFeedDto.images[0].flowerId)
      expect(flowersService.exists).toHaveBeenCalledWith(createFeedDto.images[1].flowerId)
      expect(flowersService.exists).toHaveBeenCalledWith(createFeedDto.images[2].flowerId)
      expect(createFeedDto.userIp).toEqual(userIp);
      expect(feedsService.create).toHaveBeenCalledWith(createFeedDto);
      expect(result).toEqual(new SingleResponseDto('Feed', feed.feedId));
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
