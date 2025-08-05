import { WebSocket } from 'ws';

export interface IUserSocket {
    userId: number;
    socket: WebSocket;
}