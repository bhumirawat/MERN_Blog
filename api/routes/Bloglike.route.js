// ==============================
// BlogLike.route.js
// Blog like routes (some protected by authentication)
// ==============================

import express from 'express';
import { doLike, likeCount } from '../controllers/BlogLike.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const BlogLikeRoute = express.Router();

// -------------For authenticated Users-----------
BlogLikeRoute.post('/do-like', authenticate, doLike); // Toggle like for a blog 

// -------------For Public-----------
BlogLikeRoute.get('/get-like/:blogid/:userid', likeCount); // Get like count and check if specific user liked
BlogLikeRoute.get('/get-like/:blogid', likeCount); // Get like count only

export default BlogLikeRoute;
