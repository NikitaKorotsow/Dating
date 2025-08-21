import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
    Column
} from "typeorm";
import { User } from "./Users";

@Entity('likes')
export class Like extends BaseEntity {

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

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_date',
        nullable: true
    })
    createdDate: string;

    @Column({
        type: 'timestamp',
        name: 'deleted_date',
        nullable: true
    })
    deletedDate: string;
}
