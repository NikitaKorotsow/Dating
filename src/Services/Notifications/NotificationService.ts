import { Server } from 'http';
import { WebSocketServer } from 'ws';
// import { Request } from "express";
// import { INotification } from "../../Models/Interfaces/INotification";

export class NotificationService {
    // Самостоятельно подключиться и использовать server в конструкторе

    private wsServer: WebSocketServer;

    constructor(httpServer: Server) {
        // Подключаем WebSocket к уже существующему HTTP-серверу
        this.wsServer = new WebSocketServer({ server: httpServer });
        console.log('WebSocket запущен и привязан к Express');
    }
    // Должна быть функция отправки уведомления и записи в бд этого уведомления

}