import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
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

  create(createFlowerDto: CreateFlowerDto) {
    return 'This action adds a new flower';
  }

  findAll() {
    return `This action returns all flowers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flower`;
  }

  update(id: number, updateFlowerDto: UpdateFlowerDto) {
    return `This action updates a #${id} flower`;
  }

  remove(id: number) {
    return `This action removes a #${id} flower`;
  }
}
