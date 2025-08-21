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

    public async set(file: Express.Multer.File, userId: number, isAvatar: boolean): Promise<Buffer<ArrayBufferLike>[]> {
        const uploadDir = path.join('./FileStorage', Number(isAvatar) ? 'avatars' : 'files', 'profile_' + userId);
        this._fileService.createDirectoty(uploadDir);
        const avatar = this._fileService.createFile(uploadDir, file);
        await this._attachmentRepository.create(new AttachmentFilter()
            .withIsAvatar(isAvatar)
            .withMimetype(file.mimetype)
            .withUser(userId)
            .withPath(avatar.filePath));
        return [avatar.fileread];
    }

    public async remove(id: number): Promise<boolean> {
        const attachment = await this._attachmentRepository.getById(id);
        if (attachment) {
            this._fileService.removeFile(attachment.path);
            attachment.remove();
            return true;
        } else {
            return false;
        }
    }
}