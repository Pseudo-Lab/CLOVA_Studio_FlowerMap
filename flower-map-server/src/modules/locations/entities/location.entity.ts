import { Auditable } from "src/common/auditable.entity";
import { Feed } from "src/modules/feeds/entities/feed.entity";
import { Flower } from "src/modules/flowers/entities/flower.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location extends Auditable {

    @PrimaryGeneratedColumn({ name: 'location_id' })
    locationId: number;

    @Column({ name: 'number_address' })
    numberAddress: string;

    @Column({ name: 'road_address' })
    roadAddress: string;

    @Column({ type: 'point' })
    coordinates: string;

    @ManyToOne(() => Flower, (flower) => flower.locations, { nullable: false })
    @JoinColumn({ name: 'flower_id' })
    flower: Flower;

    @OneToMany(() => Feed, (feed) => feed.location)
    feeds: Feed[];

}
