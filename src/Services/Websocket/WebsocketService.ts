import { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { Notifications } from "../../Models/Entities/Notifications";
import { IWebSocketData } from "../../Models/Interfaces/IWebSocketData";
import { IMessage } from "../../Models/Interfaces/IMessage";
import { NotificationService } from "../Notifications/NotificationService";

export class WebSocketService {
    private readonly clients = new Map<number, WebSocket>();

    public setupConnection(wsServer: WebSocketServer, notificationService: NotificationService) {
        wsServer.on("connection", async (ws, req) => {
            const userId = this.getUserIdFromCookie(req);

            if (!userId) {
                ws.close(1008, "Authorization missing");
                return null;
            }

            const existingSocket = this.clients.get(userId);
            if (existingSocket && existingSocket.readyState === WebSocket.OPEN) {
                console.log(`Пользователь ${userId} переподключился`);
                existingSocket.close();
            }

            this.clients.set(userId, ws);
            console.log(`Пользователь ${userId} подключён к WebSocket`);
            await notificationService.sendUnreadNotifications(userId);
            ws.on("close", () => {
                this.clients.delete(userId);
                console.log(`Пользователь ${userId} отключён`);
            });
        });
    }

    private getUserIdFromCookie(req: IncomingMessage) {
        const cookieHeader = req.headers.cookie;
        if (!cookieHeader) return null;

        const cookies = Object.fromEntries(
            cookieHeader.split(";").map(cookie => {
                const [key, value] = cookie.trim().split("=");
                return [key, decodeURIComponent(value)];
            })
        );
        const userIdStr = cookies["userId"];
        if (!userIdStr) return null;

        const userId = Number(userIdStr);
        return isNaN(userId) ? null : userId;
    }

    public sendToUser(sendObject: IWebSocketData<IMessage | Notifications | Notifications[]>): void {
        const socket = this.clients.get(sendObject.userId);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(sendObject));
        }
    }
}