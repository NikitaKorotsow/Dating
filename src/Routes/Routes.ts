import { Router } from 'express';
import { authController } from '../app.config';

export const authRouter = Router();

authRouter.post('/registration', authController.register);