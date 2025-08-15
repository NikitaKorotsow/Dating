import { Like } from "../../Models/Entities/Likes";
import { LikeFilter } from "../../Models/Filters/LikeFilter";
import { ICardUser } from "../../Models/Interfaces/ICardUser";
import { INotification } from "../../Models/Interfaces/INotification";
import { IResponse } from "../../Models/Interfaces/Responses/IResponse";
import { LikeRepository } from "../../Repositories/LikeRepository";
import { GeneraterResponse } from "../../Utils/Responses/GeneraterResponse";
import { ConfigurationService } from "../Configurations/ConfigurationService";
import { FileStorage } from "../File/FileStorage";
import { NotificationService } from "../Notifications/NotificationService";

export class LikeService {
    private readonly _configuraionService: ConfigurationService;
    private readonly _fileStorage: FileStorage;
    private readonly _likeRepository: LikeRepository;
    private readonly _notificationService: NotificationService;

    constructor(
        configurationService: ConfigurationService,
        likeRepository: LikeRepository,
        fileStorage: FileStorage,
        notificationService: NotificationService
    ) {
        this._configuraionService = configurationService;
        this._fileStorage = fileStorage;
        this._likeRepository = likeRepository;
        this._notificationService = notificationService;
    }

    public async create(likeInfo: LikeFilter): Promise<IResponse<Like | null>> {
        const like = await this._likeRepository.create(likeInfo);
        const notification: INotification = {
            userIdTo: like.to.id,
            userIdFrom: like.from.id,
            type: "like",
            read: false,
            createDate: like.createdDate
        };
        await this._notificationService.sendNotifications(notification);
        return GeneraterResponse.getResponse('Success', 200, like);

    }

    public async delete(from: number, to: number): Promise<IResponse<boolean>> {
        const answer = await this._likeRepository.delete(from, to);
        return GeneraterResponse.getResponse('Success', 200, answer);
    }

    public async getLikesTo(id: number): Promise<IResponse<ICardUser[] | null>> {
        try {
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
        } catch (error) {
            return GeneraterResponse.getResponse(`${error}`, 500, null);
        }
    }

    public async getLikesFrom(id: number): Promise<IResponse<ICardUser[] | null>> {
        try {
            const cards: ICardUser[] | null = [];
            const likes: Like[] | null = await this._likeRepository.getByFromId(id);
            if (likes) {
                for (const like of likes) {
                    const user = like.to;
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
        } catch (error) {
            return GeneraterResponse.getResponse(`${error}`, 500, null);
        }

    }
}