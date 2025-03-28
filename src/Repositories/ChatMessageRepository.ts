import { Repository } from "typeorm";
import { ChatMessage } from "../Models/Entities/ChatMessage";
import { ChatMessageFilter } from "../Models/Filters/ChatMessageFilter";

export class ChatMessageRepository {
    private readonly _repository: Repository<ChatMessage>;

    constructor(repository: Repository<ChatMessage>) {
        this._repository = repository;
    }

    public async getAll(): Promise<ChatMessage[] | null> {
        try {
            return await this._repository.find({
                relations: [
                    'chatId',
                    'messageId',
                ]
            });
        } catch {
            return null;
        }
    }

    public async getById(id: number): Promise<ChatMessage | null> {
        try {
            return await this._repository.findOne({
                where: {
                    id: id,
                },
                relations: [
                    'chatId',
                    'messageId',
                ]
            });
        } catch {
            return null;
        }
    }

    public async getByAttachmentsId(id: number): Promise<ChatMessage[] | null> {
        try {
            return await this._repository.find({
                where: {
                    chatId: {
                        id: id
                    },
                },
            });
        } catch {
            return null;
        }
    }

    public async getByMessageId(id: number): Promise<ChatMessage[] | null> {
        try {
            return await this._repository.find({
                where: {
                    messageId: {
                        id: id
                    }
                }
            });
        } catch {
            return null;
        }
    }

    public async create(filter: ChatMessageFilter): Promise<ChatMessage> {
        const entity: ChatMessage = await this._repository.create();
        entity.chatId = filter.chatId ?? entity.chatId;
        entity.messageId = filter.messageId ?? entity.messageId;
        return await this._repository.save(entity);
    }

    public async update(entity: ChatMessage, filter: ChatMessageFilter): Promise<ChatMessage> {
        entity.chatId = filter.chatId ?? entity.chatId;
        entity.messageId = filter.messageId ?? entity.messageId;
        return await this._repository.save(entity);
    }
}