import * as jwt from 'jsonwebtoken';
import { IToken } from '../Models/Interfaces/IToken';
import { RedisService } from './RedisService';
import { ConfigurationService } from './Configurations/ConfigurationService';

export class TokenService {
    private readonly _configurationService: ConfigurationService;
    private readonly _redisService: RedisService;
    constructor(
        configurationService: ConfigurationService,
        redisService: RedisService,
    ) {
        this._configurationService = configurationService;
        this._redisService = redisService;
    }

    public generateTokens(payload: string): IToken {

        const accessToken = jwt.sign(
            {
                data: payload
            },
            this._configurationService.ACCESS_TOKEN,
            {
                expiresIn: this._configurationService.ACCESS_TOKEN_LIFE_TIME
            }
        );
        const refreshToken = jwt.sign(
            {
                data: payload
            },
            this._configurationService.REFRESH_TOKEN,
            {
                expiresIn: this._configurationService.REFRESH_TOKEN_LIFE_TIME
            }
        );
        return { accessToken, refreshToken };
    }

    public async saveToken(id: number, refreshToken: string): Promise<string | null> {
        try {

            return await this._redisService.set(String(id), refreshToken);
        } catch {
            return null;
        }
    }

    public async removeToken(id: number) {
        try {
            return await this._redisService.remove(String(id));
        } catch {
            return null;
        }
    }

    public checkAccessToken(token: string) {
        try {
            return jwt.verify(token, this._configurationService.ACCESS_TOKEN);
        } catch {
            return null;
        }
    }

    public checkRefreshToken(token: string) {
        try {
            return jwt.verify(token, this._configurationService.REFRESH_TOKEN);
        } catch {
            return null;
        }
    }
}