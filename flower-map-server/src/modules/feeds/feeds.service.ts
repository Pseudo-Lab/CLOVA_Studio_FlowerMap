import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';
import { Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcryptjs';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Feed)
    private feedsRepository: Repository<Feed>,
  ) { }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }

  private async verifyPassword(inputPassword: string, dbPassword: string): Promise<void> {
    const result = await compare(inputPassword, dbPassword);
    if (!result) throw new UnauthorizedException(CustomErrorCode.FEED_UNAUTHORIZED);
  }

  async create(feed: Feed) {
    feed.password = await this.hashPassword(feed.password);
    return this.feedsRepository.create(feed).save();
  }

  async findAllByLocationId(locationId: number, orderBy: 'feedId' | 'heart', limit: number, offset: number): Promise<[Feed[], number]> {
    // 베이스 쿼리
    const baseQuery = this.feedsRepository
      .createQueryBuilder('feed')
      .leftJoin('feed.hearts', 'heart')
      .addSelect('COUNT(heart.heart_id)', 'heartCount') // hearts의 수를 선택하고 heartCount라는 별칭을 부여합니다.
      .leftJoinAndSelect('feed.images', 'image', 'image.idx = 0') // 첫번째 사진만 가져와야 매핑할때 불일치 문제 없음
      .where('feed.location.locationId = :locationId', { locationId })
      .groupBy('feed.feed_id')
      .addGroupBy('image.image_id')
      .take(limit)
      .skip(offset);

    // 쿼리에 맞는 갯수
    const total = await baseQuery.getCount();

    // 최신순 정렬
    if (orderBy === 'feedId') {
      baseQuery.orderBy('feed.feedId', 'DESC');
    } else {
      // heart 많은 순 정렬
      baseQuery
        .orderBy('heartCount', 'DESC')
        .addOrderBy('feed.feedId', 'DESC');
    }

    const { raw, entities } = await baseQuery.getRawAndEntities();
    entities.map((feed, index) => feed.heartCount = parseInt(raw[index].heartCount))

    return [entities, total];
  }

  /**
   * 특정 Feed에 대한 정보 가져오기
   * 연관관계 : Image, Images[].flower, Location, Heart
   */
  // TODO Heart 관련
  async findOne(feedId: number): Promise<Feed> {
    const feed = await this.feedsRepository.findOne({
      where: { feedId },
      relations: {
        location: true,
        hearts: true,
        images: { flower: true },
      }
      // relations: ['images', 'images.flower', 'location', 'hearts']
    });
    if (!feed) throw new NotFoundException(CustomErrorCode.FEED_NOT_FOUND);
    else return feed;
  }

  async update(feedId: number, updateFeedDto: UpdateFeedDto) {
    const feed = await this.feedsRepository.findOne({
      where: { feedId },
      relations: {
        // location: true
      }
    });

    await this.verifyPassword(updateFeedDto.currentPassword, feed.password);

    feed.content = updateFeedDto.content;
    // if (updateFeedDto.password) feed.password = await this.hashPassword(updateFeedDto.password);

    return await feed.save();
  }

  async remove(feedId: number, inputPassword: string): Promise<void> {
    // 게시글 조회
    const feed = await this.findOne(feedId);
    // 비밀번호 검사 -> 통과시 아무일 없음, 실패시 예외발생
    await this.verifyPassword(inputPassword, feed.password);
    // 게시글 삭제 진행
    await feed.softRemove()
    return;
  }
}
