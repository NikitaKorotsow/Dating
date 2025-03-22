import app from './app';
import { configurationService } from './app.config';

const PORT = configurationService.EXPRESS_PORT;

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});