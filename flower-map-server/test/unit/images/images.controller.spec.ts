import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from '../../../src/modules/images/images.controller';
import { ImagesService } from '../../../src/modules/images/images.service';

describe('ImagesController', () => {
  let controller: ImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
