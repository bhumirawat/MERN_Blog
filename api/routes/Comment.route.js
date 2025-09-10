// ==============================
// Comment.route.js
// Comment routes
// ==============================

import express from "express";
import {
  addComment,
  commentCount,
  deleteComments,
  getAllComments,
  getComment,
  getMyComments,
} from "../controllers/Comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const CommentRoute = express.Router();

// -------------For Admin only-----------
CommentRoute.get("/get-all-comment", getAllComments); // Get all comments (admin)

// -------------For authenticated Users-----------
CommentRoute.post("/add", authenticate, addComment); // Add new comment 
CommentRoute.delete("/delete/:commentid", authenticate, deleteComments); // Delete comment 
CommentRoute.get("/get-my-comments", authenticate, getMyComments); // Get current user's comments

// -------------For Public-----------
CommentRoute.get("/get/:blogid", getComment); // Get comments for a blog
CommentRoute.get("/get-count/:blogid", commentCount); // Get comment count for a blog




export default CommentRoute;
