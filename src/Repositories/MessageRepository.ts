import { Repository } from "typeorm";
import { Message } from "../Models/Entities/Messages";
import { MessageFilter } from "../Models/Filters/MessageFilter";


export class MessageRepository {
    private readonly _repository: Repository<Message>;

    constructor(repository: Repository<Message>) {
        this._repository = repository;
    }

    public async getAll(): Promise<Message[] | null> {
        try {
            return await this._repository.find();
        } catch (error) {
            return null;
        }
    }

    public async getById(id: number): Promise<Message | null> {
        try {
            return await this._repository.findOne({
                where: {
                    id: id,
                },
                relations: [
                    'toId',
                    'fromId',
                ]
            })
        } catch (error) {
            return null;
        }
    }

    public async getByToId(id: number): Promise<Message[] | null> {
        try {
            return await this._repository.find({
                where: {
                    toId: {
                        id: id
                    }
                }
            })
        } catch (error) {
            return null;
        }
    }

    public async getByFromId(id: number): Promise<Message[] | null> {
        try {
            return await this._repository.find({
                where: {
                    fromId: {
                        id: id
                    }
                }
            })
        } catch (error) {
            return null;
        }
    }

    public async create(filter: MessageFilter): Promise<Message> {
        const entity: Message = await this._repository.create();
        if (filter.to) {
            entity.toId = filter.to;
        }
        if (filter.from) {
            entity.fromId = filter.from;
        }
        if (filter.content) {
            entity.content = filter.content;
        }
        if (filter.isDeleted) {
            entity.isDeleted = filter.isDeleted;
        }
        if (filter.updatedDate) {
            entity.updatedDate = filter.updatedDate;
        }
        if (filter.deletedDate) {
            entity.deletedDate = filter.deletedDate;
        }
        return await this._repository.save(entity);
    }
    
    public async update(entity: Message, filter: MessageFilter): Promise<Message> {
        if (filter.content) {
            entity.content = filter.content;
        }
        if (filter.isDeleted) {
            entity.isDeleted = filter.isDeleted;
        }
        if (filter.updatedDate) {
            entity.updatedDate = filter.updatedDate;
        }
        if (filter.deletedDate) {
            entity.deletedDate = filter.deletedDate;
        }
        return await this._repository.save(entity);
    }
}