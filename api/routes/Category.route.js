// ==============================
// Category.route.js
// Category routes (protected by admin access)
// ==============================

import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  showCategory,
  updateCategory,
} from "../controllers/Category.controller.js";
import { adminaccess } from "../middleware/AdminAccess.js";

const CategoryRoute = express.Router();

// -------------For Admin only-----------
CategoryRoute.post("/add", adminaccess, addCategory); // Add new category 
CategoryRoute.put("/update/:categoryid", adminaccess, updateCategory); // Update category 
CategoryRoute.get("/show/:categoryid", adminaccess, showCategory); // Get single category 
CategoryRoute.delete("/delete/:categoryid", adminaccess, deleteCategory); // Delete category 

// -------------For Public-----------
CategoryRoute.get("/all-category", getAllCategory); // Get all categories

export default CategoryRoute;
