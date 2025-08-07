import jwt from 'jsonwebtoken';
import { IToken } from '../../Models/Interfaces/IToken';
import { ConfigurationService } from '../Configurations/ConfigurationService';
import { RedisService } from './RedisService';

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

    public generateTokens(payload: string | jwt.JwtPayload): IToken {

        const accessToken = jwt.sign(
            {
                data: payload
            },
            this._configurationService.JWT_ACCESS_KEY,
            {
                expiresIn: this._configurationService.ACCESS_TOKEN_LIFE_TIME
            }
        );
        const refreshToken = jwt.sign(
            {
                data: payload
            },
            this._configurationService.JWT_REFRESH_KEY,
            {
                expiresIn: this._configurationService.REFRESH_TOKEN_LIFE_TIME
            }
        );
        return { accessToken, refreshToken };
    }

    public async saveRefreshToken(id: number, token: string): Promise<string | null> {
        try {

            return await this._redisService.set(String(id), token);
        } catch {
            return null;
        }
    }

    public async getRefreshToken(id: number): Promise<string | null> {
        try {
            return await this._redisService.get(String(id));
        } catch {
            return null;
        }
    }

    public decodeToken(token: string) {
        try {
            return jwt.decode(token);
        } catch {
            return null;
        }
    }

    public async removeRefreshToken(id: number) {
        try {
            return await this._redisService.remove(String(id));
        } catch {
            return null;
        }
    }

    public checkAccessToken(token: string) {
        try {
            return jwt.verify(token, this._configurationService.JWT_ACCESS_KEY);
        } catch {
            return null;
        }
    }

    public checkRefreshToken(token: string) {
        try {
            return jwt.verify(token, this._configurationService.JWT_REFRESH_KEY);
        } catch {
            return null;
        }
    }
}