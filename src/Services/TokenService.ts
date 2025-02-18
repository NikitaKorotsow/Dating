import * as jwt from 'jsonwebtoken'
import { IToken } from '../Models/Interfaces/IToken';
import { User } from '../Models/Entities/Users';


export class TokenService {
    public generateTokens(payload: string): IToken {
        const accessToken = jwt.sign(payload, JSON.stringify(process.env.JWT_ACCESS_TOKEN),  {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, JSON.stringify(process.env.JWT_REFRESH_TOKEN),  {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken,
        }
    }

    public async saveToken(id: number, refreshToken: string): Promise<IToken>{
        const tokenFromDB = await this._tokenRepository.getById(id);
        if(tokenFromDB){
            tokenFromDB.refreshToken = refreshToken;
            return tokenFromDB.update();
        }else{
            const token: IToken = await this._tokenRepository.create(new TokenFilter()
            .withUserId(id)
            .withRefreshToken(refreshToken));
            return token;
        }

    }
}