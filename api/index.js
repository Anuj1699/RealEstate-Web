import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => console.log("Connection Successfull"))
.catch((err) => console.log(err))

const app = express();

app.get("/",(req,res) =>{
    res.send("Hello")
})

app.listen(3000,()=>{
    console.log("Port 3000 running...");
})