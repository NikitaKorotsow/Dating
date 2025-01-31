import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    JoinColumn
} from "typeorm"
import { User } from "./Users"

@Entity('likes')
export class Like extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> User, user => user.id)
    @JoinColumn({
        name:'to_id'
    })
    to: User;

    @ManyToOne(()=> User, user => user.id)
    @JoinColumn({
        name:'from_id'
    })
    from: User;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name:'created_date'

    })
    createdDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name:'deleted_date'
    })
    deletedDate: Date;

}
