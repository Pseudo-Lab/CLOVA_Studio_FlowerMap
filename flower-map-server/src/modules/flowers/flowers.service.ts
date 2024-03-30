import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flower } from './entities/flower.entity';
import { Repository } from 'typeorm';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower)
    private flowersRepository: Repository<Flower>,
  ) { }

  async exists(flowerId: number) {
    if (!await this.flowersRepository.existsBy({ flowerId })) {
      throw new NotFoundException(CustomErrorCode.FLOWER_NOT_FOUND);
    }
  }

}
