// ==============================
// BlogLike.controller.js
// Controller for managing blog likes
// Includes Like/Unlike functionality and Like Count with User Check
// ==============================

import { handleError } from "../helper/handleError.js";
import BlogLike from "../models/bloglike.model.js";


// ---------------- LIKE / UNLIKE BLOG ----------------
export const doLike = async (req, res, next) => {
    try {
        const { user, blogid } = req.body;

        // Validate required fields
        if (!user || !blogid) {
            return res.status(400).json({
                success: false,
                message: "User and Blogid are required",
            });
        }

        // Check if the user already liked this blog
        let like = await BlogLike.findOne({ user, blogid });

        if (!like) {
            // If not liked yet → create a new like
            const saveLike = new BlogLike({ user, blogid });
            await saveLike.save();
        } else {
            // If already liked → unlike (remove the like)
            await BlogLike.findByIdAndDelete(like._id);
        }

        // Count total likes for the blog
        const likecount = await BlogLike.countDocuments({ blogid });

        res.status(200).json({
            success: true,
            likecount,
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- GET LIKE COUNT + USER STATUS ----------------
export const likeCount = async (req, res, next) => {
    try {
        const { blogid, userid } = req.params;

        // Get total like count for the blog
        const likecount = await BlogLike.countDocuments({ blogid });

        // Check if the logged-in user has liked the blog
        let isUserliked = false;
        if (userid) {
            const getuserLike = await BlogLike.countDocuments({ blogid, user: userid });
            if (getuserLike > 0) {
                isUserliked = true;
            }
        }

        res.status(200).json({
            likecount,
            isUserliked,
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
