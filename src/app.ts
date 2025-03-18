import express from 'express';
import {
    userController,
    authController
} from './app.config';

const app = express();

app.use(userController.register);
app.use(authController.register);

export default app;