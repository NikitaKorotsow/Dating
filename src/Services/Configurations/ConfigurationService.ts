import { config } from 'dotenv';
config();

export class ConfigurationService {
    public readonly SECRET_KEY: string;

    constructor() {
        this.SECRET_KEY = process.env.SECRET_KEY as string;
    }
}