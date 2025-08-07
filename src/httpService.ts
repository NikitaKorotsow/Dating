import http from 'http';
import { app } from './app';

const server = http.createServer(app);
console.log('http');
export default server;