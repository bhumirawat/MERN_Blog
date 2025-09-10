// ==============================
// index.js
// Entry point of the MERN Blog backend server
// Handles middleware, routes, DB connection, and error handling
// ==============================

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

// Import routes
import AuthRoute from "./routes/Auth.route.js";
import UserRoute from "./routes/User.route.js";
import CategoryRoute from "./routes/Category.route.js";
import BlogRoute from "./routes/Blog.route.js";
import CommentRoute from "./routes/Comment.route.js";
import BlogLikeRoute from "./routes/Bloglike.route.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// //---------- Middleware----------
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON request bodies
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests only from frontend
    credentials: true, // Allow cookies/auth headers across origins
  })
);

// //---------- API Routes----------
app.use("/api/auth", AuthRoute);       // Authentication (Register, Login, Logout, Google login)
app.use("/api/user", UserRoute);       // User management
app.use("/api/category", CategoryRoute); // Blog categories
app.use("/api/blog", BlogRoute);       // Blog CRUD
app.use("/api/comment", CommentRoute); // Blog comments
app.use("/api/blog-like", BlogLikeRoute); // Blog likes

// //---------- Database Connection----------
mongoose
  .connect(process.env.MONGODB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "MERN_Blog", // Explicit DB name
  })
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`Server is running on port: ${PORT}`)
    );
  })
  .catch((err) => console.error("Connection failed.", err));

// //---------- Global Error Handler Middleware------------
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});
