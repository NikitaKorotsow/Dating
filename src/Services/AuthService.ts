import { ConfigurationService } from "./Configurations/ConfigurationService";
import { UserRepository } from "../Repositories/UserRepository";
import { UserFilter } from "../Models/Filters/UserFilter";
import { GeneraterCrypt } from "../Utils/Generates/GeneraterCrypt";
import { User } from "../Models/Entities/Users";
import { GeneraterResponse } from "../Utils/Responses/GeneraterResponse";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";
import { TokenService } from "./TokenService";
import Redis from "ioredis";
import { IUserData } from "../Models/Interfaces/IUserData";
import { IToken } from "../Models/Interfaces/IToken";

export class AuthService {
    constructor(
        private readonly _configurationService: ConfigurationService,
        private readonly _userRepository: UserRepository,
        private readonly _generaterCrypt: GeneraterCrypt,
        private readonly _generaterResponse: GeneraterResponse,
        private readonly _tokenService: TokenService,
    ) { }
    // register
    // login
    // logout
    // verifyToken
    // refreshToken 


    public async register(login: string, password: string, connect: Redis): Promise<IResponse<IUserData | null>> {
        try {
            const existingLogin = await this._userRepository.getByLogin(login);
            if (!existingLogin) {
                const encryptPassword = this._generaterCrypt.encrypt(password);
                const user = await this._userRepository.create(new UserFilter()
                    .withLogin(login)
                    .withPassword(encryptPassword));
                const tokens: IToken = this._tokenService.generateTokens(JSON.stringify(user.id));
                
                await this._tokenService.saveToken(connect, JSON.stringify(user.id), tokens.refreshToken);
                return this._generaterResponse.getResponse<IUserData>("success", 200, {user, tokens});
            }
            else {
                return this._generaterResponse.getResponse<null>("Логин занят", 400, null);
            }
        } catch (error) {
            return this._generaterResponse.getResponse<null>(`${error}`, 500, null);
        }
    }

    public async login(login: string, password: string, connect: Redis): Promise<IResponse<IUserData | null>> {
        try {
            const user = await this._userRepository.getByLogin(login);
            if (user) {
                const encryptPassword: string = this._generaterCrypt.encrypt(password);
                if (encryptPassword === user.password) {
                    const tokens: IToken = this._tokenService.generateTokens(JSON.stringify(user.id));
                    await this._tokenService.saveToken(connect, JSON.stringify(user.id), tokens.refreshToken);
                    return this._generaterResponse.getResponse<IUserData>("Success", 200, {user, tokens});
                } else {
                    return this._generaterResponse.getResponse<null>("Неверный пароль", 400, null);
                }
            } else {
                return this._generaterResponse.getResponse<null>("Такого пользователя не существует", 400, null);
            }
        } catch (error) {
            return this._generaterResponse.getResponse<null>(`${error}`, 500, null);
        }
    }

    public async logout(connect: Redis, refreshToken: string): Promise<IResponse<number | null>> {
        const result = await this._tokenService.removeToken(connect, refreshToken)
        return this._generaterResponse.getResponse('Success', 200, result);
    }

}