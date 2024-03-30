import { Test, TestingModule } from '@nestjs/testing';
import { FlowersService } from '../../../src/modules/flowers/flowers.service';

describe('FlowersService', () => {
  let service: FlowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowersService],
    }).compile();

    service = module.get<FlowersService>(FlowersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
