import { Repository } from "typeorm";
import { Like } from "../Models/Entities/Likes";
import { LikeFilter } from "../Models/Filters/LikeFilter";

export class LikeRepository {
    private readonly _repository: Repository<Like>;

    constructor(repository: Repository<Like>) {
        this._repository = repository;
    }

    public async getAll(): Promise<Like[] | null> {
        try {
            return await this._repository.find({
                relations: [
                    'to',
                    'from'
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
                    'to',
                    'from'
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

    public async create(filter: LikeFilter): Promise<Like> {
        const entity: Like = await this._repository.create();
        entity.to = filter.to ?? entity.to;
        entity.from = filter.from ?? entity.from;
        entity.deletedDate = filter.deletedDate ?? entity.deletedDate;
        return await this._repository.save(entity);
    }

    public async update(entity: Like, filter: LikeFilter): Promise<Like> {
        entity.to = filter.to ?? entity.to;
        entity.from = filter.from ?? entity.from;
        entity.deletedDate = filter.deletedDate ?? entity.deletedDate;
        return await this._repository.save(entity);
    }
}