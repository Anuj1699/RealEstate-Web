import { errorHandler } from './../utils/error.js';
import  bcrypt  from 'bcryptjs';
import User from '../models/userSchema.js';
import listingModel from '../models/listingSchema.js';

export const updateUser = async (req,res,next) =>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,"you can only update your account"));
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password,10);
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                avatar : req.body.avatar
            }
        }, {new : true})
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next) =>{
    if(req.user.id !== req.params.id) return next(errorHandler(404,"you can delete your own account"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token")
        res.status(200).send("User has been Deleted");
    } catch (error) {
        next(error)
    }
}

export const showUserListing = async(req,res,next) =>{
    if(req.user.id === req.params.id){
        try {
           const listing = await listingModel.find({userRef : req.params.id});
           res.json(listing);
        } catch (error) {
            next(error);
        }
    }
    else{
        next(errorHandler(404,"you can see only your listing"))
    }
}

export const getUser = async(req,res,next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            next(errorHandler(404,"User Not Found"));
        }
        const {password : pass, ...rest} = user._doc;
        res.json(rest);
    } catch (error) {
        next(error);
    }
}
