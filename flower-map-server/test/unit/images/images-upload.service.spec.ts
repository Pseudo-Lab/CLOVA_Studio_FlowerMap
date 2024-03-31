import { Test, TestingModule } from '@nestjs/testing';
import { ImagesUploadService } from '../../../src/modules/images/images-upload.service';

describe('ImagesUploadService', () => {
  let service: ImagesUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesUploadService],
    }).compile();

    service = module.get<ImagesUploadService>(ImagesUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
