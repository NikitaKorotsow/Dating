import { Repository } from "typeorm";
import { Attachment } from "../Models/Entities/Attachments";

export class AttachmentsRepository {
    private readonly _repository: Repository<Attachment>;

    constructor(repository: Repository<Attachment>) {
        this._repository = repository;
    }

    public async getAll(): Promise<Attachment[] | null> {
        try {
            return await this._repository.find();
        } catch (error) {
            return null;
        }
    }

    public async getById(id: number): Promise<Attachment | null> {
        try {
            return await this._repository.findOne({
                where: {
                    id: id,
                },
            })
        } catch (error) {
            return null;
        }
    }

    public async getByIsAvatar(isAvatar: boolean): Promise<Attachment[] | null> {
        try {
            return await this._repository.find({
                where: {
                    isAvatar: isAvatar,
                }
            })
        } catch (error) {
            return null;
        }
    }

    public async getByMimetype(mimetype: string): Promise<Attachment[] | null> {
        try {
            return await this._repository.find({
                where: {
                    mimetype: mimetype,
                }
            })
        } catch (error) {
            return null;
        }
    }

    public async getByUser(id: number): Promise<Attachment[] | null> {
        try {
            return await this._repository.find({
                where: {
                    user: {
                        id: id,
                    },
                }
            })
        } catch (error) {
            return null;
        }
    }
}