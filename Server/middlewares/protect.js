import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

/**
 * Middleware that validates the JWT from either:
 *  1. Authorization: Bearer <token> header
 *  2. "token" httpOnly cookie (set on login)
 *
 * Attaches the authenticated admin document to req.admin on success.
 */
const protect = async (req, res, next) => {
  let token;

  // 1. Check Authorization header first
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. Fall back to the httpOnly cookie
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Admin not found." });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token invalid or expired." });
  }
};

export default protect;
