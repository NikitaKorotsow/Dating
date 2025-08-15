import { Repository } from "typeorm";
import { Chat } from "../Models/Entities/Chats";
import { ChatFilter } from "../Models/Filters/ChatFilter";

export class ChatRepository {
    private readonly _repository: Repository<Chat>;

    constructor(repository: Repository<Chat>) {
        this._repository = repository;
    }

    public async getAll(): Promise<Chat[] | null> {
        try {
            return await this._repository.find();
        } catch {
            return null;
        }
    }

    public async getById(id: number): Promise<Chat | null> {
        try {
            return await this._repository.findOne({
                where: {
                    id: id,
                },
                relations: [
                    'toId',
                    'fromId'
                ]
            });
        } catch {
            return null;
        }
    }

    public async getByTitle(title: string): Promise<Chat[] | null> {
        try {
            return await this._repository.find({
                where: {
                    title: title,
                },
            });
        } catch {
            return null;
        }
    }

    public async getByToAndFromId(to: number, from: number): Promise<Chat | null> {
        try {
            return await this._repository.findOne({
                where: [
                    {
                        fromId: { id: from }, toId: { id: to },
                    },
                    {
                        fromId: { id: to }, toId: { id: from },
                    }
                ],
                relations: ['toId', 'fromId'],
            });
        } catch {
            return null;
        }
    }

    public async getAllChatsForUser(id: number): Promise<Chat[] | null> {
        try {
            return await this._repository.find({
                where: [
                    { fromId: { id: id } },
                    { toId: { id: id } },
                ],
                relations: [
                    'fromId',
                    'toId',
                    'chatId',
                    'chatId.messageId',
                    'chatId.messageId.fromId',
                    'chatId.messageId.toId',
                    'chatId.messageId.attachmentsMessageId',
                    'chatId.messageId.attachmentsMessageId.attachmentsId',
                ]
            });
        } catch {
            return null;
        }
    }

    public async create(filter: ChatFilter): Promise<Chat> {
        const entity: Chat = await this._repository.create();
        entity.toId = filter.toId ?? entity.toId;
        entity.fromId = filter.fromId ?? entity.fromId;
        entity.title = filter.title ?? entity.title;
        return await this._repository.save(entity);
    }

    public async update(entity: Chat, filter: ChatFilter): Promise<Chat> {
        entity.toId = filter.toId ?? entity.toId;
        entity.fromId = filter.fromId ?? entity.fromId;
        entity.title = filter.title ?? entity.title;
        return await this._repository.save(entity);
    }
}