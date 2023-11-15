import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPass = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPass });
    try {
        await newUser.save();
        res.json("user created successfully");
    } catch (error) {
        res.send(error.message);
    }
}