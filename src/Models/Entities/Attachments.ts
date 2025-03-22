import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { User } from "./Users";

@Entity('attachments')
export class Attachment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false,
        name: 'path'
    })
    path: string;

    @Column({
        type: 'text',
        nullable: false,
        name: 'mimetype'
    })
    mimetype: string;

    @Column({
        type: 'boolean',
        nullable: false,
        name: 'is_avatar'
    })
    isAvatar: boolean;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;
}