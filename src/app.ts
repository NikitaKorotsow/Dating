import express from 'express';
import { authRouter, userRouter, likeRouter } from "./Routes/Routes";

const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/profile', userRouter);
app.use('/like', likeRouter);

export default app;
