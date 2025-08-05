import { Repository } from "typeorm";
import { Notifications } from "../Models/Entities/Notifications";

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

    public async getByMessage(message: string): Promise<Notifications[] | null> {
        try {
            return await this._repository.find({
                where: {
                    message: message,
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
}