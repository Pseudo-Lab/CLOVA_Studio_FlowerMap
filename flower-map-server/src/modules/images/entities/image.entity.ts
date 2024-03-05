import { Auditable } from "src/common/auditable.entity";
import { Feed } from "src/modules/feeds/entities/feed.entity";
import { Location } from "src/modules/locations/entities/location.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image extends Auditable {

    @PrimaryGeneratedColumn({ name: 'image_id' })
    imageId: number;

    @Column({ name: 'uploader_ip' })
    uploaderIp: string;

    @Column({ name: 'origin_url' })
    originUrl: string;

    @Column({ name: 'thumb_url' })
    thumbUrl: string;

    @ManyToOne(() => Location, (location) => location.images, { nullable: true })
    @JoinColumn({ name: 'location_id' })
    location: Location;

    @ManyToOne(() => Feed, (feed) => feed.images, { nullable: true })
    @JoinColumn({ name: 'feed_id' })
    feed: Feed;

}
