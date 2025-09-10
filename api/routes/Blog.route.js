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
import { adminaccess } from "../middleware/adminaccess.js";

const BlogRoute = express.Router();

// Create
BlogRoute.post("/add", authenticate, upload.single("file"), addBlog);

// Update/Edit/Delete
BlogRoute.get("/edit/:blogid", authenticate, editBlog);
BlogRoute.put("/update/:blogid", authenticate, upload.single("file"), updateBlog);
BlogRoute.delete("/delete/:blogid", authenticate, deleteBlog);

//User-specific blogs
BlogRoute.get("/my-blogs", authenticate, getMyBlogs);


// Public routes
BlogRoute.get("/get-all", showAllBlog);
BlogRoute.get("/get-blog/:slug", getBlog);
BlogRoute.get("/get-related-blog/:category/:blog", getRelatedBlog);
BlogRoute.get("/get-blog-by-category/:category", getBlogByCategory);
BlogRoute.get("/search", search);

export default BlogRoute;
