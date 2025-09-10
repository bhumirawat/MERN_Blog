import express from "express";
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from "../controllers/Category.controller.js";
import { adminaccess } from "../middleware/AdminAccess.js";



const CategoryRoute = express.Router();

CategoryRoute.post('/add', adminaccess, addCategory)
CategoryRoute.put('/update/:categoryid', adminaccess, updateCategory)
CategoryRoute.get('/show/:categoryid', adminaccess, showCategory)
CategoryRoute.delete('/delete/:categoryid', adminaccess, deleteCategory)
CategoryRoute.get('/all-category', getAllCategory)


export default CategoryRoute;