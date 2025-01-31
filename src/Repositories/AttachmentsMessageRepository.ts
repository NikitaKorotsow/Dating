import { Repository } from "typeorm";
import { AttachmentMessage } from "../Models/Entities/AttachmentsMessage";

export class AttachmentsMessageRepository {
    private readonly _repository: Repository<AttachmentMessage>;

    constructor(repository: Repository<AttachmentMessage>) {
        this._repository = repository;
    }

    public async getAll(): Promise<AttachmentMessage[] | null> {
        try {
            return await this._repository.find({
                relations: [
                    'attachmentsId',
                    'messageId',
                ]
            });
        } catch (error) {
            return null;
        }
    }

    public async getById(id: number): Promise<AttachmentMessage | null> {
        try {
            return await this._repository.findOne({
                where: {
                    id: id,
                },
                relations: [
                    'attachmentsId',
                    'messageId',
                ]
            })
        } catch (error) {
            return null;
        }
    }

    public async getByAttachmentsId(id: number): Promise<AttachmentMessage[] | null> {
        try {
            return await this._repository.find({
                where: {
                    attachmentsId: {
                        id: id
                    },
                },
            })
        } catch (error) {
            return null;
        }
    }

    public async getByMessageId(id: number): Promise<AttachmentMessage[] | null> {
        try {
            return await this._repository.find({
                where: {
                    messageId: {
                        id: id
                    }
                }
            })
        } catch (error) {
            return null;
        }
    }
}