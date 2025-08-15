import http from 'http';
import { WebSocketServer } from 'ws';
import { app } from './app';

const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });
export { server, wsServer };