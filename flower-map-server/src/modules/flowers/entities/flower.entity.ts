import { Auditable } from "src/common/auditable.entity";
import { Image } from "src/modules/images/entities/image.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flower extends Auditable {

    @PrimaryGeneratedColumn({ name: 'flower_id' })
    flowerId: number;

    @Column()
    name: string;

    @OneToMany(() => Image, (image) => image.flower)
    images: Image[];

}
