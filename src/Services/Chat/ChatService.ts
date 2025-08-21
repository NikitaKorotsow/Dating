import { ChatRepository } from "../../Repositories/ChatRepository";
import { MessageRepository } from "../../Repositories/MessageRepository";
import { ChatMessageRepository } from "../../Repositories/ChatMessageRepository";
import { AttachmentsMessageRepository } from "../../Repositories/AttachmentsMessageRepository";
import { NotificationService } from "../Notifications/NotificationService";
import { ChatFilter } from "../../Models/Filters/ChatFilter";
import { Attachment } from "../../Models/Entities/Attachments";
import { MessageFilter } from "../../Models/Filters/MessageFilter";
import { ChatMessageFilter } from "../../Models/Filters/ChatMessageFilter";
import { AttachmentMessageFilter } from "../../Models/Filters/AttachmentMessageFilter";
import { INotification } from "../../Models/Interfaces/INotification";
import { Chat } from "../../Models/Entities/Chats";
import { GeneraterResponse } from "../../Utils/Responses/GeneraterResponse";
import { IResponse } from "../../Models/Interfaces/Responses/IResponse";
import { WebSocketService } from "../Websocket/WebsocketService";
import { IMessage } from "../../Models/Interfaces/IMessage";
import { IWebSocketData } from "../../Models/Interfaces/IWebSocketData";
import { Message } from "../../Models/Entities/Messages";

export class ChatService {
    private readonly _chatRepository: ChatRepository;
    private readonly _messageRepository: MessageRepository;
    private readonly _chatMessageRepository: ChatMessageRepository;
    private readonly _attachmentsMessageRepository: AttachmentsMessageRepository;
    private readonly _notificationService: NotificationService;
    private readonly _webSocketService: WebSocketService;

    constructor(
        chatRepository: ChatRepository,
        messageRepository: MessageRepository,
        chatMessageRepository: ChatMessageRepository,
        attachmentsMessageRepository: AttachmentsMessageRepository,
        notificationService: NotificationService,
        webSocketService: WebSocketService

    ) {
        this._chatRepository = chatRepository;
        this._attachmentsMessageRepository = attachmentsMessageRepository;
        this._chatMessageRepository = chatMessageRepository;
        this._messageRepository = messageRepository;
        this._notificationService = notificationService;
        this._webSocketService = webSocketService;
    }

    public async createChat(user1: number, user2: number, title?: string): Promise<Chat> {
        const existingChat = await this._chatRepository.getByToAndFromId(user1, user2);
        if (existingChat) {
            return existingChat;
        }

        const chatFilter = new ChatFilter()
            .withFrom(user1)
            .withTo(user2)
            .withTitle(title || "Новый чат");

        return await this._chatRepository.create(chatFilter);
    }

    public async sendMessage(
        fromUser: number,
        toUser: number,
        text: string,
        attachments?: Attachment[]
    ): Promise<IResponse<Message | null>> {
        try {
            // ✅ Просто получаем чат (создаётся при необходимости)
            const chat = await this.createChat(fromUser, toUser);

            const messageFilter = new MessageFilter()
                .withFrom(fromUser)
                .withTo(toUser)
                .withContent(text)
                .withIsDeleted(false);

            const message = await this._messageRepository.create(messageFilter);

            const chatMessageFilter = new ChatMessageFilter()
                .withChat(chat.id)
                .withMessage(message.id);
            await this._chatMessageRepository.create(chatMessageFilter);

            if (attachments?.length) {
                for (const attachment of attachments) {
                    const attachmentMessageFilter = new AttachmentMessageFilter()
                        .withAttachment(attachment.id)
                        .withMessage(message.id);
                    await this._attachmentsMessageRepository.create(attachmentMessageFilter);
                }
            }

            const messageInfo: IMessage = {
                id: message.id,
                content: message.content,
                fromId: fromUser,
                toId: toUser,
                createDate: message.createdDate,
                attachments: attachments
            };

            const wsEvent: IWebSocketData<IMessage> = {
                userId: toUser,
                event: "message",
                data: messageInfo,
            };
            this._webSocketService.sendToUser(wsEvent);

            const notification: INotification = {
                userIdFrom: fromUser,
                userIdTo: toUser,
                read: false,
                type: "message",
                createDate: message.createdDate,
            };
            await this._notificationService.sendNotifications(notification);

            return GeneraterResponse.getResponse("success", 201, message);
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
            return GeneraterResponse.getResponse("error", 500, null);
        }
    }

    public async getUserChats(userId: number): Promise<IResponse<Chat[]> | IResponse<null>> {
        const chats = await this._chatRepository.getAllChatsForUser(userId);
        if (!chats) {
            return GeneraterResponse.getResponse<null>('succes', 200, null);
        }
        return GeneraterResponse.getResponse<Chat[]>('succes', 200, chats);
    }

    public async deleteMessage(messageId: number): Promise<IResponse<boolean>> {
        const message = await this._messageRepository.getById(messageId);
        if (!message) {
            console.log('Сообщение не найдено');
            return GeneraterResponse.getResponse<boolean>('succes', 200, false);
        }
        message.isDeleted = true;
        message.deletedDate = new Date().toString();
        await this._messageRepository.update(message, new MessageFilter()
            .withIsDeleted(message.isDeleted)
            .withDeletedDate(message.deletedDate));
        return GeneraterResponse.getResponse<boolean>('succes', 200, true);
    }
}