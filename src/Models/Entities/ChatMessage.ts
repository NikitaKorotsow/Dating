import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Chat } from "./Chats";
import { Message } from "./Messages";

@Entity('chat_message')
export class ChatMessage extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Chat, chat => chat.id)
    @JoinColumn({
        name: 'chat_id'
    })
    chatId: Chat;

    @ManyToOne(() => Message, message => message.id)
    @JoinColumn({
        name: 'message_id'
    })
    messageId: Message;
}