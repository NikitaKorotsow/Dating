import { ConfigurationService } from "./Configurations/ConfigurationService";
import * as Redis from "redis"

export class RedisService {
    private readonly _configurationService: ConfigurationService;
    private client: Redis.RedisClientType;

    constructor(
        configurationService: ConfigurationService,
    ) {
        this._configurationService = configurationService;
        this.client = Redis.createClient({
            socket: {
                host: this._configurationService.REDIS_HOST,
                port: this._configurationService.REDIS_PORT,
            },
            password: this._configurationService.REDIS_PASSWORD,
        });
    }
    
    public async isConnected(): Promise<boolean>{
        const request = await this.client.ping();
        return request === 'PONG' ? true : false;
    }

    public async setValue(key: string, value: string): Promise<string | null>{
        return await this.client.set(key, value);
    }

    public async getValue(key: string): Promise<string | null>{
        try{
            return await this.client.get(key);
        } catch{
            return null;
        }
    }
    public async delete(key: string): Promise<number | null>{
        try{
            return await this.client.del(key);
        } catch{
            return null;
        }
    }
}