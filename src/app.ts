import express from 'express';
import { createAuthRouter, createUserRouter, createLikeRouter, createChatRouter } from "./Routes/Routes";
import { authController, userController, tokenService, likeController, chatController } from './app.config';
import { createJWTMiddleware } from './Middleware/JWTMiddleware';

console.log('app');
export const app = express();
app.use(express.json());

const authRouter = createAuthRouter(authController);
const userRouter = createUserRouter(userController, createJWTMiddleware(tokenService));
const likeRouter = createLikeRouter(likeController, createJWTMiddleware(tokenService));
const chatRouter = createChatRouter(chatController, createJWTMiddleware(tokenService));

app.use('/auth', authRouter);
app.use('/profile', userRouter);
app.use('/like', likeRouter);
app.use('/chat', chatRouter);
