import * as jwt from 'jsonwebtoken'
import { RedisService } from './RedisService';
import { ConfigurationService } from './Configurations/ConfigurationService';
import { IToken } from '../Models/Interfaces/IToken';

export class TokenService {
    private readonly _configurationService: ConfigurationService;
    private readonly _redisService: RedisService
    constructor(
        configurationService: ConfigurationService,
        redisService: RedisService,
    ){
        this._configurationService = configurationService;
        this._redisService = redisService;
    }

    public generateTokens(payload: string): IToken {

        const accessToken =  jwt.sign(payload, JSON.stringify(this._configurationService.ACCESS_TOKEN),  {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, JSON.stringify(this._configurationService.REFRESH_TOKEN),  {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    public async saveToken(id: string, refreshToken: string): Promise<string | null> {
        try{
            
            return await this._redisService.setValue(id, refreshToken);
        } catch(error){
            return null;
        }
    }

    public async removeToken(refreshToken: string){
        try{
            return await this._redisService.delete(refreshToken);
        } catch {
            return null;
        }
    }

    public checkAccessToken(token: string){
        try {
            return jwt.verify(token, JSON.stringify(this._configurationService.ACCESS_TOKEN));
        } catch {
            return null;
        }
    }

    public checkRefreshToken(token: string){
        try {
            return jwt.verify(token, JSON.stringify(this._configurationService.REFRESH_TOKEN));
        } catch {
            return null;
        }
    }
}