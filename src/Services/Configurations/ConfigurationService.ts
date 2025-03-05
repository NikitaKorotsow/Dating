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
    public readonly REFRESH_TOKEN: string;

    public readonly REFRESH_TOKEN_LIFE_TIME: number;
    public readonly ACCESS_TOKEN_LIFE_TIME: number;
    //Redis
    public readonly REDIS_HOST: string;
    public readonly REDIS_PORT: number;
    public readonly REDIS_PASSWORD: string;


    /* 
    .env

    SECRET_KEY=f964c437f4e74018be0cf46110d29e4c

    DATABASE_HOTS=localhost
    DATABASE_TYPE=postgres
    DATABASE_PORT=5432
    DATABASE_NAME=Dating
    DATABASE_PASSWORD=123
    DATABASE_USER=postgres

    JWT_ACCESS_KEY=HxJ6hImgYdSg258gEnycP
    JWT_REFRESH_KEY=HGR20uc6UOOowYVOZRpNx
    LIFE_TME=3600

    REDIS_HOST=localhost
    REDIS_PORT=7777
    REDIS_PASSWORD= */

    constructor() {
        this.SECRET_KEY = process.env.SECRET_KEY as string;
        this.DATABASE_HOST = process.env.DATABASE_HOST as string;
        this.DATABASE_TYPE = process.env.DATABASE_TYPE as string;
        this.DATABASE_PORT = Number(process.env.DATABASE_PORT)
        this.DATABASE_NAME = process.env.DATABASE_NAME as string;
        this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;
        this.DATABASE_USER = process.env.DATABASE_USER as string;
        this.REFRESH_TOKEN_LIFE_TIME = Number(process.env.LIFE_TIME) * 24 * 30; //30 d
        this.ACCESS_TOKEN_LIFE_TIME = Number(process.env.LIFE_TIME) / 6; // 10 m
        this.REDIS_HOST = process.env.REDIS_HOST as string;
        this.REDIS_PORT = Number(process.env.REDIS_PORT);
        this.REDIS_PASSWORD = process.env.REDIS_PASSWORD as string;
        this.ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;
        this.REFRESH_TOKEN = process.env.REFRESH_TOKEN as string;

    }
}