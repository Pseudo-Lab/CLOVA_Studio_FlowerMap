import { Auditable } from "src/common/auditable.entity";
import { Feed } from "src/modules/feeds/entities/feed.entity";
import { Flower } from "src/modules/flowers/entities/flower.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location extends Auditable {

    @PrimaryGeneratedColumn({ name: 'location_id' })
    locationId: number;

    @Column({ length: 15 })
    name: string;

    @Column({ name: 'number_address' })
    numberAddress: string;

    @Column({ name: 'road_address' })
    roadAddress: string;

    // @Index({ spatial: true })
    @Column({
        type: 'point',
        transformer: {
            from: (value: string) => value.substring(6, value.length - 1).split(' ').map(parseFloat),
            to: (value: number[]) => `POINT(${value[0]} ${value[1]})`
        }
    })
    coordinates: number[]; // 경도, 위도

    @ManyToMany(() => Flower)
    @JoinTable({
        name: 'location_flower', // 연결 테이블의 이름
        joinColumn: { name: 'location_id' }, // 현재 엔티티의 열 이름
        inverseJoinColumn: { name: 'flower_id' } // 대상 엔티티의 열 이름
    })
    flowers: Flower[];

    @OneToMany(() => Feed, (feed) => feed.location)
    feeds: Feed[];

    // 편의 메서드
    addFlower(flowerId: number): void {
        if (!this.flowers) this.flowers = [];

        const flower = new Flower();
        flower.flowerId = flowerId;
        this.flowers.push(flower);
    }
}
