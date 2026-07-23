import { Router } from "express";
import { getProfile, updateProfile, changePassword } from "../controllers/profileController.js";
import protect from "../middlewares/protect.js";

const router = Router();

// All profile routes require authentication
router.use(protect);

// GET  /api/profile/me           — fetch full profile
router.get("/me", getProfile);

// PUT  /api/profile/me           — update name, studentId, course, year
router.put("/me", updateProfile);

// PUT  /api/profile/me/password  — change password
router.put("/me/password", changePassword);

export default router;
