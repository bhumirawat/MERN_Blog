import { handleError } from "../helper/handleError.js"
import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.model.js";
import { encode } from "entities";
import mongoose from "mongoose";
import Category from "../models/category.model.js"

// ---------------- Add Blog ----------------
export const addBlog = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        let featuredImage = ''

        // Handle file upload
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "MERN_Blog",
                resource_type: "auto",
            });
            featuredImage = uploadResult.secure_url;
        }

        const blog = new Blog({
            author: new mongoose.Types.ObjectId(data.author),
            category: new mongoose.Types.ObjectId(data.category),
            title: data.title,
            slug: data.slug,
            featuredImage: featuredImage,
            blogContent: encode(data.blogContent),
        })
        await blog.save()

        res.status(200).json({
            success: true,
            message: "Blog Added Successfully",
        });
    } catch (error) {
        // Handle duplicate slug error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A blog with this slug already exists.'
            });
        }
        next(handleError(500, error.message));
    }
}

// ---------------- Edit Blog ----------------
export const editBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const blog = await Blog.findById(blogid).populate('category', 'name')

        if (!blog) {
            return next(handleError(404, 'Data not found.'))
        }

        res.status(200).json({ blog })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

// ---------------- Update Blog ----------------
export const updateBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const data = JSON.parse(req.body.data)

        const blog = await Blog.findById(blogid)
        if (!blog) {
            return next(handleError(404, 'Blog not found'))
        }

        blog.category = data.category
        blog.title = data.title
        blog.slug = data.slug
        blog.blogContent = encode(data.blogContent)

        let featuredImage = blog.featuredImage
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "MERN_Blog",
                resource_type: "auto",
            });
            featuredImage = uploadResult.secure_url;
        }
        blog.featuredImage = featuredImage

        await blog.save()

        res.status(200).json({
            success: true,
            message: "Blog Updated Successfully",
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
}

// ---------------- Delete Blog ----------------
export const deleteBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const blog = await Blog.findById(blogid)

        if (!blog) {
            return next(handleError(404, 'Blog not found'))
        }


        await Blog.findByIdAndDelete(blogid)

        res.status(200).json({
            success: true,
            message: 'Blog Deleted Successfully'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

// ---------------- Show All Blogs ----------------
export const showAllBlog = async (req, res, next) => {
    try {
        const blog = await Blog.find()
            .populate('author', 'name avatar role')
            .populate('category', 'name slug')
            .sort({ createdAt: -1 })
            .lean()
            .exec()

        res.status(200).json({ blog })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

// ---------------- Get Single Blog ----------------
export const getBlog = async (req, res, next) => {
    try {
        const { slug } = req.params
        const blog = await Blog.findOne({ slug })
            .populate('author', 'name avatar role')
            .populate('category', 'name slug')
            .lean()
            .exec()

        res.status(200).json({ blog })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

// ---------------- Get Related Blogs ----------------
export const getRelatedBlog = async (req, res, next) => {
    try {
        const { category, blog } = req.params
        const categoryData = await Category.findOne({ slug: category })
        if (!categoryData) {
            return next(404, "Category data not found.")
        }
        const categoryId = categoryData._id
        const relatedBlog = await Blog.find({ category: categoryId, slug: { $ne: blog } })
            .lean().exec()

        res.status(200).json({ relatedBlog })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

// ---------------- Get Blog by Category ----------------
export const getBlogByCategory = async (req, res, next) => {
    try {
        const { category } = req.params
        const categoryData = await Category.findOne({ slug: category })
        if (!categoryData) {
            return next(404, "Category data not found.")
        }
        const categoryId = categoryData._id
        const blog = await Blog.find({ category: categoryId })
            .populate('author', 'name avatar role')
            .populate('category', 'name slug')
            .lean()
            .exec()

        res.status(200).json({ blog, categoryData })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

// ---------------- Search Blog ----------------
export const search = async (req, res, next) => {
    try {
        const { q } = req.query
        const blog = await Blog.find({ title: { $regex: q, $options: 'i' } })
            .populate('author', 'name avatar role')
            .populate('category', 'name slug')
            .lean()
            .exec()

        res.status(200).json({ blog })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

// ---------------- My Blog ----------------
export const getMyBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ author: req.user.id })
        .populate("author", "name avatar role")
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .lean()
        .exec();

    res.status(200).json({ blog: blogs, role: req.user.role }); 
  } catch (error) {
    next(handleError(500, error.message));
  }
};
