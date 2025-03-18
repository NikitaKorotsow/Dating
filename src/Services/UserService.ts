import { UserFilter } from "../Models/Filters/UserFilter";
import { IUserInfo } from "../Models/Interfaces/IUserAuthData";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";
import { UserRepository } from "../Repositories/UserRepository";
import { GeneraterResponse } from "../Utils/Responses/GeneraterResponse";
import { ConfigurationService } from "./Configurations/ConfigurationService";

export class UserService {
    public readonly _configurationService: ConfigurationService;
    public readonly _userRepository: UserRepository;

    constructor(
        configurationservice: ConfigurationService,
        userRepository: UserRepository,
    ) {
        this._configurationService = configurationservice;
        this._userRepository = userRepository;
    }

    public async getById(id: number): Promise<IResponse<IUserInfo | null>> {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
                return GeneraterResponse.getResponse('Error', 400, null);
            }
            return GeneraterResponse.getResponse('Success', 200, {
                id: user.id,
                age: user.age,
                city: user.city,
                gender: user.gender,
                isDeleted: user.isDeleted,
                email: user.email,
                name: user.name,
            });
        } catch (error) {
            return GeneraterResponse.getResponse(`${error}`, 500, null);
        }
    }

    public async update(id: number, userDataJson: string): Promise<IResponse<IUserInfo | null>> {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
                return GeneraterResponse.getResponse('Error', 400, null);
            }
            const userData: UserFilter = JSON.parse(userDataJson) as UserFilter;
            await this._userRepository.update(user, userData);
            return GeneraterResponse.getResponse('Success', 200, {
                id: user.id,
                age: user.age,
                city: user.city,
                gender: user.gender,
                isDeleted: user.isDeleted,
                email: user.email,
                name: user.name,
            });
        } catch (error) {
            return GeneraterResponse.getResponse(`${error}`, 500, null);
        }

    }

    public async delete(id: number, isDeleted: number) {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
                return GeneraterResponse.getResponse('Error', 400, null);
            }
            await this._userRepository.update(user!, new UserFilter().withIsDeleted(Boolean(isDeleted)));
            return GeneraterResponse.getResponse('Success', 200, {
                id: user.id,
                age: user.age,
                city: user.city,
                gender: user.gender,
                isDeleted: user.isDeleted,
                email: user.email,
                name: user.name,
            });
        } catch (error) {
            return GeneraterResponse.getResponse(`${error}`, 500, null);
        }

    }
}