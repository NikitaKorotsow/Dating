import { Repository } from "typeorm";
import { Like } from "../Models/Entities/Likes";

export class LikeRepository {
    private readonly _repository: Repository<Like>;

    constructor(repository: Repository<Like>) {
        this._repository = repository;
    }

    public async getAll(): Promise<Like[] | null> {
        try {
            return await this._repository.find({
                relations: [
                    'toId',
                    'fromId'
                ]
            });
        } catch (error) {
            return null;
        }
    }

    public async getById(id: number): Promise<Like | null> {
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

    public async getByToId(id: number): Promise<Like[] | null> {
        try {
            return await this._repository.find({
                where: {
                    to: {
                        id: id
                    }
                }
            })
        } catch (error) {
            return null;
        }
    }

    public async getByFromId(id: number): Promise<Like[] | null> {
        try {
            return await this._repository.find({
                where: {
                    from: {
                        id: id
                    }
                }
            })
        } catch (error) {
            return null;
        }
    }
}