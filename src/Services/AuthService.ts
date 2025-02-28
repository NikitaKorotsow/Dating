import { ConfigurationService } from "./Configurations/ConfigurationService";
import { UserRepository } from "../Repositories/UserRepository";
import { UserFilter } from "../Models/Filters/UserFilter";
import { GeneraterCrypt } from "../Utils/Generates/GeneraterCrypt";
import { GeneraterResponse } from "../Utils/Responses/GeneraterResponse";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";
import { TokenService } from "./TokenService";
import { IUserData } from "../Models/Interfaces/IUserData";
import { IToken } from "../Models/Interfaces/IToken";

export class AuthService {
    private readonly _configurationService: ConfigurationService;
    private readonly _userRepository: UserRepository;
    private readonly _tokenService: TokenService;

    constructor(
        configurationService: ConfigurationService,
        userRepository: UserRepository,
        tokenService: TokenService,
    ) {
        this._configurationService = configurationService;
        this._userRepository = userRepository;
        this._tokenService = tokenService;

    }
    // register
    // login
    // logout
    // verifyToken
    // refreshToken 


    public async register(login: string, password: string): Promise<IResponse<IUserData | null>> {
        try {
            const existingLogin = await this._userRepository.getByLogin(login);
            if (!existingLogin) {
                const encryptPassword = GeneraterCrypt.encrypt(password);
                const user = await this._userRepository.create(new UserFilter()
                    .withLogin(login)
                    .withPassword(encryptPassword));
                const tokens: IToken = this._tokenService.generateTokens(JSON.stringify(user.id));
                
                await this._tokenService.saveToken( JSON.stringify(user.id), tokens.refreshToken);
                return GeneraterResponse.getResponse<IUserData>("success", 200, {user, tokens});
            }
            else {
                return GeneraterResponse.getResponse<null>("Логин занят", 400, null);
            }
        } catch (error) {
            return GeneraterResponse.getResponse<null>(`${error}`, 500, null);
        }
    }

    public async login(login: string, password: string): Promise<IResponse<IUserData | null>> {
        try {
            const user = await this._userRepository.getByLogin(login);
            if (user) {
                const encryptPassword: string = GeneraterCrypt.encrypt(password);
                if (encryptPassword === user.password) {
                    const tokens: IToken = this._tokenService.generateTokens(JSON.stringify(user.id));
                    await this._tokenService.saveToken(JSON.stringify(user.id), tokens.refreshToken);
                    return GeneraterResponse.getResponse<IUserData>("Success", 200, {user, tokens});
                } else {
                    return GeneraterResponse.getResponse<null>("Неверный пароль", 400, null);
                }
            } else {
                return GeneraterResponse.getResponse<null>("Такого пользователя не существует", 400, null);
            }
        } catch (error) {
            return GeneraterResponse.getResponse<null>(`${error}`, 500, null);
        }
    }

    public async logout(refreshToken: string): Promise<IResponse<number | null>> {
        const result = await this._tokenService.removeToken(refreshToken)
        return GeneraterResponse.getResponse('Success', 200, result);
    }

}