// ==============================
// Auth.controller.js
// Controller for managing authentication operations
// Includes Register, Login, Google Login, and Logout
// ==============================

import { handleError } from "../helper/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


// ---------------- REGISTER USER ----------------
export const Register = async (req, res, next) => { 
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return next(handleError(409, "User already exists"));
        }

        // Hash password before saving
        const hashedPassword = bcryptjs.hashSync(password);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Registration Successful",
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- LOGIN USER ----------------
export const Login = async (req, res, next) => { 
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return next(handleError(404, "Invalid Login Credentials"));
        }

        // Compare entered password with stored hashed password
        const hashedPassword = user.password;
        const comparePassword = await bcryptjs.compare(password, hashedPassword);

        if (!comparePassword) {
            return next(handleError(404, "Invalid Login Credentials"));
        }   

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
            process.env.JWT_SECRET
        );

        // Store JWT in cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/",
        });

        // Remove password before sending user object
        const newUser = user.toObject({ getters: true });
        delete newUser.password;

        res.status(200).json({
            success: true,
            user: newUser,
            message: "Login Successful",
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- GOOGLE LOGIN ----------------
export const GoogleLogin = async (req, res, next) => { 
    try {
        const { name, email, avatar } = req.body;
        let user = await User.findOne({ email });

        // If user doesn't exist, create one
        if (!user) {
            const password = Math.random().toString(); // random password for Google users
            const hashedPassword = bcryptjs.hashSync(password);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                avatar,
            });

            user = await newUser.save();
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
            process.env.JWT_SECRET
        );

        // Store JWT in cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/",
        });

        // Remove password before sending user object
        const newUser = user.toObject({ getters: true });
        delete newUser.password;

        res.status(200).json({
            success: true,
            user: newUser,
            message: "Login Successful",
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- LOGOUT USER ----------------
export const Logout = async (req, res, next) => { 
    try {
        // Clear auth cookie
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/",
        });

        res.status(200).json({
            success: true,
            message: "Logout Successful",
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
};
