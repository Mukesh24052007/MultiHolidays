import { Router } from "express";
import { login, getMe, logout } from "../controllers/authController.js";
import protect from "../middlewares/protect.js";

const router = Router();

// POST /api/auth/login   — auto-registers on first use, signs in on subsequent calls
router.post("/login", login);

// GET  /api/auth/me      — returns current admin info (requires valid JWT)
router.get("/me", protect, getMe);

// POST /api/auth/logout  — clears the auth cookie
router.post("/logout", logout);

export default router;
