import { UserFilter } from "../../Models/Filters/UserFilter";
import { IUserInfo } from "../../Models/Interfaces/IUserAuthData";
import { IResponse } from "../../Models/Interfaces/Responses/IResponse";
import { UserRepository } from "../../Repositories/UserRepository";
import { GeneraterResponse } from "../../Utils/Responses/GeneraterResponse";
import { ConfigurationService } from "../Configurations/ConfigurationService";
import { FileStorage } from "../File/FileStorage";

export class UserService {
    public readonly _configurationService: ConfigurationService;
    public readonly _userRepository: UserRepository;
    public readonly _fileStorage: FileStorage;

    constructor(
        configurationservice: ConfigurationService,
        userRepository: UserRepository,
        fileStorage: FileStorage
    ) {
        this._configurationService = configurationservice;
        this._userRepository = userRepository;
        this._fileStorage = fileStorage;
    }

    public async getById(id: number): Promise<IResponse<IUserInfo | null>> {
        try {
            const user = await this._userRepository.getById(id);
            const userAvatars = await this._fileStorage.get(id);
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
                avatars: userAvatars,
            });
        } catch (error) {
            return GeneraterResponse.getResponse(`${error}`, 500, null);
        }
    }

    public async update(id: number, userData: UserFilter, file?: Express.Multer.File, isAvatar?: boolean): Promise<IResponse<IUserInfo | null>> {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
                return GeneraterResponse.getResponse('Error', 400, null);
            }
            if (file && isAvatar) {
                await this._userRepository.update(user, userData);
                const userAvatars = await this._fileStorage.set(file, id, isAvatar);
                return GeneraterResponse.getResponse('Success', 200, {
                    id: user.id,
                    age: user.age,
                    city: user.city,
                    gender: user.gender,
                    isDeleted: user.isDeleted,
                    email: user.email,
                    name: user.name,
                    avatars: userAvatars,
                });
            } else {
                await this._userRepository.update(user, userData);
                return GeneraterResponse.getResponse('Success', 200, {
                    id: user.id,
                    age: user.age,
                    city: user.city,
                    gender: user.gender,
                    isDeleted: user.isDeleted,
                    email: user.email,
                    name: user.name,
                    avatars: null,
                });
            }
        } catch (error) {
            return GeneraterResponse.getResponse(`${error}`, 500, null);
        }

    }

    public async delete(id: number, isDeleted: number): Promise<IResponse<IUserInfo | null>> {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
                return GeneraterResponse.getResponse('Error', 400, null);
            }
            await this._userRepository.update(user, new UserFilter().withIsDeleted(Boolean(isDeleted)));
            return GeneraterResponse.getResponse('Success', 200, {
                id: user.id,
                age: user.age,
                city: user.city,
                gender: user.gender,
                isDeleted: user.isDeleted,
                email: user.email,
                name: user.name,
                avatars: null,
            });
        } catch (error) {
            return GeneraterResponse.getResponse(`${error}`, 500, null);
        }

    }

    public async deleteAvatar(id: number) {
        try {
            const answer = await this._fileStorage.remove(id);
            return GeneraterResponse.getResponse('Success', 200, answer);
        } catch (error) {
            return GeneraterResponse.getResponse(`${error}`, 500, null);
        }
    }
}