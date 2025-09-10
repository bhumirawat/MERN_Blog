// ==============================
// User.controller.js
// Controller for managing users
// Includes get, update, list, and delete operations
// ==============================

import { handleError } from "../helper/handleError.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import bcryptjs from "bcryptjs";


// ---------------- GET USER ----------------
export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;

    // Find user by ID
    const user = await User.findOne({ _id: userid }).lean().exec();
    if (!user) {
      return next(handleError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User data found",
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


// ---------------- UPDATE USER ----------------
export const updateUser = async (req, res, next) => {
  try {
    const { userid } = req.params;

    // Validate if user exists
    const user = await User.findById(userid);
    if (!user) {
      return next(handleError(404, "User not found"));
    }

    // Parse data from frontend (sent as JSON string sometimes)
    let data = {};
    if (req.body.data) {
      try {
        data = JSON.parse(req.body.data);
      } catch (err) {
        return next(handleError(400, "Invalid data format"));
      }
    }

    // Update user fields
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.bio) user.bio = data.bio || "";

    // Update password if provided and valid
    if (data.password && data.password.length >= 8) {
      const hashedPassword = bcryptjs.hashSync(data.password, 10); // 10 salt rounds
      user.password = hashedPassword;
    }

    // Handle avatar upload via Cloudinary
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "MERN_Blog",
          resource_type: "auto",
        });

        user.avatar = uploadResult.secure_url || "";
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        return next(handleError(500, "Image upload failed"));
      }
    }

    // Save updated user
    await user.save();

    // Remove password before sending response
    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      message: "User data updated",
      user: newUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("Validation errors:", error.errors);
    }
    next(handleError(500, error.message));
  }
};


// ---------------- GET ALL USERS ----------------
export const getAllUser = async (req, res, next) => {
  try {
    // Fetch all users sorted by creation date (newest first)
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


// ---------------- DELETE USER ----------------
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete user by ID
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
