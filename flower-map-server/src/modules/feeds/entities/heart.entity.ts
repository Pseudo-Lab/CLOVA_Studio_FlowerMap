import { Auditable } from "src/common/auditable.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Feed } from "./feed.entity";

@Entity()
@Unique(['userIp', 'feed'])
export class Heart extends Auditable {
    @PrimaryGeneratedColumn({ name: 'heart_id' })
    heartId: number;

    @Column({ name: 'user_ip' })
    userIp: string;

    @ManyToOne(() => Feed, (feed) => feed.hearts)
    @JoinColumn({ name: 'feed_id' })
    feed: Feed;
}