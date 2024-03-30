import { Test, TestingModule } from '@nestjs/testing';
import { FeedsController } from '../../../src/modules/feeds/feeds.controller';
import { FeedsService } from '../../../src/modules/feeds/feeds.service';

describe('FeedsController', () => {
  let controller: FeedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedsController],
      providers: [FeedsService],
    }).compile();

    controller = module.get<FeedsController>(FeedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
