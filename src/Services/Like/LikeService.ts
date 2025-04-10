import { Like } from "../../Models/Entities/Likes";
import { LikeFilter } from "../../Models/Filters/LikeFilter";
import { ICardUser } from "../../Models/Interfaces/ICardUser";
import { IResponse } from "../../Models/Interfaces/Responses/IResponse";
import { LikeRepository } from "../../Repositories/LikeRepository";
import { GeneraterResponse } from "../../Utils/Responses/GeneraterResponse";
import { ConfigurationService } from "../Configurations/ConfigurationService";
import { FileStorage } from "../File/FileStorage";

export class LikeService {
    private readonly _configuraionService: ConfigurationService;
    private readonly _fileStorage: FileStorage;
    private readonly _likeRepository: LikeRepository;

    constructor(
        configurationService: ConfigurationService,
        likeRepository: LikeRepository,
        fileStorage: FileStorage,
    ) {
        this._configuraionService = configurationService;
        this._fileStorage = fileStorage;
        this._likeRepository = likeRepository;
    }

    public async create(likeInfo: LikeFilter): Promise<IResponse<Like | null>> {
        const like = await this._likeRepository.create(likeInfo);
        return GeneraterResponse.getResponse('Success', 200, like);

    }

    public async delete(from: number, to: number): Promise<IResponse<boolean | null>> {
        const answer = await this._likeRepository.delete(from, to);
        return GeneraterResponse.getResponse('Success', 200, answer);
    }

    public async checkLikes(id: number): Promise<IResponse<ICardUser[] | null>> {
        const cards: ICardUser[] | null = [];
        const likes: Like[] | null = await this._likeRepository.getByToId(id);
        if (likes) {
            for (const like of likes) {
                const user = like.from;
                const userAvatars = await this._fileStorage.get(user.id);
                cards.push({
                    userId: user.id,
                    age: user.age,
                    city: user.city,
                    name: user.name,
                    avatars: userAvatars
                });
            }
            return GeneraterResponse.getResponse('Success', 200, cards);
        }
        return GeneraterResponse.getResponse('Success', 200, null);
    }
}