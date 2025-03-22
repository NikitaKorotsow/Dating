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
        } catch {
            return null;
        }
    }

    public async getById(id: number): Promise<Attachment | null> {
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

    public async getByIsAvatar(isAvatar: boolean): Promise<Attachment[] | null> {
        try {
            return await this._repository.find({
                where: {
                    isAvatar: isAvatar,
                }
            });
        } catch {
            return null;
        }
    }

    public async getByMimetype(mimetype: string): Promise<Attachment[] | null> {
        try {
            return await this._repository.find({
                where: {
                    mimetype: mimetype,
                }
            });
        } catch {
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
            });
        } catch {
            return null;
        }
    }

    public async create(filter: AttachmentFilter): Promise<Attachment> {
        const entity: Attachment = await this._repository.create();
        entity.user = filter.user ?? entity.user;
        entity.path = filter.path ?? entity.path;
        entity.mimetype = filter.mimetype ?? entity.mimetype;
        entity.isAvatar = filter.isAvatar ?? entity.isAvatar;
        return await this._repository.save(entity);
    }

    public async update(entity: Attachment, filter: AttachmentFilter): Promise<Attachment> {
        entity.user = filter.user ?? entity.user;
        entity.path = filter.path ?? entity.path;
        entity.mimetype = filter.mimetype ?? entity.mimetype;
        entity.isAvatar = filter.isAvatar ?? entity.isAvatar;
        return await this._repository.save(entity);
    }
}