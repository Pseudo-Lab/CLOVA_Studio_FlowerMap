import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Auditable extends BaseEntity {
    @CreateDateColumn({    // type: 'datetime', width: 4,
        name: 'created_at',
        nullable: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'modified_at',
        nullable: false
    })
    modifiedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        nullable: true
    })
    deletedAt: Date | null;
}