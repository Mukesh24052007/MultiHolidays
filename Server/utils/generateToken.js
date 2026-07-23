import jwt from "jsonwebtoken";

/**
 * Signs and returns a JWT for the given user id.
 * Expiry is driven by the JWT_EXPIRES_IN env var (default 7d).
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export default generateToken;
