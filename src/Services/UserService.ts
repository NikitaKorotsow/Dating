import { UserFilter } from "../Models/Filters/UserFilter";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";
import { UserRepository } from "../Repositories/UserRepository";
import { GeneraterResponse } from "../Utils/Responses/GeneraterResponse";
import { ConfigurationService } from "./Configurations/ConfigurationService";

export class UserService {
    public readonly _configurationService: ConfigurationService;
    public readonly _userRepository: UserRepository;

    constructor(
        configurationservice: ConfigurationService,
        userRepository: UserRepository
    ) {
        this._configurationService = configurationservice;
        this._userRepository = userRepository;
    }

    public async update(id: number, age: number, city: string, gender: string, isDeleted: boolean, email: string, name: string): Promise<IResponse<null>> {
        const user = await this._userRepository.getById(id);
        await this._userRepository.update(user!, new UserFilter()
            .withAge(age)
            .withCity(city)
            .withGender(gender)
            .withIsDeleted(isDeleted)
            .withEmail(email)
            .withName(name));
        return GeneraterResponse.getResponse('Success', 200, null)
    }

    public async delete(id: number, isDeleted: boolean) {
        const user = await this._userRepository.getById(id);
        await this._userRepository.update(user!, new UserFilter().withIsDeleted(isDeleted));
        return GeneraterResponse.getResponse('Success', 200, null);
    }
}