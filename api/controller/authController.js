import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"
import { errorHandler } from './../utils/error.js';
import jwt from "jsonwebtoken";

export const signup = async (req, res,next) => {
    const salt = await bcrypt.genSalt(10);
    const { username, email, password } = req.body;
    const hashedPass = bcrypt.hashSync(password, salt);
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