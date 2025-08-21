import { Repository } from "typeorm";
import { Notifications } from "../Models/Entities/Notifications";
import { NotificationsFilter } from "../Models/Filters/NotificationFilter";

export class NotificationRepository {
    private readonly _repository: Repository<Notifications>;

    constructor(repository: Repository<Notifications>) {
        this._repository = repository;
    }

    public async getAll(): Promise<Notifications[] | null> {
        try {
            return await this._repository.find();
        } catch {
            return null;
        }
    }

    public async getById(id: number): Promise<Notifications | null> {
        try {
            return await this._repository.findOne({
                where: {
                    id: id,
                },
            });
        } catch {
            return null;
        }
    }

    public async getByType(type: string): Promise<Notifications[] | null> {
        try {
            return await this._repository.find({
                where: {
                    type: type,
                }
            });
        } catch {
            return null;
        }
    }

    public async getByCreatedDate(createdDate: string): Promise<Notifications[] | null> {
        try {
            return await this._repository.find({
                where: {
                    createdDate: createdDate,
                }

            });
        } catch {
            return null;
        }
    }

    public async getByIsDeleted(isDeleted: boolean): Promise<Notifications[] | null> {
        try {
            return await this._repository.find({
                where: {
                    isDeleted: isDeleted,
                }
            });
        } catch {
            return null;
        }
    }

    public async getForIdByRead(to: number, read: boolean): Promise<Notifications[] | null> {
        try {
            return await this._repository.find({
                where: {
                    to: {
                        id: to
                    },
                    read: read,
                }
            });
        } catch {
            return null;
        }
    }

    public async create(filter: NotificationsFilter): Promise<Notifications> {
        const entity: Notifications = await this._repository.create();
        entity.to = filter.to ?? entity.to;
        entity.from = filter.from ?? entity.from;
        entity.type = filter.type ?? entity.type;
        entity.isDeleted = filter.isDeleted ?? entity.isDeleted;
        entity.createdDate = filter.createdDate ?? entity.createdDate;
        entity.read = filter.read ?? entity.read;
        return await this._repository.save(entity);
    }
}