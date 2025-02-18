import { ConfigurationService } from "./Configurations/ConfigurationService";
import { UserRepository } from "../Repositories/UserRepository";
import { UserFilter } from "../Models/Filters/UserFilter";
import { GeneraterCrypt } from "../Utils/Generates/GeneraterCrypt";
import { User } from "../Models/Entities/Users";
import { IErrorResponse } from "../Models/Interfaces/Responses/Error/IErrorResponse";
import { ISuccessResponse } from "../Models/Interfaces/Responses/Success/ISuccessResponse";
import { GeneraterResponse } from "../Utils/Responses/GeneraterResponse";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";

export class AuthService {
    constructor(
        private readonly _configurationService: ConfigurationService,
        private readonly _userRepository: UserRepository,
        private readonly _generaterCrypt: GeneraterCrypt,
        private readonly _generaterResponse: GeneraterResponse,
    ) { }
    // register
    // login
    // logout
    // verifyToken
    // refreshToken 


    public async register(login: string, password: string): Promise<IResponse<User> | IResponse<null>> {
        try {
            const existingLogin = await this._userRepository.getByLogin(login);
            if (!existingLogin) {
                const encryptPassword = this._generaterCrypt.encrypt(password);
                const user = await this._userRepository.create(new UserFilter()
                    .withLogin(login)
                    .withPassword(encryptPassword));
                return this._generaterResponse.getResponse<User>("success", 200, user);
            }
            else {
                return this._generaterResponse.getResponse<null>("Логин занят", 400, null);
            }
        } catch (error) {
            return this._generaterResponse.getResponse<null>(`${error}`, 500, null);
        }
    }

    public async login(login: string, password: string): Promise<IResponse<User> | IResponse<null>> {
        try {
            const user = await this._userRepository.getByLogin(login);
            if (user) {
                const encryptPassword: string = this._generaterCrypt.decrypt(user.password);
                if (encryptPassword === password) {
                    return this._generaterResponse.getResponse<User>("Success", 200, user);
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

    public async logout(): Promise<IResponse<User> | IResponse<null>> {
        try{

        } catch(error){

        }
    }
}