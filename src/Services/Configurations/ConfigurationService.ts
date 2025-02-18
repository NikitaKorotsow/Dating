import { config } from 'dotenv';
config();

export class ConfigurationService {
    //GeneraterCrypt
    public readonly SECRET_KEY: string;
    //Database
    public readonly DATABASE_HOST: string;
    public readonly DATABASE_TYPE: string;
    public readonly DATABASE_PORT: number;
    public readonly DATABASE_NAME: string;
    public readonly DATABASE_PASSWORD: string;
    public readonly DATABASE_USER: string;
    //Auth
    public readonly LOGIN_MIN_LENGTH: number;
    public readonly PASSWORD_MIN_LENGTH: number;
    public readonly TOKEN: string;
    public readonly TOKEN_LIVE_TIME: string;




    constructor() {
        this.SECRET_KEY = process.env.SECRET_KEY as string;
        this.DATABASE_HOST = process.env.DATABASE_HOST as string;
        this.DATABASE_TYPE = process.env.DATABASE_TYPE as string;
        this.DATABASE_PORT = Number(process.env.DATABASE_PORT)
        this.DATABASE_NAME = process.env.DATABASE_NAME as string;
        this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;
        this.DATABASE_USER = process.env.DATABASE_USER as string;
        this.TOKEN_LIVE_TIME = process.env.SECRET_KEY as string;
    }
}