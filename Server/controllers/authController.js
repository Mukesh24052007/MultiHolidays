import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const extractName = (email) => email.split("@")[0].split(".")[0];

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  // "lax" allows the cookie to be sent on cross-origin requests initiated
  // by the browser (e.g. Next.js on :3000 calling the API on :2026).
  // "strict" blocks all cross-origin cookie sending, which breaks the
  // client-side getMe() call used to redirect authenticated users away
  // from the login page.
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
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
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      // ── First time: auto-register and log in ──────────────────────────────
      const newUser = await User.create({ email, password });
      const token = generateToken(newUser._id);

      res.cookie("token", token, cookieOptions);

      return res.status(201).json({
        success: true,
        message: "Account created and logged in successfully.",
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name || extractName(newUser.email),
          createdAt: newUser.createdAt,
        },
      });
    }

    // ── Returning user: verify password ───────────────────────────────────────
    const isMatch = await existingUser.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const token = generateToken(existingUser._id);

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name || extractName(existingUser.email),
        createdAt: existingUser.createdAt,
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
  // req.user is attached by the protect middleware
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name || extractName(req.user.email),
      createdAt: req.user.createdAt,
    },
  });
};

export const logout = (_req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully." });
};
