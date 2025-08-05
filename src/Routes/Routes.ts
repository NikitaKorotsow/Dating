import { Router } from 'express';
import { authController, likeController, userController } from '../app.config';
import { upload } from '../Utils/MulterUtils/MulterUtils';
import { jwtMiddleware } from '../Middleware/JWTMiddleware';
export const authRouter = Router();
export const userRouter = Router();
export const likeRouter = Router();
export const testRouter = Router();

authRouter.post('/registration', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

userRouter.put('/', upload.single('file'), userController.updateProfile);
userRouter.get('/:id', jwtMiddleware, userController.getProfile);
userRouter.delete('/', userController.deleteProfile);
userRouter.delete('/deleteAvatar', upload.single('file'), userController.deleteAvatar);

likeRouter.post('/', likeController.createLike);
likeRouter.post('/listTo', jwtMiddleware, likeController.getLikesListTo);
likeRouter.post('/listFrom', jwtMiddleware, likeController.getLikesListFrom);
likeRouter.delete('/listTo', jwtMiddleware, likeController.deleteLike);
likeRouter.delete('/listFrom', jwtMiddleware, likeController.deleteLike);

//notifications