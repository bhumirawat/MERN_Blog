// ==============================
// Comment.controller.js
// Controller for managing blog comments
// Includes add, fetch, count, user-specific, and delete operations
// ==============================

import { handleError } from "../helper/handleError.js";
import Comment from "../models/comment.model.js";


// ---------------- ADD COMMENT ----------------
export const addComment = async (req, res, next) => {
    try {
        const { user, blogid, comment } = req.body;

        // Create new comment document
        const newComment = new Comment({ user, blogid, comment });
        await newComment.save();

        res.status(200).json({
            success: true,
            message: "Comment Submitted",
            comment: newComment,
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- GET COMMENTS FOR BLOG ----------------
export const getComment = async (req, res, next) => {
    try {
        const { blogid } = req.params;

        // Fetch comments for a blog, populate user details
        const comments = await Comment.find({ blogid })
            .populate("user", "name avatar")
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        res.status(200).json({ comments });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- COUNT COMMENTS FOR BLOG ----------------
export const commentCount = async (req, res, next) => {
    try {
        const { blogid } = req.params;

        // Count number of comments for a blog
        const commentCount = await Comment.countDocuments({ blogid });

        res.status(200).json({ commentCount });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- GET ALL COMMENTS ----------------
export const getAllComments = async (req, res, next) => {
    try {
        // Fetch all comments with related blog title and user
        const comments = await Comment.find()
            .populate("blogid", "title")
            .populate("user", "name");

        res.status(200).json({ comments });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- GET USER'S COMMENTS ----------------
export const getMyComments = async (req, res, next) => {
    try {
        // Fetch comments created by logged-in user
        const comments = await Comment.find({ user: req.user.id })
            .populate("blogid", "title")
            .populate("user", "name");

        res.status(200).json({ comments });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- DELETE COMMENT ----------------
export const deleteComments = async (req, res, next) => {
    try {
        const { commentid } = req.params;

        // Delete comment by ID
        await Comment.findByIdAndDelete(commentid);

        res.status(200).json({
            success: true,
            message: "Comment Deleted",
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
