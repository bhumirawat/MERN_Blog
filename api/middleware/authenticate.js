// ==============================
// authenticate.js
// Middleware to verify user authentication
// Checks JWT token from cookies and attaches decoded user info to request
// ==============================

import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    // Extract JWT token from cookies
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Verify token using secret
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info (id, name, email, etc.) to request
    req.user = decodeToken;

    // Allow request to proceed to next middleware/controller
    next();
  } catch (error) {
    // Handle token errors or other issues
    res.status(500).json({ message: error.message });
  }
};
