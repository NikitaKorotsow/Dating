import { Router } from 'express';
import { authController, likeController, userController, } from '../app.config';
import { upload } from '../Utils/MulterUtils/MulterUtils';
export const authRouter = Router();
export const userRouter = Router();
export const likeRouter = Router();

authRouter.post('/registration', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

userRouter.put('/', upload.single('file'), userController.updateProfile);
userRouter.get('/:id', userController.getProfile);
userRouter.delete('/', userController.deleteProfile);
userRouter.delete('/deleteAvatar', upload.single('file'), userController.deleteAvatar);

likeRouter.post('/', likeController.createLike);
likeRouter.delete('/', likeController.deleteLike);
likeRouter.post('/list', likeController.getLikesList);
