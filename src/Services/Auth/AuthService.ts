import { UserRepository } from "../../Repositories/UserRepository";
import { UserFilter } from "../../Models/Filters/UserFilter";
import { GeneraterHash } from "../../Utils/Generates/GeneraterHash";
import { GeneraterResponse } from "../../Utils/Responses/GeneraterResponse";
import { IResponse } from "../../Models/Interfaces/Responses/IResponse";
import { IUserAuthData, IUserInfo } from "../../Models/Interfaces/IUserAuthData";
import { IToken } from "../../Models/Interfaces/IToken";
import { User } from "../../Models/Entities/Users";
import { ConfigurationService } from "../Configurations/ConfigurationService";
import { FileStorage } from "../File/FileStorage";
import { TokenService } from "./TokenService";

export class AuthService {
    private readonly _configurationService: ConfigurationService;
    private readonly _userRepository: UserRepository;
    private readonly _tokenService: TokenService;
    private readonly _fileStorage: FileStorage;

    constructor(
        configurationService: ConfigurationService,
        userRepository: UserRepository,
        tokenService: TokenService,
        fileStorage: FileStorage,
    ) {
        this._configurationService = configurationService;
        this._userRepository = userRepository;
        this._tokenService = tokenService;
        this._fileStorage = fileStorage;
    }

    public async register(login: string, password: string): Promise<IResponse<IUserAuthData<number> | null>> {
        try {
            const existingLogin = await this._userRepository.getByLogin(login);
            if (!existingLogin) {
                const hash = await GeneraterHash.hashPassword(password);
                const user: User = await this._userRepository.create(new UserFilter()
                    .withLogin(login)
                    .withPassword(hash)
                );
                const tokens: IToken = this._tokenService.generateTokens(user.id.toString());

                const tok = await this._tokenService.saveRefreshToken(user.id, tokens.refreshToken);
                console.log(tok);
                return GeneraterResponse.getResponse<IUserAuthData<number>>("success", 200, {
                    user: user.id,
                    tokens: tokens
                });
            }
            else {
                return GeneraterResponse.getResponse<null>("Логин занят", 400, null);
            }
        } catch (error) {
            return GeneraterResponse.getResponse<null>(`${error}`, 500, null);
        }
    }

    public async login(login: string, password: string): Promise<IResponse<IUserAuthData<IUserInfo> | null>> {
        try {
            const user = await this._userRepository.getByLogin(login);
            if (user) {
                const avatars = await this._fileStorage.get(user.id);
                const inputPassword = await GeneraterHash.verifyPassword(password, user.password);
                if (inputPassword) {
                    const tokens: IToken = this._tokenService.generateTokens(String(user.id));
                    await this._tokenService.saveRefreshToken(user.id, tokens.refreshToken);
                    return GeneraterResponse.getResponse<IUserAuthData<IUserInfo>>("Success", 200, {
                        user: {
                            id: user.id,
                            age: user.age,
                            city: user.city,
                            gender: user.gender,
                            name: user.name,
                            email: user.email,
                            isDeleted: user.isDeleted,
                            avatars: avatars,
                        },
                        tokens: tokens,
                    });
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

    public async logout(id: number): Promise<IResponse<string | null>> {
        try {
            this._tokenService.removeAccessToken(id);
            await this._tokenService.removeRefreshToken(id);
            const result = "tokens deleted";
            return GeneraterResponse.getResponse('Success', 200, result);
        } catch (error) {
            return GeneraterResponse.getResponse<null>(`${error}`, 500, null);
        }
    }

}