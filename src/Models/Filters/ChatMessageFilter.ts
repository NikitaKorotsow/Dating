import { Chat } from "../Entities/Chats";
import { Message } from "../Entities/Messages";

export class ChatMessageFilter {
    public chatId: Chat | null = null;
    public messageId: Message | null = null;

    public withChat(id: number): ChatMessageFilter {
        this.chatId = new Chat();
        this.chatId.id = id;
        return this;
    }

    public withMessage(id: number): ChatMessageFilter {
        this.messageId = new Message();
        this.messageId.id = id;
        return this;
    }
}