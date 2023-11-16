import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"

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