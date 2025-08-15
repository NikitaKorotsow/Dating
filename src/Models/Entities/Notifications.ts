import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./Users";

@Entity('notifications')
export class Notifications extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)

    @JoinColumn({
        name: 'to_id'
    })
    to: User;

    @ManyToOne(() => User, user => user.id)

    @JoinColumn({
        name: 'from_id'
    })
    from: User;

    @Column({
        type: 'text',
        nullable: false,
        name: 'type'
    })
    type: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'created_date'
    })
    createdDate: string;

    @Column({
        type: 'boolean',
        nullable: false,
        name: 'is_deleted'
    })
    isDeleted: boolean;

    @Column({
        type: 'boolean',
        nullable: false,
        name: 'read'
    })
    read: boolean;
}