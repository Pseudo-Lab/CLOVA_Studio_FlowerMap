import { Test, TestingModule } from '@nestjs/testing';
import { FeedsService } from '../../../src/modules/feeds/feeds.service';
import { Repository } from 'typeorm';
import { Feed } from 'src/modules/feeds/entities/feed.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
