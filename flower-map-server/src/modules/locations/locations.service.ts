import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { RequestNearbyQueriesDto } from './dto/request-nearby-queries.dto';
import { SearchQueriesDto } from './dto/search-queries.dto';

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
    if (Array.isArray(flowerIds) && flowerIds.length > 0) {
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

  // TODO 검색어 연관도 순으로 최적화해야함
  /**
   * Location의 name, roadAddress, numberAddress에서 주어진 query로 검색
   * 게시글 많은 순으로 정렬
   */
  async findAllByNameAndAddress(searchQueriesDto: SearchQueriesDto)
    : Promise<{ locations: Location[], total: number }> {
    const { query, limit, offset } = searchQueriesDto;

    // 베이스 쿼리
    const baseQuery = this.locationsRepository
      .createQueryBuilder('location')
      .leftJoin('location.feeds', 'feed')
      .addSelect('COUNT(feed.feed_id)', 'feedsCount')
      .groupBy('location.location_id')
      .orderBy('feedsCount', 'DESC')
      .addOrderBy('location.locationId', 'DESC')
      .take(limit)
      .skip(offset)

    // where절 세팅
    if (query) {
      baseQuery
        .where('location.name LIKE :query')
        .orWhere('location.number_address LIKE :query')
        .orWhere('location.road_address LIKE :query')
        .setParameters({ query: `%${query}%` })
    }

    // 데이터 요청 및 반환
    const [locations, total] = await baseQuery.getManyAndCount();
    // const total: number = await baseQuery.getCount();
    return { locations, total };
  }
}
