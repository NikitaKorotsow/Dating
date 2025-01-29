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
import { AttachmentsMessage } from "./AttachmentsMessage";

@Entity()
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
    title: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'created_date'
    })
    createdDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'updated_date'
    })
    updatedDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'deleted_date'
    })
    deletedDate: Date;

    @Column({
        type: 'boolean',
        nullable: false,
        name: 'is_deleted'
    })
    isDeleted: boolean;

    @OneToMany(() => ChatMessage, chatMessage => chatMessage.messageId)
    chatMessageId: ChatMessage[];

    @OneToMany(() => AttachmentsMessage, attachmentsMessage => attachmentsMessage.messageId)
    attachmentsMessageId: ChatMessage[];
}
