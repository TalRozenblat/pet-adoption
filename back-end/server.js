import express from 'express';
const app = express();
import "dotenv/config";
import db from './connection.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import jwt from 'jsonwebtoken';
import signupValidation from './middlewares/signupValidation.js';
import loginValidation from './middlewares/loginValidation.js';
import signupController from './controllers/signupController.js';
import loginController from './controllers/loginController.js';
import petRouter from './routes/petRoutes.js';
import userRouter from './routes/userRoutes.js';



const connection = db;

app.use (express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req,res) => {
    req.setEncoding('Hello World!');
});

app.post('/signup',signupValidation, signupController.signup);
app.post('/login',loginValidation, loginController.login);
app.use('/pet', petRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT, () => console.log(`Listening at http://localhost:${process.env.PORT}`));
