import * as jwt from 'jsonwebtoken'
import { User } from '../Models/Entities/Users';
import { RedisService } from './RedisService';
import { ConfigurationService } from './Configurations/ConfigurationService';
import { GeneraterResponse } from '../Utils/Responses/GeneraterResponse';
import { IResponse } from '../Models/Interfaces/Responses/IResponse';
import { IToken } from '../Models/Interfaces/IToken';
import Redis from 'ioredis';

export class TokenService {

    constructor(
        private readonly _configurationService: ConfigurationService,
        private readonly _generaterResponse: GeneraterResponse,
        private readonly _redisService: RedisService
    ){}

    public generateTokens(payload: string): IToken {

        const accessToken =  jwt.sign(payload, JSON.stringify(process.env.JWT_ACCESS_TOKEN),  {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, JSON.stringify(process.env.JWT_REFRESH_TOKEN),  {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    public async saveToken(connect: Redis, id: string, refreshToken: string): Promise<IResponse<string | null>> {
        try{
            const result = await this._redisService.set(connect, id, refreshToken);
            return this._generaterResponse.getResponse('Success', 200, result);
        } catch(error){
            return this._generaterResponse.getResponse(`${error}`, 500, null);
        }
    }

    public async removeToken(connect: Redis, refreshToken: string){
        try{
            return await this._redisService.delete(connect, refreshToken);
        } catch {
            return null;
        }
    }

    public checkAccessToken(token: string){
        try {
            return jwt.verify(token, JSON.stringify(process.env.JWT_ACCESS_TOKEN));
        } catch {
            return null;
        }
    }

    public checkRefreshToken(token: string){
        try {
            return jwt.verify(token, JSON.stringify(process.env.JWT_REFRESH_TOKEN));
        } catch {
            return null;
        }
    }
}