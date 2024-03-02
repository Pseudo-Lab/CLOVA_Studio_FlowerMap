import { Location } from "src/modules/locations/entities/location.entity";
import { Photo } from "src/modules/photos/entities/photo.entity";
import { Auditable } from "src/common/auditable.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feed extends Auditable {

    @PrimaryGeneratedColumn()
    feedId: number;

    @Column()
    content: string;

    @Column()
    nickname: string;

    @Column()
    password: string;

    @Column()
    capturedAt: Date;

    @Column()
    floweringStatus: number;

    // @OneToMany(() => Photo, (photo) => photo.feed)
    // photos: Photo[];

    // @ManyToOne(() => Location, (location) => location.feeds)
    // location: Location;
}
