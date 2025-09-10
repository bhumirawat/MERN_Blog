// ==============================
// Auth.route.js
// Authentication routes (register, login, logout, Google login)
// ==============================

import express from "express";
import { GoogleLogin, Login, Register, Logout } from "../controllers/Auth.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const AuthRoute = express.Router();

// -------------For Public-----------
AuthRoute.post("/register", Register); // Register new user
AuthRoute.post("/login", Login); // Login with email & password
AuthRoute.post("/google-login", GoogleLogin); // Login or register via Google

// -------------For authenticated Users-----------
AuthRoute.get("/logout", authenticate, Logout); // Logout current user

export default AuthRoute;
