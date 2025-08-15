import { server } from './httpService';
import { configurationService } from './app.config';

const PORT = configurationService.EXPRESS_PORT | 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
console.log("index");