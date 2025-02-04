import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
    Column,
    OneToMany
} from "typeorm"
import { User } from "./Users"
import { ChatMessage } from "./ChatMessage";
import { AttachmentMessage } from "./AttachmentsMessage";

@Entity('message')
export class Message extends BaseEntity {

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
        name: 'content'
    })
    content: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'created_date'
    })
    createdDate: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'updated_date'
    })
    updatedDate: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'deleted_date'
    })
    deletedDate: string;

    @Column({
        type: 'boolean',
        nullable: false,
        name: 'is_deleted'
    })
    isDeleted: boolean;

    @OneToMany(() => ChatMessage, chatMessage => chatMessage.messageId)
    chatMessageId: ChatMessage[];

    @OneToMany(() => AttachmentMessage, attachmentMessage => attachmentMessage.messageId)
    attachmentsMessageId: ChatMessage[];
}
