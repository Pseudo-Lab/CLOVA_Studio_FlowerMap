import { Test, TestingModule } from '@nestjs/testing';
import { FeedsService } from '../../../src/modules/feeds/feeds.service';
import { Repository } from 'typeorm';
import { Feed } from 'src/modules/feeds/entities/feed.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { CustomHttpException } from 'src/common/exception/custom-http-exception';

describe('FeedsService', () => {
  let service: FeedsService;
  let feedsRepository: Repository<Feed>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedsService,
        {
          provide: getRepositoryToken(Feed),
          useClass: Repository
        }
      ],
    }).compile();

    service = module.get<FeedsService>(FeedsService);
    feedsRepository = module.get<Repository<Feed>>(getRepositoryToken(Feed));
  });

  describe('create', () => {
    it('비밀번호를 암호화하여 Feed를 생성 후 반환.', async () => {
      // given
      const password = 'Feed12';
      const feed = new Feed();
      feed.password = password;
      jest.spyOn(feedsRepository, 'create').mockReturnThis();
      jest.spyOn(feedsRepository, 'save').mockResolvedValue(feed);

      // when
      const result = await service.create(feed);

      // then
      expect(result.password).not.toBe(password);
    });
  });

  describe('findAllByLocationId', () => {
    // 함수 인자
    let locationId;
    let orderBy;
    let limit;
    let offset;
    // 결과
    let raw;
    let entities;
    let total;
    // mock 쿼리빌더
    let mockCreateQueryBuilder: any;

    beforeEach(() => {
      // 함수 인자
      locationId = 1;
      limit = 10;
      offset = 0;
      // 결과
      raw = [];
      entities = [];
      total = 100;
      for (let i = 10; i > 0; i--) {
        raw.push({ heartCount: i });
        entities.push(new Feed());
      }
      // mock
      mockCreateQueryBuilder = {
        leftJoin: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(), // 파라미터 그대로 전달
        groupBy: jest.fn().mockReturnThis(),
        addGroupBy: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(), // 파라미터 그대로 전달
        skip: jest.fn().mockReturnThis(), // 파라미터 그대로 전달
        orderBy: jest.fn().mockReturnThis(), // 조건에 따라 호출되는 값이 변동
        addOrderBy: jest.fn().mockReturnThis(), //조건에 따라 호출 안될수도 있음
        getCount: jest.fn().mockResolvedValue(total),
        getRawAndEntities: jest.fn().mockResolvedValue({ raw, entities })
      };
    });

    it('최신순 정렬이 호출되어야함.', async () => {
      // given
      orderBy = 'feedId';

      jest
        .spyOn(feedsRepository, 'createQueryBuilder')
        .mockImplementation(() => mockCreateQueryBuilder);

      // when
      const result = await service.findAllByLocationId(locationId, orderBy, limit, offset);

      // then
      expect(mockCreateQueryBuilder.where).toHaveBeenCalledWith('feed.location.locationId = :locationId', { locationId });
      expect(mockCreateQueryBuilder.take).toHaveBeenCalledWith(limit);
      expect(mockCreateQueryBuilder.skip).toHaveBeenCalledWith(offset);
      expect(mockCreateQueryBuilder.orderBy).toHaveBeenCalledWith('feed.feedId', 'DESC');
      expect(mockCreateQueryBuilder.addOrderBy).not.toHaveBeenCalled();
      for (let i = 0; i < result[0].length; i++) expect(result[0][i].heartCount).toEqual(raw[i].heartCount);
      expect(result[1]).toEqual(total);
    });

    it('heartCount 순 정렬이 호출되어야함.', async () => {
      // given
      orderBy = 'heartCount';

      mockCreateQueryBuilder.addOrderBy = jest.fn().mockReturnThis();

      jest
        .spyOn(feedsRepository, 'createQueryBuilder')
        .mockImplementation(() => mockCreateQueryBuilder);

      // when
      const result = await service.findAllByLocationId(locationId, orderBy, limit, offset);

      // then
      expect(mockCreateQueryBuilder.where).toHaveBeenCalledWith('feed.location.locationId = :locationId', { locationId });
      expect(mockCreateQueryBuilder.take).toHaveBeenCalledWith(limit);
      expect(mockCreateQueryBuilder.skip).toHaveBeenCalledWith(offset);
      expect(mockCreateQueryBuilder.orderBy).toHaveBeenCalledWith('heartCount', 'DESC');
      expect(mockCreateQueryBuilder.addOrderBy).toHaveBeenCalledWith('feed.feedId', 'DESC');
      for (let i = 0; i < result[0].length; i++) expect(result[0][i].heartCount).toEqual(raw[i].heartCount);
      expect(result[1]).toEqual(total);
    });
  });

  describe('findOne', () => {
    it('feedId를 이용하여 Feed를 조회하고 존재할 경우 해당 Feed 반환.', async () => {
      // given
      const feedId = 1;
      const feed = new Feed();
      feed.feedId = feedId;
      jest.spyOn(feedsRepository, 'findOne').mockResolvedValue(feed);

      // when
      const result = await service.findOne(feedId);

      // then
      expect(result.feedId).toEqual(feedId);
    });

    it('feedId를 이용하여 Feed를 조회하고 존재하지 않아 F404예외 발생.', async () => {
      // given
      const feedId = 1;
      const feed = new Feed();
      feed.feedId = feedId;
      jest.spyOn(feedsRepository, 'findOne').mockResolvedValue(null);

      // when
      // then
      await expect((service.findOne(feedId)))
        .rejects
        .toThrow(new CustomHttpException(CustomErrorCode.FEED_NOT_FOUND));
    });
  });

  describe('remove', () => {
    let feed;

    beforeEach(() => {
      feed = new Feed();
      feed.password = '$2a$10$wXfG5b3QAE6eoJErF.hmPONRpep/aBl7eoXRnhb/XNE0DgqtK12k6';
      jest.spyOn(feedsRepository, 'findOne').mockResolvedValue(feed);
    });

    it('Feed.password와 inputPassword가 일치하여 게시글을 삭제한다.', async () => {
      // given
      const feedId = 1;
      const inputPassword = 'Feed12';

      jest.spyOn(feed, 'softRemove').mockReturnThis();

      // when
      const result = await service.remove(feedId, inputPassword);

      // then
      expect(feed.softRemove).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('Feed.password와 inputPassword가 일치하지 않아 FU401 예외 발생.', async () => {
      // given
      const feedId = 1;
      const inputPassword = 'Wrong1';

      jest.spyOn(feed, 'softRemove').mockReturnThis();

      // when
      // then
      await expect(service.remove(feedId, inputPassword))
        .rejects
        .toThrow(new CustomHttpException(CustomErrorCode.FEED_UNAUTHORIZED));
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
