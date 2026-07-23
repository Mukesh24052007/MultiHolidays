import { Router } from "express";
import protect from "../middlewares/protect.js";
import {
  checkLeaveRecovery,
  createLeaveRequest,
  getLeaveRequests,
  getLeaveRequestById,
  deleteLeaveRequest,
} from "../controllers/leaveController.js";

const router = Router();

// All leave routes require a valid JWT
router.use(protect);

// ── Preview (no DB write) ─────────────────────────────────────────────────────
// Run the full leave-recovery calculation and return the plan without saving.
// Use this to show the user what their leave will cost before they confirm.
//
// POST /api/leave/check-recovery
// Body: { userId, startDate, endDate? }
router.post("/check-recovery", checkLeaveRecovery);

// ── Create & persist ──────────────────────────────────────────────────────────
// Same calculation as check-recovery but saves the request so recovery
// progress can be tracked over time.  Re-POSTing the same window upserts it.
//
// POST /api/leave
// Body: { userId, startDate, endDate?, label? }
router.post("/", createLeaveRequest);

// ── Read ──────────────────────────────────────────────────────────────────────
// All leave requests for a user, each with live recovery progress.
// Optional filter: ?status=planned|active|recovered|incomplete|cancelled
//
// GET /api/leave/user/:userId
router.get("/user/:userId", getLeaveRequests);

// Single leave request with full date-by-date tracking breakdown.
//
// GET /api/leave/:id
router.get("/:id", getLeaveRequestById);

// ── Cancel ────────────────────────────────────────────────────────────────────
// Soft-cancels a leave request (sets status to "cancelled").
//
// DELETE /api/leave/:id
router.delete("/:id", deleteLeaveRequest);

export default router;
