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
        } catch (error) {
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
            })
        } catch (error) {
            return null;
        }
    }

    public async getByTitle(title: string): Promise<Chat[] | null> {
        try {
            return await this._repository.find({
                where: {
                    title: title,
                },
            })
        } catch (error) {
            return null;
        }
    }

    public async create(filter: ChatFilter): Promise<Chat> {
        const entity: Chat = await this._repository.create();
        Object.assign(entity, filter);
        return await this._repository.save(entity);
    }

    public async update(entity: Chat, filter: ChatFilter): Promise<Chat> {
        Object.assign(entity, filter);
        return await this._repository.save(entity);
    }
}