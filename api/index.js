import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthRoute from './routes/Auth.route.js';
import UserRoute from './routes/User.route.js';
import CategoryRoute from './routes/Category.route.js';
import BlogRoute from './routes/Blog.route.js';
import CommentRoute from './routes/Comment.route.js';
import BlogLikeRoute from './routes/Bloglike.route.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

// route setup

app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/blog', BlogRoute)
app.use('/api/comment', CommentRoute)
app.use('/api/blog-like', BlogLikeRoute)


mongoose.connect(process.env.MONGODB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "MERN_Blog"
})
.then(() => {
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
})
.catch((err) => console.error("Connection failed.", err));

// mongoose.connect(process.env.MONGODB_CONN/*, {dbName: 'MERN_Blog'}*/)
// .then(() => console.log("Database connected"))
// .catch((err) => console.log("Connection failed.", err));

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({ 
        success: false,
        status: statusCode,
        message
    })

})