import { WebSocket, WebSocketServer } from "ws";
import { NotificationRepository } from "../../Repositories/NotificationRepository";
import { INotification } from "../../Models/Interfaces/INotification";
import { ConfigurationService } from "../Configurations/ConfigurationService";

export class NotificationService {
    private client = new Map<string, WebSocket>();
    private readonly _notificationRepository: NotificationRepository;
    private readonly _wsServer: WebSocketServer;
    private readonly _configurationService: ConfigurationService;

    constructor(notificationRepository: NotificationRepository, configurationService: ConfigurationService) {
        this._notificationRepository = notificationRepository;
        this._configurationService = configurationService;
    }

    public sendNotification = async (data: INotification) => {
        this._wsServer.on("connection", ws => {
            this.client.set(data.userId.toString(), ws);
            console.log("Чипс добавлен");
        });
        this._wsServer.on("close", () => {
            this.client.delete(data.userId.toString());
            console.log("Чипс удален");

        });
    };

}
