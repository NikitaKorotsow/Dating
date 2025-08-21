import { Router } from 'express';
import { RequestHandler } from 'express';
import { upload } from '../Utils/MulterUtils/MulterUtils';
import { AuthController } from '../Controllers/AuthController';
import { UserController } from '../Controllers/UserController';
import { LikeController } from '../Controllers/LikeController';
import { ChatController } from '../Controllers/ChatController';

export const createAuthRouter = (authController: AuthController) => {
    const authRouter = Router();
    authRouter.post('/registration', authController.register);
    authRouter.post('/login', authController.login);
    authRouter.post('/logout', authController.logout);
    return authRouter;
};

export const createUserRouter = (userController: UserController, jwtMiddleware: RequestHandler) => {
    const userRouter = Router();
    userRouter.put('/', jwtMiddleware, upload.single('file'), userController.updateProfile);
    userRouter.get('/:id', jwtMiddleware, userController.getProfile);
    userRouter.delete('/', jwtMiddleware, userController.deleteProfile);
    userRouter.delete('/deleteAvatar', jwtMiddleware, upload.single('file'), userController.deleteAvatar);
    return userRouter;
};

export const createLikeRouter = (likeController: LikeController, jwtMiddleware: RequestHandler) => {
    const likeRouter = Router();
    likeRouter.post('/', jwtMiddleware, likeController.createLike);
    likeRouter.post('/listTo', jwtMiddleware, likeController.getLikesListTo);
    likeRouter.post('/listFrom', jwtMiddleware, likeController.getLikesListFrom);
    likeRouter.delete('/listTo', jwtMiddleware, likeController.deleteLike);
    likeRouter.delete('/listFrom', jwtMiddleware, likeController.deleteLike);
    return likeRouter;
};

export const createChatRouter = (chatController: ChatController, jwtMiddleware: RequestHandler) => {
    const chatRouter = Router();
    chatRouter.post('/', jwtMiddleware, chatController.getUserChats);
    chatRouter.post('/send', jwtMiddleware, chatController.sendMessage);
    chatRouter.delete('/messages', jwtMiddleware, chatController.deleteMessage);
    return chatRouter;
};