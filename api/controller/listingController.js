import Listing from "../models/listingSchema.js"

export const listing = async (req,res,next) =>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}