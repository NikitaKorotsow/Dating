import { FileFilterCallback } from 'multer';
const multer = require('multer');

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
