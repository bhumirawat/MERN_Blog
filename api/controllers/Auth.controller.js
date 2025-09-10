import { handleError } from "../helper/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export const Register = async (req, res, next) => { 
    try {
        const { name, email, password } = req.body;
        const checkUser = await User.findOne({ email });
        if(checkUser) {
            //user already exists
            return next(handleError(409, "User already exists"))
        }

        const hashedPassword = bcryptjs.hashSync(password);
        //create new user
        const user = new User({
            name, email, password: hashedPassword
        })

        await user.save();

        res.status(200).json({
            success: true,
            message: "Registration Successful"
        })

    } catch (error) {
       next(handleError(500, error.message))
    }
}


export const Login = async (req, res, next) => { 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if(!user) {
                return next(handleError(404, "Invalid Login Credentials"))
        }
        const hashedPassword = user.password;

        const comparePassword = await bcryptjs.compare(password, hashedPassword)
        if(!comparePassword) {
                return next (handleError(404, "Invalid Login Credentials"))
        }   
        

        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar, 
        }, process.env.JWT_SECRET)

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/",
        })

        const newUser = user.toObject({getters: true})
        delete newUser.password;
        res.status(200).json({
            success: true,
            user: newUser,
            message: "Login Successful"
        })

    } catch (error) {
       next(handleError(500, error.message))
    }
}


export const GoogleLogin = async (req, res, next) => { 
    try {
        const { name, email, avatar } = req.body;
        let user 
        user = await User.findOne({ email })
        if(!user) {
            //create new user
            const password = Math.random().toString()
            const hashedPassword = bcryptjs.hashSync(password);
            const newUser = new User({
                name, email, password: hashedPassword, avatar
            })

        user = await newUser.save();
            
        }


        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar, 
        }, process.env.JWT_SECRET)

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/",
        })

        const newUser = user.toObject({getters: true})
        delete newUser.password;
        res.status(200).json({
            success: true,
            user: newUser,
            message: "Login Successful"
        })

    } catch (error) {
       next(handleError(500, error.message))
    }
}


export const Logout = async (req, res, next) => { 
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/",
        })

        res.status(200).json({
            success: true,
            message: "Logout Successful"
        })

    } catch (error) {
       next(handleError(500, error.message))
    }
}