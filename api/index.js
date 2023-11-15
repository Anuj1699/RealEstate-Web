import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adjust the path to your .env file based on its location
const envPath = resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

mongoose.connect(process.env.MONGO).then(() => console.log("Connection Successful"))
.catch((err) => console.log(err))

const app = express();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(3000, () => {
    console.log("Port 3000 running...");
});
