import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(feed: Feed) {
    feed.password = await this.hashPassword(feed.password);
    return this.feedsRepository.create(feed).save();
  }

  findAll() {
    return `This action returns all feeds`;
  }

  /**
   * 특정 Feed에 대한 정보 가져오기
   * 연관관계 : Image, Location
   */
  // TODO Heart 관련
  async findOne(feedId: number): Promise<Feed> {
    const feed = await this.feedsRepository.findOne({ where: { feedId }, relations: ['images', 'location'] });
    if (!feed) throw new NotFoundException(CustomErrorCode.FEED_NOT_FOUND);
    else return feed;
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} feed`;
  }
}
