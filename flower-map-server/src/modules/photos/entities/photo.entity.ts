import { Auditable } from "src/common/auditable.entity";
import { Feed } from "src/modules/feeds/entities/feed.entity";
import { Location } from "src/modules/locations/entities/location.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo extends Auditable {

    @PrimaryGeneratedColumn({ name: 'photo_id' })
    photoId: number;

    @ManyToOne(() => Location, (location) => location.photos, { nullable: true })
    @JoinColumn({ name: 'location_id' })
    location: Location;

    @ManyToOne(() => Feed, (feed) => feed.photos, { nullable: true })
    @JoinColumn({ name: 'feed_id' })
    feed: Feed;

}
