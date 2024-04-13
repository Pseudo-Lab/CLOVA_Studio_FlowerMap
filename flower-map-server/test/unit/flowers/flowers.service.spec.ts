import { Test, TestingModule } from '@nestjs/testing';
import { FlowersService } from '../../../src/modules/flowers/flowers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flower } from 'src/modules/flowers/entities/flower.entity';
import { Repository } from 'typeorm';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { CustomHttpException } from 'src/common/exception/custom-http-exception';

describe('FlowersService', () => {
  let service: FlowersService;
  let flowersRepository: Repository<Flower>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowersService,
        {
          provide: getRepositoryToken(Flower),
          useClass: Repository
        }
      ],
    }).compile();

    service = module.get<FlowersService>(FlowersService);
    flowersRepository = module.get<Repository<Flower>>(getRepositoryToken(Flower));
  });

  describe('exists', () => {
    it('Flower가 존재하면 아무일도 일어나지 않는다.', async () => {
      // given
      const flowerId = 1;
      jest.spyOn(flowersRepository, 'existsBy').mockResolvedValue(true);

      // when
      // then
      expect(await service.exists(flowerId)).toBeUndefined();
    });

    it(`Flower가 존재하지 않으면 FL404 예외 발생`, async () => {
      // given
      const flowerId = 1;
      jest.spyOn(flowersRepository, 'existsBy').mockResolvedValue(false);

      // when
      // then
      await expect(service.exists(flowerId)).rejects.toThrow(new CustomHttpException(CustomErrorCode.FLOWER_NOT_FOUND));
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
