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

    @Column({
        type: 'text',
        nullable: false,
        name: 'type'
    })
    type: string;

    @Column({
        type: 'text',
        nullable: false,
        name: 'message'
    })
    message: string;

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
}