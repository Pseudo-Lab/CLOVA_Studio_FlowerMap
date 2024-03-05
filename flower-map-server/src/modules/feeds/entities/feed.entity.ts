import { Location } from "src/modules/locations/entities/location.entity";
import { Auditable } from "src/common/auditable.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "src/modules/images/entities/image.entity";

@Entity()
export class Feed extends Auditable {

    @PrimaryGeneratedColumn({ name: 'feed_id' })
    feedId: number;

    @Column()
    content: string;

    @Column()
    nickname: string;

    @Column()
    password: string;

    @Column({ type: 'datetime', width: 0, name: 'captured_at' })
    capturedAt: Date;

    @Column({ name: 'flowering_status' })
    floweringStatus: number;

    @OneToMany(() => Image, (image) => image.feed)
    images: Image[];

    @ManyToOne(() => Location, (location) => location.feeds, { nullable: false })
    @JoinColumn({ name: 'location_id' })
    location: Location;

}
