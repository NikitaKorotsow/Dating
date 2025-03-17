import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Attachment } from "./Attachments";
import { Message } from "./Messages";

@Entity('attachments_message')
export class AttachmentMessage extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Attachment, attachments => attachments.id)
    @JoinColumn({
        name: 'attachment_id'
    })
    attachmentsId: Attachment;

    @ManyToOne(() => Message, message => message.id)
    @JoinColumn({
        name: 'message_id'
    })
    messageId: Message;
}