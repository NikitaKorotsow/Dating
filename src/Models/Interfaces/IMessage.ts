import { Attachment } from "../Entities/Attachments";

export interface IMessage {
    id: number,
    content: string,
    fromId: number,
    toId: number,
    createDate: string,
    attachments?: Attachment[] | Attachment
}