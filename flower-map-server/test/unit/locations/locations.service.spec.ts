import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from '../../../src/modules/locations/locations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Location } from 'src/modules/locations/entities/location.entity';
import { Repository } from 'typeorm';
import { RequestNearbyQueriesDto } from 'src/modules/locations/dto/request-nearby-queries.dto';
import { NotFoundException } from '@nestjs/common';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { SearchQueriesDto } from 'src/modules/locations/dto/search-queries.dto';

describe('LocationsService', () => {
  let service: LocationsService;
  let locationsRepository: Repository<Location>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: getRepositoryToken(Location),
          useClass: Repository
        }
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
    locationsRepository = module.get<Repository<Location>>(getRepositoryToken(Location));
  });

  describe('create', () => {
    it('Location을 입력받아 저장하고 반환한다.', async () => {
      // given
      const location = new Location();
      jest.spyOn(location, 'save').mockReturnThis();

      // when
      const result = await service.create(location);

      // then
      expect(result).toBe(location);
    });
  });

  describe('findAllByCoordinates', () => {
    let queries: RequestNearbyQueriesDto;
    let mockCreateQueryBuilder: any;

    beforeEach(() => {
      queries = new RequestNearbyQueriesDto();
      queries.longitude = 131.8676;
      queries.latitude = 37.2422;
      queries.meter = 10000;
      mockCreateQueryBuilder = {
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        setParameters: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[new Location()], 1]),
      };
    });

    it('flowerIds가 주어지지 않은 경우 andWhere가 호출되지 않아야 한다.', async () => {
      // given
      const { longitude, latitude, meter } = queries;
      jest
        .spyOn(locationsRepository, 'createQueryBuilder')
        .mockImplementation(() => mockCreateQueryBuilder);

      // when
      await service.findAllByCoordinates(queries);

      // then
      expect(mockCreateQueryBuilder.setParameters).toHaveBeenCalledWith({ longitude, latitude, meter });
      expect(mockCreateQueryBuilder.andWhere).not.toHaveBeenCalled();
    });

    it('flowerIds가 주어진 경우 andWhere가 호출되어야 한다.', async () => {
      // given
      queries.flowerIds = [1];
      const { longitude, latitude, meter, flowerIds } = queries;
      jest
        .spyOn(locationsRepository, 'createQueryBuilder')
        .mockImplementation(() => mockCreateQueryBuilder);

      // when
      await service.findAllByCoordinates(queries);

      // then
      expect(mockCreateQueryBuilder.setParameters).toHaveBeenCalledWith({ longitude, latitude, meter });
      expect(mockCreateQueryBuilder.andWhere).toHaveBeenCalledWith('flower.flowerId IN (:...flowerIds)', { flowerIds });
    });
  });

  describe('existsById', () => {
    it('특정 Location이 존재하면 예외가 발생하지 않아야 한다.', async () => {
      // given
      jest.spyOn(locationsRepository, 'existsBy').mockResolvedValue(true);

      // when
      let isErrorOccurred = false;
      try {
        await service.existsById(1);
      } catch (error) {
        isErrorOccurred = true;
      }
      // then
      expect(isErrorOccurred).toBe(false);
    });

    it('특정 Location이 존재하지 않으면 L404예외가 발생한다.', async () => {
      // given
      jest.spyOn(locationsRepository, 'existsBy').mockResolvedValue(false);

      // when
      // then
      await expect(service.existsById(1))
        .rejects
        .toThrow(new NotFoundException(CustomErrorCode.LOCATION_NOT_FOUND));
    });
  });

  describe('findOne', () => {
    it('특정 Location을 locationId로 조회하여 반환한다.', async () => {
      // given
      const locationId = 1;
      const location = new Location();
      location.locationId = locationId;
      jest.spyOn(locationsRepository, 'findOne').mockResolvedValue(location);

      // when
      const result = await service.findOne(1);

      // then
      expect(locationsRepository.findOne).toHaveBeenCalledWith({
        where: { locationId },
        relations: { flowers: true }
      });
      expect(result).toBe(location);
    });

    it('특정 Location을 locationId로 조회하고 존재하지 않으면 L404예외를 던진다.', async () => {
      // given
      jest.spyOn(locationsRepository, 'findOne').mockResolvedValue(null);

      // when
      // then
      await expect(service.findOne(1))
        .rejects
        .toThrow(new NotFoundException(CustomErrorCode.LOCATION_NOT_FOUND));
    });
  });

  describe('findAllByNameAndAddress', () => {
    let searchQueriesDto: SearchQueriesDto;
    let mockCreateQueryBuilder: any;
    beforeEach(() => {
      searchQueriesDto = new SearchQueriesDto();
      searchQueriesDto.limit = 10;
      searchQueriesDto.offset = 0;
      mockCreateQueryBuilder = {
        leftJoin: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        // orWhere:jest.fn().mockReturnThis(),
        setParameters: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[new Location()], 1]),
      };
    });

    it('query가 존재할 경우 where절 조건을 추가하여 검색한다.', async () => {
      // given
      searchQueriesDto.query = 'test';
      jest
        .spyOn(locationsRepository, 'createQueryBuilder')
        .mockImplementation(() => mockCreateQueryBuilder);

      // when
      const result = await service.findAllByNameAndAddress(searchQueriesDto);

      // then
      expect(mockCreateQueryBuilder.take).toHaveBeenCalledWith(searchQueriesDto.limit);
      expect(mockCreateQueryBuilder.skip).toHaveBeenCalledWith(searchQueriesDto.offset);
      expect(mockCreateQueryBuilder.where).toHaveBeenCalled();
      expect(mockCreateQueryBuilder.orWhere).toHaveBeenCalledTimes(2);
      expect(mockCreateQueryBuilder.setParameters).toHaveBeenCalledWith({ query: `%${searchQueriesDto.query}%` });
    });

    it('query가 존재하지 않을 경우 where절 조건이 호출되지 않아야 한다.', async () => {
      // given
      jest
        .spyOn(locationsRepository, 'createQueryBuilder')
        .mockImplementation(() => mockCreateQueryBuilder);

      // when
      const result = await service.findAllByNameAndAddress(searchQueriesDto);

      // then
      expect(mockCreateQueryBuilder.take).toHaveBeenCalledWith(searchQueriesDto.limit);
      expect(mockCreateQueryBuilder.skip).toHaveBeenCalledWith(searchQueriesDto.offset);
      expect(mockCreateQueryBuilder.where).not.toHaveBeenCalled();
      expect(mockCreateQueryBuilder.orWhere).not.toHaveBeenCalled();
      expect(mockCreateQueryBuilder.setParameters).not.toHaveBeenCalled();
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
