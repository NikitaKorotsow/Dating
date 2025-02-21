import { ConfigurationService } from "./Configurations/ConfigurationService";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";
import { GeneraterResponse } from "../Utils/Responses/GeneraterResponse";
import { Redis } from "ioredis";

export class RedisService {
    constructor(
        private readonly _configurationService: ConfigurationService,
        private readonly _generaterResponse: GeneraterResponse,
    ) { }

    public connect(host: string, port: number, password: string): Redis | null{
        try{
            return new Redis(port, host);
        } catch(error){
            return null;
        }
    }
    public async set(redisConnect: Redis, key: string, token: string): Promise<string | null>{
        try {
            return await redisConnect.set(key, token);
        } catch(error){
            return null;
        }
    }

    public async get(redisConnect: Redis, key: string): Promise<string | null>{
        try{
            return await redisConnect.get(key);
        } catch{
            return null;
        }
    }
    public async delete(redisConnect: Redis, key: string): Promise<number | null>{
        try{
            return await redisConnect.del(key);
        } catch{
            return null;
        }
    }
}