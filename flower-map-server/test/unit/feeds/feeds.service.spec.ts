import { Test, TestingModule } from '@nestjs/testing';
import { FeedsService } from '../../../src/modules/feeds/feeds.service';
import { Repository } from 'typeorm';
import { Feed } from 'src/modules/feeds/entities/feed.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
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
      jest.spyOn(feedsRepository, 'save').mockResolvedValue(feed);

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
        .toThrow(new UnauthorizedException(CustomErrorCode.FEED_UNAUTHORIZED));
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
