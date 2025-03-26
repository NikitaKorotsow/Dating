import { authRouter, userRouter } from "./Routes/Routes";
const express = require('express');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/profile', userRouter);

export default app;