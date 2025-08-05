import {
    RedisClientType,
    createClient
} from "redis";
import { ConfigurationService } from "../Configurations/ConfigurationService";

export class RedisService {
    private readonly _configurationService: ConfigurationService;
    private readonly client: RedisClientType;
    private isConnected: boolean = false;

    constructor(
        configurationService: ConfigurationService,
    ) {
        this._configurationService = configurationService;
        this.client = createClient({
            socket: {
                host: this._configurationService.REDIS_HOST,
                port: this._configurationService.REDIS_PORT,
            },
        });
        this.client.connect();
        this.client.on('ready', () => {
            this.isConnected = true;
        });
        this.client.on('error', () => {
            this.isConnected = false;
        });
    }

    public async set(key: string, value: string): Promise<string | null> {
        console.log(this.isConnected);
        if (this.isConnected === true) return await this.client.set(key, value);
        else return null;
    }

    public async get(key: string): Promise<string | null> {
        console.log(this.isConnected);
        if (this.isConnected === true) return await this.client.get(key);
        else return null;
    }
    public async remove(key: string): Promise<number | null> {
        console.log(this.isConnected);
        if (this.isConnected === true) return await this.client.del(key);
        else return null;
    }
}