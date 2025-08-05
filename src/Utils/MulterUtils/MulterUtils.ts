import { FileFilterCallback } from 'multer';
import multer from 'multer';
import { Request } from 'express';

export const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true);
        return;
    } else {
        callback(null, false);
        return;
    }
};

export const upload = multer({ storage: multer.memoryStorage(), fileFilter });
