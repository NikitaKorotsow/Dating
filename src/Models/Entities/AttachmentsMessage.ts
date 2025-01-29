import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from "typeorm"
import { Attachments } from "./Attachments";
import { Message } from "./Messages";

@Entity()
export class AttachmentsMessage extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Attachments, attachments => attachments.id)
    @JoinColumn({
        name: 'attachment_id'
    })
    attachmentsId: Attachments;

    @ManyToOne(() => Message, message => message.id)
    @JoinColumn({
        name: 'message_id'
    })
    messageId: Message;
}