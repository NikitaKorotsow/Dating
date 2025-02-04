import { Repository } from "typeorm";
import { Attachment } from "../Models/Entities/Attachments";
import { AttachmentFilter } from "../Models/Filters/AttachmentFilter";

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

    public async create(filter: AttachmentFilter): Promise<Attachment> {
        const entity: Attachment = await this._repository.create();
        if (filter.user) {
            entity.user = filter.user;
        }
        if (filter.path) {
            entity.path = filter.path;
        }
        if (filter.mimetype) {
            entity.mimetype = filter.mimetype;
        }
        if (filter.isAvatar) {
            entity.isAvatar = filter.isAvatar;
        }
        return await this._repository.save(entity);
    }

    public async update(entity: Attachment, filter: AttachmentFilter): Promise<Attachment> {
        if (filter.isAvatar) {
            entity.isAvatar = filter.isAvatar;
        }
        return await this._repository.save(entity);
    }
}