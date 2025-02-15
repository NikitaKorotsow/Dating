import { ConfigurationService } from "./Configurations/ConfigurationService";
import { UserRepository } from "../Repositories/UserRepository";
import { UserFilter } from "../Models/Filters/UserFilter";
import { GeneraterCrypt } from "../Utils/Generates/GeneraterCrypt";
import { User } from "../Models/Entities/Users";
import { IErrorResponse } from "../Models/Interfaces/Responses/Error/IErrorResponse";
import { ISuccessResponse } from "../Models/Interfaces/Responses/Success/ISuccessResponse";
import { getResponse } from "../Utils/Responses/Response";
import * as jwt from 'jsonwebtoken'
import { IResponse } from "../Models/Interfaces/Responses/IResponse";

export class AuthService {
    constructor(
        private readonly _configurationService: ConfigurationService,
        private readonly _userRepository: UserRepository,
        private readonly _generaterCrypt: GeneraterCrypt,
    ) { }
    // register
    // login
    // logout
    // verifyToken
    // refreshToken
    private generateToken(user: User) {
        const dataToken = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        const signature = 'Bw2VV9AbMbyVlqlh9YS5j96ipOnr6CLLFvUWeBGpt2xDBw9b86OrgECBwmHOMi2zGayIjvn5ubFLN7d0MUccpyL039ZAMwYsl3Jw';
        const expiration = '6h';

        return jwt.sign({ dataToken, }, signature, { expiresIn: expiration });
    }

    public async register(email: string, login: string, password: string): Promise<IResponse<User>> {
        try {
            if (login.length < this._configurationService.LOGIN_MIN_LENGTH) {
                return getResponse<User>("Логин не корректен", 400, null);
            }
            if (password.length < this._configurationService.PASSWORD_MIN_LENGTH) {
                return getResponse<User>("Пароль не корректен", 400, null);
            }
            const existingLogin = await this._userRepository.getByLogin(login);
            if (!existingLogin) {
                const encryptPassword = await this._generaterCrypt.encrypt(password);
                const user = await this._userRepository.create(new UserFilter()
                    .withEmail(email)
                    .withLogin(login)
                    .withPassword(encryptPassword));
                return getResponse<User>("success", 200, user);
            }
            else {
                return getResponse<User>("Логин занят", 400, null);
            }
        } catch (error) {
            return getResponse<User>(`${error}`, 500, null);
        }
    }

    public async login(login: string, password: string): Promise<ISuccessResponse<User> | IErrorResponse<User>> {
        try {
            if (login.length >= this._configurationService.LOGIN_MIN_LENGTH) {
                return getResponse<User>("Логин не корректен", 400, null);
            }
            if (password.length < this._configurationService.PASSWORD_MIN_LENGTH) {
                return getResponse<User>("Пароль не корректен", 400, null);
            }
            const user = await this._userRepository.getByLogin(login);
            if (user) {
                const encryptPassword: string = await this._generaterCrypt.decrypt(user.password);
                if (encryptPassword === password) {
                    return getResponse<User>("Success", 200, user);    
                } else {
                    return getResponse<User>("Неверный пароль", 400, null);    
                }
            } else {
                return getResponse<User>("Такого пользователя не существует", 400, null);    
            }
        } catch (error) {
            return getResponse<User>(`${error}`, 500, null);    
        }
    }
}