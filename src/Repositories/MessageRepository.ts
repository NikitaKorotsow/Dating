import { Repository } from "typeorm";
import { Message } from "../Models/Entities/Messages";


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
}