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
    public readonly ACCESS_TOKEN: string;
    public readonly REFRESH_TOKEN:string;

    public readonly TOKEN_LIVE_TIME: string;
    //Redis
    public readonly REDIS_HOST: string;
    public readonly REDIS_PORT: number;
    public readonly REDIS_PASSWORD: string;




    constructor() {
        this.SECRET_KEY = process.env.SECRET_KEY as string;
        this.DATABASE_HOST = process.env.DATABASE_HOST as string;
        this.DATABASE_TYPE = process.env.DATABASE_TYPE as string;
        this.DATABASE_PORT = Number(process.env.DATABASE_PORT)
        this.DATABASE_NAME = process.env.DATABASE_NAME as string;
        this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;
        this.DATABASE_USER = process.env.DATABASE_USER as string;
        this.TOKEN_LIVE_TIME = process.env.SECRET_KEY as string;
        this.REDIS_HOST = process.env.REDIS_HOST as string;
        this.REDIS_PORT = Number(process.env.REDIS_PORT);
        this.REDIS_PASSWORD = process.env.REDIS_PASSWORD as string;
        this.ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;
        this.REFRESH_TOKEN = process.env.REFRESH_TOKEN as string;

    }
}