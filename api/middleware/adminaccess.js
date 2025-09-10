// ==============================
// adminaccess.js
// Middleware to verify admin access
// Checks JWT token from cookies and ensures user role is "admin"
// ==============================

import jwt from "jsonwebtoken";

export const adminaccess = async (req, res, next) => {
  try {
    // Extract JWT token from cookies
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Verify token using secret
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user has admin role
    if (decodeToken.role === "admin") {
      req.user = decodeToken; // attach user info to request
      next(); // proceed to next middleware/controller
    } else {
      return res.status(403).json({ message: "Admin access required" });
    }
  } catch (error) {
    // Handle token errors or other issues
    res.status(500).json({ message: error.message });
  }
};
