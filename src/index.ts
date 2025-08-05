import server from './httpServer';
import { configurationService } from './app.config';

const PORT = configurationService.EXPRESS_PORT || 3000;

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
