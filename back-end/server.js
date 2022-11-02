import express from 'express';
const app = express();
import "dotenv/config";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const PORT = 3000;


app.use (express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req,res) => {
    req.setEncoding('Hello World!');
});

app.listen(process.env.PORT, () => console.log(`Listening at http://localhost:${process.env.PORT}`));
