import { Router } from 'express';
import { authController, userController } from '../app.config';

export const authRouter = Router();
export const userRouter = Router();

authRouter.post('/registration', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

userRouter.get('/', userController.getProfile);
userRouter.put('/', userController.updateProfile);
userRouter.delete('/', userController.deleteProfile);