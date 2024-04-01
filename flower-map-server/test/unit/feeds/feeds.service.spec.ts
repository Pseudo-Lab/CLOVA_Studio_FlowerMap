import { Test, TestingModule } from '@nestjs/testing';
import { FeedsService } from '../../../src/modules/feeds/feeds.service';
import { Repository } from 'typeorm';
import { Feed } from 'src/modules/feeds/entities/feed.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';

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
      jest.spyOn(feedsRepository, 'save').mockReturnThis();

      // when
      const result = await service.create(feed);

      // then
      expect(result.password).not.toBe(password);
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
        .toThrow(new NotFoundException(CustomErrorCode.FEED_NOT_FOUND));
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
