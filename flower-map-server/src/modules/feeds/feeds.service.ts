import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Feed)
    private feedsRepository: Repository<Feed>,
  ) { }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private async verifyPassword(inputPassword: string, dbPassword: string): Promise<void> {
    const result = await bcrypt.compare(inputPassword, dbPassword);
    if (!result) throw new UnauthorizedException(CustomErrorCode.FEED_UNAUTHORIZED);
  }

  async create(feed: Feed) {
    feed.password = await this.hashPassword(feed.password);
    return this.feedsRepository.create(feed).save();
  }

  findAll() {
    return `This action returns all feeds`;
  }

  /**
   * 특정 Feed에 대한 정보 가져오기
   * 연관관계 : Image, Images[].flower, Location
   */
  // TODO Heart 관련
  async findOne(feedId: number): Promise<Feed> {
    const feed = await this.feedsRepository.findOne({ where: { feedId }, relations: ['images', 'images.flower', 'location'] });
    if (!feed) throw new NotFoundException(CustomErrorCode.FEED_NOT_FOUND);
    else return feed;
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
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
