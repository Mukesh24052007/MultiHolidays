import jwt from "jsonwebtoken";

/**
 * Signs and returns a JWT for the given admin id.
 * Expiry is driven by the JWT_EXPIRES_IN env var (default 7d).
 */
const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export default generateToken;
