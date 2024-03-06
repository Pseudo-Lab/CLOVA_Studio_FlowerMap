import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) { }

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    return await this.locationsRepository
      .create(createLocationDto.toEntity())
      .save();
  }

  findAll() {
    return `This action returns all locations`;
  }

  async findOne(locationId: number): Promise<Location> {
    const location = await this.locationsRepository.findOneBy({ locationId });
    if (location) return location;
    else throw new NotFoundException(); //TODO 예외 구체화할것
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
