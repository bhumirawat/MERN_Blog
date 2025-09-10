import { handleError } from "../helper/handleError.js"
import User from "../models/user.model.js"
import cloudinary from "../config/cloudinary.js"
import bcryptjs from "bcryptjs"

// ---------------- GET USER ----------------
export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
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

    const user = await User.findById(userid);
    if (!user) {
      return next(handleError(404, "User not found"));
    }

    // Parse JSON string sent from frontend
    let data = {};
    if (req.body.data) {
      try {
        data = JSON.parse(req.body.data);
      } catch (err) {
        return next(handleError(400, "Invalid data format"));
      }
    }

    // Update basic fields
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.bio) user.bio = data.bio || "";

    // Update password if valid
    if (data.password && data.password.length >= 8) {
      const hashedPassword = bcryptjs.hashSync(data.password, 10); // add salt rounds
      user.password = hashedPassword;
    }

    // Handle file upload
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "MERN_Blog",
          resource_type: "auto",
        });

        user.avatar = uploadResult.secure_url || "";
      } catch (error) {
        console.error("Cloudinary upload failed:", error); // debug actual error
        return next(handleError(500, "Image upload failed"));
      }
    }

    // Save with validation
    await user.save();

    // Prepare response object (remove password)
    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      message: "Data Updated",
      user: newUser,
    });
  } catch (error) {
    // log validation errors clearly
    if (error.name === "ValidationError") {
      console.error("Validation errors:", error.errors);
    }
    next(handleError(500, error.message));
  }
};



// ---------------- GET ALL USER ----------------
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().sort({
      createAt:-1 })

      res.status(200).json({
        success: true,
        users
      })
  } catch (error) {
    next(handleError(500, error.message));
  }
}

// ---------------- DELETE USER ----------------
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        
        res.status(200).json({
            success: true,
            message: 'Data Deleted Successfully'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}



