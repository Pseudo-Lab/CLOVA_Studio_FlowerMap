import { Auditable } from "src/common/auditable.entity";
import { Feed } from "src/modules/feeds/entities/feed.entity";
import { Flower } from "src/modules/flowers/entities/flower.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image extends Auditable {

    @PrimaryGeneratedColumn({ name: 'image_id' })
    imageId: number;

    @Column({ name: 'user_ip' })
    userIp: string;

    @Column({ name: 'origin_url' })
    originUrl: string;

    @Column({ name: 'origin_e_tag' })
    originETag: string;

    @Column({ name: 'thumb_url' })
    thumbUrl: string;

    @Column({ name: 'thumb_e_tag' })
    thumbETag: string;

    @Column({ nullable: true })
    idx: number;

    @ManyToOne(() => Feed, (feed) => feed.images, { nullable: true })
    @JoinColumn({ name: 'feed_id' })
    feed: Feed;

    @ManyToOne(() => Flower, (flower) => flower.images, { nullable: true })
    @JoinColumn({ name: 'flower_id' })
    flower: Flower;

    @Column({ name: 'flowering_status' })
    floweringStatus: number;
}
