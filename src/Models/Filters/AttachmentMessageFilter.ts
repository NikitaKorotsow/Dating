import { Attachment } from "../Entities/Attachments";
import { Message } from "../Entities/Messages";


export class AttachmentMessageFilter {
    public attachmentsId: Attachment;
    public messageId: Message;

    public withAttachment(id: number): AttachmentMessageFilter {
        this.attachmentsId = new Attachment();
        this.attachmentsId.id = id;
        return this;
    }

    public withMessage(id: number): AttachmentMessageFilter {
        this.messageId = new Message();
        this.messageId.id = id;
        return this;
    }
}