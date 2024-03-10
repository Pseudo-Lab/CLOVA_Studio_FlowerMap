import { Test, TestingModule } from '@nestjs/testing';
import { ImagesEditingService } from './images-editing.service';

describe('ImagesEditingService', () => {
  let service: ImagesEditingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesEditingService],
    }).compile();

    service = module.get<ImagesEditingService>(ImagesEditingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
