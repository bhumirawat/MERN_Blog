// ==============================
// Category.controller.js
// Controller for managing blog categories
// Includes CRUD operations + Fetch all categories
// ==============================

import { handleError } from "../helper/handleError.js";
import Category from "../models/category.model.js";


// ---------------- ADD CATEGORY ----------------
export const addCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body;

        // Create new category document
        const category = new Category({ name, slug });
        await category.save();

        res.status(200).json({
            success: true,
            message: "Category Added Successfully",
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- SHOW SINGLE CATEGORY ----------------
export const showCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params;

        // Find category by ID
        const category = await Category.findById(categoryid);
        if (!category) {
            return next(handleError(404, "Data not found."));
        }

        res.status(200).json({ category });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- UPDATE CATEGORY ----------------
export const updateCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params;
        const { name, slug } = req.body;

        // Update category by ID and return new updated doc
        const category = await Category.findByIdAndUpdate(
            categoryid,
            { name, slug },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- DELETE CATEGORY ----------------
export const deleteCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params;

        // Delete category by ID
        await Category.findByIdAndDelete(categoryid);

        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully",
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};


// ---------------- GET ALL CATEGORIES ----------------
export const getAllCategory = async (req, res, next) => {
    try {
        // Fetch all categories sorted by name (ascending)
        const category = await Category.find().sort({ name: 1 }).lean().exec();

        res.status(200).json({ category });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
