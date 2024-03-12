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

    // @Index({ spatial: true })
    @Column({
        type: 'point', transformer: {
            from: (value: string) => value.substring(6, value.length - 1).split(' ').map(parseFloat),
            to: (value: number[]) => `POINT(${value[0]} ${value[1]})`
        }
    })
    coordinates: number[]; // 위도, 경도

    @ManyToOne(() => Flower, (flower) => flower.locations, { nullable: false })
    @JoinColumn({ name: 'flower_id' })
    flower: Flower;

    @OneToMany(() => Feed, (feed) => feed.location)
    feeds: Feed[];

}
