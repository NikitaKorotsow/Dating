import { Attachment } from "../Entities/Attachments";
import { Message } from "../Entities/Messages";


export class AttachmentMessageFilter {
    public attachment: Attachment | null = null;
    public message: Message | null = null;

    public withAttachment(id: number): AttachmentMessageFilter {
        this.attachment = new Attachment();
        this.attachment.id = id;
        return this;
    }

    public withMessage(id: number): AttachmentMessageFilter {
        this.message = new Message();
        this.message.id = id;
        return this;
    }
}