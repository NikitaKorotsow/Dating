const express = require('express');
import { authRouter } from "./Routes/Routes";

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

export default app;