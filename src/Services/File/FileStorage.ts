import * as path from 'path';
import * as fs from 'fs';
import { AttachmentFilter } from "../../Models/Filters/AttachmentFilter";
import { AttachmentsRepository } from "../../Repositories/AttachmentRepository";
import { FileService } from "./FileService";

export class FileStorage {
    private readonly _fileService: FileService;
    private readonly _attachmentRepository: AttachmentsRepository;

    constructor(fileService: FileService, attachmentRepository: AttachmentsRepository) {
        this._fileService = fileService;
        this._attachmentRepository = attachmentRepository;
    }

    public async get(userId: number): Promise<Buffer<ArrayBufferLike>[]> {
        const arrayPathAvatars: string[] = [];
        const arrayAvatars = await this._attachmentRepository.getByUser(userId);
        if (arrayAvatars) {
            arrayAvatars.forEach(element => {
                arrayPathAvatars.push(element.path);
            });
        }
        const arrayFile: Buffer[] = [];
        arrayPathAvatars.forEach(element => {
            arrayFile.push(fs.readFileSync(element));
        });
        return arrayFile;
    }

    public async set(file: Express.Multer.File, userId: number, isAvatar: boolean) {
        const uploadDir = path.join('./FileStorage', 'profile_' + userId, Number(isAvatar) ? 'avatars' : 'files');
        const avatar = this._fileService.createFile(uploadDir, file);
        await this._attachmentRepository.create(new AttachmentFilter()
            .withIsAvatar(isAvatar)
            .withMimetype(file.mimetype)
            .withUser(userId)
            .withPath(uploadDir + file.originalname));
        return [avatar];
    }

    public async remove(id: number) {
        const attachment = await this._attachmentRepository.getById(id);
        if (attachment) {
            return this._fileService.removeFile(attachment.path);
        } else {
            return null;
        }
    }
}