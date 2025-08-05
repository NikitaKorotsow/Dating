import * as fs from 'fs';
import * as path from 'path';
import { ConfigurationService } from "../Configurations/ConfigurationService";

export class FileService {
    private readonly _configurationService: ConfigurationService;

    constructor(configurationService: ConfigurationService) {
        this._configurationService = configurationService;
    }

    public createFile(_path: string, file: Express.Multer.File) {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filePath = path.join(_path, file.fieldname + '-' + suffix + path.extname(file.originalname));
        try {
            fs.writeFileSync(filePath, file.buffer);
            console.log('Файл успешно сохранен');
        } catch {
            console.error('Ошибка при записи файла:');
        }
        const fileread = fs.readFileSync(filePath);
        return { filePath, fileread };
    };

    public createDirectoty(path: string) {
        if (!fs.existsSync(path)) {
            return fs.mkdirSync(path, { recursive: true });
        }
    }

    public getPath(_path: string): string {
        return path.resolve(_path);
    }

    public removeFile(path: string) {
        fs.unlinkSync(path);
    }
}