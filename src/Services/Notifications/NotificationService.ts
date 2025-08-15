import { INotification } from "../../Models/Interfaces/INotification";
import { NotificationRepository } from "../../Repositories/NotificationRepository";
import { NotificationsFilter } from "../../Models/Filters/NotificationFilter";
import { WebSocketService } from "../Websocket/WebsocketService";
import { IWebSocketData } from "../../Models/Interfaces/IWebSocketData";
import { Notifications } from "../../Models/Entities/Notifications";

export class NotificationService {
    private readonly _notificationRepository: NotificationRepository;
    private readonly _websocketService: WebSocketService;

    constructor(notificationRepository: NotificationRepository, webSocketService: WebSocketService) {
        this._notificationRepository = notificationRepository;
        this._websocketService = webSocketService;
    }

    public sendUnreadNotifications = async (userId: number) => {
        const unreadNotifications = await this._notificationRepository.getForIdByRead(userId, false);
        if (!unreadNotifications) {
            console.log("Список уведомлений пуст");
            return null;
        }

        const notificationsInfo: IWebSocketData<Notifications[]> = {
            userId: userId,
            event: "notification",
            data: unreadNotifications
        };
        this._websocketService.sendToUser(notificationsInfo);
        console.log(`Отправлено ${unreadNotifications.length} непрочитанных уведомлений пользователю ${userId}`);
    };

    public sendNotifications = async (data: INotification) => {
        const notification = await this._notificationRepository.create(new NotificationsFilter()
            .withTo(data.userIdTo)
            .withFrom(data.userIdFrom)
            .withRead(false)
            .withCreatedDate(new Date().toString())
            .withIsDeleted(false)
            .withType(data.type));
        const notificationInfo: IWebSocketData<Notifications> = {
            userId: data.userIdTo,
            event: "notification",
            data: notification
        };
        this._websocketService.sendToUser(notificationInfo);
        console.log(`Уведомление отправлено пользователю ${data.userIdTo}`);
        return notification;
    };
}