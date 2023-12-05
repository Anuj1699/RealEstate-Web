import Listing from "../models/listingSchema.js"
import { errorHandler } from './../utils/error.js';

export const listing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "you can only delete your listings"));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.json('Listing Deleted')
    } catch (error) {
        next(error);
    }
}

export const editListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }
    const userIdString = req.user.id.toString();
    const listingUserIdString = listing.userRef.toString();

    if (userIdString !== listingUserIdString) {
        return next(errorHandler(401, "You can only update your listings"));
    }
    try {
        const updatedUser = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(201).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export const getListing = async(req,res,next) =>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,"Listing not found"))
    }
    res.json(listing);
} 