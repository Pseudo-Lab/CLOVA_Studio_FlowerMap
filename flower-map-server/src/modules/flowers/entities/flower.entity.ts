import { Auditable } from "src/common/auditable.entity";
import { Location } from "src/modules/locations/entities/location.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flower extends Auditable {

    @PrimaryGeneratedColumn({ name: 'flower_id' })
    flowerId: number;

    @Column()
    name: string;

    @OneToMany(() => Location, (location) => location.flower)
    locations: Location[];

}
