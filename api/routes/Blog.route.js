// ==============================
// Blog.route.js
// Blog routes (CRUD, search, filtering, and user-specific blogs)
// Protected routes require authentication
// ==============================

import express from "express";
import {
  addBlog,
  editBlog,
  updateBlog,
  deleteBlog,
  showAllBlog,
  getBlog,
  getRelatedBlog,
  getBlogByCategory,
  search,
  getMyBlogs,
} from "../controllers/Blog.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const BlogRoute = express.Router();

// -------------For authenticated Users-----------
BlogRoute.post("/add", authenticate, upload.single("file"), addBlog); // Add new blog with optional image upload
BlogRoute.get("/edit/:blogid", authenticate, editBlog); // Fetch blog for editing
BlogRoute.put("/update/:blogid", authenticate, upload.single("file"), updateBlog); // Update blog with optional image upload
BlogRoute.delete("/delete/:blogid", authenticate, deleteBlog); // Delete blog by ID
BlogRoute.get("/my-blogs", authenticate, getMyBlogs); // Get blogs created by logged-in user

// -------------For Public-----------
BlogRoute.get("/get-all", showAllBlog); // Get all blogs
BlogRoute.get("/get-blog/:slug", getBlog); // Get single blog by slug
BlogRoute.get("/get-related-blog/:category/:blog", getRelatedBlog); // Get blogs from same category excluding current
BlogRoute.get("/get-blog-by-category/:category", getBlogByCategory); // Get blogs filtered by category
BlogRoute.get("/search", search); // Search blogs by title (query param: q)

export default BlogRoute;
