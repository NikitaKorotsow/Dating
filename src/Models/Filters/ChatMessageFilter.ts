import { Chat } from "../Entities/Chats";
import { Message } from "../Entities/Messages";


export class ChatMessageFilter {
    public chat: Chat | null = null;
    public message: Message | null = null;

    public withChat(id: number): ChatMessageFilter {
        this.chat = new Chat();
        this.chat.id = id;
        return this;
    }

    public withMessage(id: number): ChatMessageFilter {
        this.message = new Message();
        this.message.id = id;
        return this;
    }
}