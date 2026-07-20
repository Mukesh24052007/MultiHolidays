import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

const extractName = (email) => email.split("@")[0].split(".")[0];

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms, mirrors JWT_EXPIRES_IN
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  try {
    // Check whether this email is already registered
    const existingAdmin = await Admin.findOne({ email }).select("+password");

    if (!existingAdmin) {
      // ── First time: auto-register and log in ──────────────────────────────
      const newAdmin = await Admin.create({ email, password });
      const token = generateToken(newAdmin._id);

      res.cookie("token", token, cookieOptions);

      return res.status(201).json({
        success: true,
        message: "Account created and logged in successfully.",
        token,
        admin: {
          id: newAdmin._id,
          email: newAdmin.email,
          name: extractName(newAdmin.email),
          createdAt: newAdmin.createdAt,
        },
      });
    }

    // ── Returning admin: verify password ─────────────────────────────────────
    const isMatch = await existingAdmin.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const token = generateToken(existingAdmin._id);

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token,
      admin: {
        id: existingAdmin._id,
        email: existingAdmin.email,
        name: extractName(existingAdmin.email),
        createdAt: existingAdmin.createdAt,
      },
    });
  } catch (error) {
    console.error("Auth error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

export const getMe = async (req, res) => {
  // req.admin is attached by the protect middleware
  res.status(200).json({
    success: true,
    admin: {
      id: req.admin._id,
      email: req.admin.email,
      name: extractName(req.admin.email),
      createdAt: req.admin.createdAt,
    },
  });
};

export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully." });
};
