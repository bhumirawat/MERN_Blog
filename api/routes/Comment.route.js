// import express from "express";
// import { addComment, commentCount, deleteComments, getAllComments, getComment } from "../controllers/Comment.controller.js";
// import { authenticate } from "../middleware/authenticate.js";

// const CommentRoute = express.Router();

// CommentRoute.post('/add', authenticate, addComment)
// CommentRoute.get('/get/:blogid', getComment )
// CommentRoute.get('/get-count/:blogid', commentCount )
// CommentRoute.get('/get-all-comment', authenticate, getAllComments )
// CommentRoute.delete('/delete/:commentid', authenticate, deleteComments )



// export default CommentRoute;



import express from "express";
import { addComment, commentCount, deleteComments, getAllComments, getComment, getMyComments } from "../controllers/Comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const CommentRoute = express.Router();

CommentRoute.post('/add', authenticate, addComment)
CommentRoute.get('/get/:blogid', getComment )
CommentRoute.get('/get-count/:blogid', commentCount )

// Admin gets all comments
CommentRoute.get('/get-all-comment',  getAllComments);

// Regular user gets only their own comments
CommentRoute.get('/get-my-comments', authenticate, getMyComments);

CommentRoute.delete('/delete/:commentid', authenticate, deleteComments )

export default CommentRoute;