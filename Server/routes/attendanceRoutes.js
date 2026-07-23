import { Router } from "express";
import protect from "../middlewares/protect.js";
import {
  markAttendance,
  bulkMarkAttendance,
  getUserAttendance,
  getAttendanceByDate,
  getUserAttendanceByDate,
  deleteAttendanceRecord,
  getWorkingDaysList,
} from "../controllers/attendanceController.js";

const router = Router();

// All attendance routes require a valid JWT
router.use(protect);

// ── Mark / Edit ───────────────────────────────────────────────────────────────

// Mark or update a single student's attendance on a date
// POST /api/attendance/mark
// Body: { userId, date, status, note? }
router.post("/mark", markAttendance);

// Mark or update attendance for multiple students on a date in one shot
// POST /api/attendance/bulk-mark
// Body: { date, records: [{ userId, status, note? }] }
router.post("/bulk-mark", bulkMarkAttendance);

// ── Read ──────────────────────────────────────────────────────────────────────

// All working days from start date (2026-07-15) up to today
// GET /api/attendance/working-days?month=7&year=2026
router.get("/working-days", getWorkingDaysList);

// All attendance records for a student (filter by ?month=&year=)
// GET /api/attendance/user/:userId?month=7&year=2026
router.get("/user/:userId", getUserAttendance);

// A student's record for one specific date
// GET /api/attendance/user/:userId/date/:date
router.get("/user/:userId/date/:date", getUserAttendanceByDate);

// All students' records for a specific date
// GET /api/attendance/date/:date
router.get("/date/:date", getAttendanceByDate);

// ── Delete (reset to unmarked) ────────────────────────────────────────────────

// DELETE /api/attendance/user/:userId/date/:date
router.delete("/user/:userId/date/:date", deleteAttendanceRecord);

export default router;
