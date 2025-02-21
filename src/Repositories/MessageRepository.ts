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
        entity.toId = filter.toId ?? entity.toId;
        entity.fromId = filter.fromId ?? entity.fromId;
        entity.content = filter.content ?? entity.content;
        entity.isDeleted = filter.isDeleted ?? entity.isDeleted;
        entity.updatedDate = filter.updatedDate ?? entity.updatedDate;
        entity.deletedDate = filter.deletedDate ?? entity.deletedDate;
        return await this._repository.save(entity);
    }

    public async update(entity: Message, filter: MessageFilter): Promise<Message> {
        entity.toId = filter.toId ?? entity.toId;
        entity.fromId = filter.fromId ?? entity.fromId;
        entity.content = filter.content ?? entity.content;
        entity.isDeleted = filter.isDeleted ?? entity.isDeleted;
        entity.updatedDate = filter.updatedDate ?? entity.updatedDate;
        entity.deletedDate = filter.deletedDate ?? entity.deletedDate;
        return await this._repository.save(entity);
    }
}