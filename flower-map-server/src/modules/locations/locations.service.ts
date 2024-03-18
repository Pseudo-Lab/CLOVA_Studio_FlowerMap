import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { RequestNearbyQueriesDto } from './dto/request-nearby-queries.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) { }

  async create(location: Location): Promise<Location> {
    return await location.save();
  }

  /**
   * 좌표로부터 반경 meter 이내의 Flower가 있는 모든 Location 검색
   * flowerIds 주어질 경우, 해당 flower가 있는 Location들만 검색
   */
  async findAllByCoordinates(queries: RequestNearbyQueriesDto): Promise<[Location[], number]> {
    const { longitude, latitude, meter, flowerIds } = queries;

    // 베이스 쿼리
    const baseQuery = this.locationsRepository
      .createQueryBuilder('location')
      .innerJoinAndSelect('location.flowers', 'flower') // 꽃이 없으면 검색되지 않음
      .where('ST_DISTANCE_SPHERE(coordinates, POINT(:longitude, :latitude)) <= :meter')
      .setParameters({ longitude, latitude, meter });

    // FlowerId가 존재할 경우
    if (flowerIds) {
      baseQuery.andWhere('flower.flowerId IN (:...flowerIds)', { flowerIds });
    }

    return await baseQuery.getManyAndCount();
  }

  async existsById(locationId: number) {
    if (!await this.locationsRepository.existsBy({ locationId })) {
      throw new NotFoundException(CustomErrorCode.LOCATION_NOT_FOUND);
    }
  }

  async findOne(locationId: number): Promise<Location> {
    const location = await this.locationsRepository.findOne({
      where: { locationId },
      relations: { flowers: true }
    });
    if (location) return location;
    else throw new NotFoundException(CustomErrorCode.LOCATION_NOT_FOUND);
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
