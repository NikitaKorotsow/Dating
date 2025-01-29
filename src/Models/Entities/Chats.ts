import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    Column,
    OneToMany
} from "typeorm"
import { User } from "./Users"
import { ChatMessage } from "./ChatMessage";

@Entity()
export class Chat extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({
        name: 'to_id'
    })
    toId: User;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({
        name: 'from_id'
    })
    fromId: User;

    @Column({
        type: 'text',
        nullable: false,
        name: 'title'

    })
    title: string;

    @OneToMany(() => ChatMessage, chatMessage => chatMessage.chatId)
    chatId: ChatMessage[];
}
