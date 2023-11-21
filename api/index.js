import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import userRouter from "./router/userRouter.js"
import authRouter from "./router/authRouter.js"
import cookieParser from "cookie-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

mongoose.connect(process.env.MONGO).then(() => console.log("Connection Successful"))
.catch((err) => console.log(err))

app.use(cookieParser());
app.use(express.json());
app.use('/api/user/',userRouter);
app.use('/api/auth/',authRouter);


app.use((err,req,res,next) =>{
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal Error'
    return res.status(statuscode).json({
        success : false,
        statuscode,
        message
    });
})

app.listen(3000, () => {
    console.log("Port 3000 running...");
});
