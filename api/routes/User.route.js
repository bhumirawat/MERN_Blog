// ==============================
// User.route.js
// User routes (protected by authentication)
// ==============================

import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/User.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const UserRoute = express.Router();

// -------------For Admin only-----------
UserRoute.use(authenticate);

UserRoute.get("/get-user/:userid", getUser);// Get single user by ID
UserRoute.put("/update-user/:userid", upload.single("file"), updateUser);// Update user (with optional avatar upload)
UserRoute.get("/get-all-user", getAllUser);// Get all users
UserRoute.delete("/delete/:id", deleteUser);// Delete user

export default UserRoute;
