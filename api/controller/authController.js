import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"
import { errorHandler } from './../utils/error.js';
import jwt from "jsonwebtoken";

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    const hashedPass = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPass });
    try {
        await newUser.save();
        res.json("user created successfully");
    } catch (error) {
        next(error);
    }
}

export const signin = async(req,res,next) =>{
    const {email,password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
           return next(errorHandler('404',"user not found"))
        }
        const validPassword = bcrypt.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorHandler('401',"Wrong Credentials"))
        }
        const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET);
        const {password : pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly : true})
        .status(200)
        .json(rest)
    } catch (error) {
        next(error);
    }
}

export const google = async (req,res,next) =>{
    const {name, email, avatar} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
            const {password : pass, ...rest} = user._doc;
            res.cookie('access token', token, {httpOnly : true})
            .status(200)
            .json(rest)
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPass = bcrypt.hashSync(generatePassword,10);
            const newUser = User({username : name, email : email, avatar : avatar, password : hashedPass});
            await newUser.save();
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
            const {password : pass, ...rest} = user._doc;
            res.cookie('access token', token, {httpOnly : true})
            .status(200)
            .json(rest)
        }
    } catch (error) {
        next(error);
    }
}