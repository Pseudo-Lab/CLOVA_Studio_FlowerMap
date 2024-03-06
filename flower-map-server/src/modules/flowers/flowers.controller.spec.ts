import { Test, TestingModule } from '@nestjs/testing';
import { FlowersController } from './flowers.controller';
import { FlowersService } from './flowers.service';

describe('FlowersController', () => {
  let controller: FlowersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlowersController],
      providers: [FlowersService],
    }).compile();

    controller = module.get<FlowersController>(FlowersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
