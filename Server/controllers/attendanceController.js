import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import {
  validateAttendanceDate,
  getWorkingDays,
  todayStr,
  ATTENDANCE_START_DATE,
} from "../utils/attendanceHelpers.js";

// ─────────────────────────────────────────────────────────────────────────────
// Helper: resolve user by Mongo _id or studentId string
// ─────────────────────────────────────────────────────────────────────────────
const resolveUser = async (userId) => {
  // Try Mongo ObjectId first, then fall back to studentId
  let user = null;
  if (userId.match(/^[a-f\d]{24}$/i)) {
    user = await User.findById(userId);
  }
  if (!user) {
    user = await User.findOne({ studentId: userId.toUpperCase() });
  }
  return user;
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/attendance/mark
// Mark or update attendance for a single user on a single date.
//
// Body: { userId, date, status, note? }
// ─────────────────────────────────────────────────────────────────────────────
export const markAttendance = async (req, res) => {
  try {
    const { userId, date, status, note } = req.body;

    // ── Validate inputs ──────────────────────────────────────────────────────
    if (!userId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: "userId, date, and status are required.",
      });
    }

    const normalizedStatus = status.toLowerCase();
    if (!["present", "absent"].includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: "status must be 'present' or 'absent'.",
      });
    }

    // ── Validate date window & holiday rules ─────────────────────────────────
    const dateCheck = validateAttendanceDate(date);
    if (!dateCheck.valid) {
      return res.status(400).json({ success: false, message: dateCheck.message });
    }

    // ── Resolve user ─────────────────────────────────────────────────────────
    const user = await resolveUser(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    // ── Upsert attendance record ─────────────────────────────────────────────
    const attendance = await Attendance.findOneAndUpdate(
      { user: user._id, date },
      {
        status: normalizedStatus,
        note: note || undefined,
        markedBy: req.user._id,
      },
      { new: true, upsert: true, runValidators: true }
    );

    const isNew = attendance.createdAt.getTime() === attendance.updatedAt.getTime();

    return res.status(isNew ? 201 : 200).json({
      success: true,
      message: isNew
        ? "Attendance marked successfully."
        : "Attendance updated successfully.",
      attendance: {
        id: attendance._id,
        student: { id: user._id, name: user.name, studentId: user.studentId },
        date: attendance.date,
        status: attendance.status,
        note: attendance.note,
        markedBy: attendance.markedBy,
        updatedAt: attendance.updatedAt,
      },
    });
  } catch (error) {
    console.error("markAttendance error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/attendance/bulk-mark
// Mark attendance for multiple users on a single date at once.
//
// Body: { date, records: [{ userId, status, note? }] }
// ─────────────────────────────────────────────────────────────────────────────
export const bulkMarkAttendance = async (req, res) => {
  try {
    const { date, records } = req.body;

    if (!date || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({
        success: false,
        message: "date and a non-empty records array are required.",
      });
    }

    // ── Validate date ────────────────────────────────────────────────────────
    const dateCheck = validateAttendanceDate(date);
    if (!dateCheck.valid) {
      return res.status(400).json({ success: false, message: dateCheck.message });
    }

    const results = [];
    const errors = [];

    for (const record of records) {
      const { userId, status, note } = record;

      if (!userId || !status) {
        errors.push({ userId, reason: "userId and status are required." });
        continue;
      }

      const normalizedStatus = status.toLowerCase();
      if (!["present", "absent"].includes(normalizedStatus)) {
        errors.push({ userId, reason: "status must be 'present' or 'absent'." });
        continue;
      }

      const user = await resolveUser(userId);
      if (!user) {
        errors.push({ userId, reason: "Student not found." });
        continue;
      }

      const attendance = await Attendance.findOneAndUpdate(
        { user: user._id, date },
        {
          status: normalizedStatus,
          note: note || undefined,
          markedBy: req.user._id,
        },
        { new: true, upsert: true, runValidators: true }
      );

      results.push({
        student: { id: user._id, name: user.name, studentId: user.studentId },
        date: attendance.date,
        status: attendance.status,
        note: attendance.note,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Processed ${results.length} record(s).${errors.length ? ` ${errors.length} failed.` : ""}`,
      results,
      errors: errors.length ? errors : undefined,
    });
  } catch (error) {
    console.error("bulkMarkAttendance error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/attendance/user/:userId
// Get all attendance records for a user (optionally filtered by month/year).
//
// Query params: month (1-12), year (YYYY)
// ─────────────────────────────────────────────────────────────────────────────
export const getUserAttendance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { month, year } = req.query;

    const user = await resolveUser(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    // Build date range filter
    const filter = { user: user._id };

    if (year || month) {
      const y = year || new Date().getFullYear();
      const m = month ? String(month).padStart(2, "0") : null;

      if (m) {
        // Exact month filter: "YYYY-MM-"
        filter.date = { $regex: `^${y}-${m}-` };
      } else {
        // Full year filter
        filter.date = { $regex: `^${y}-` };
      }
    }

    const records = await Attendance.find(filter).sort({ date: 1 }).lean();

    // Build a working-day summary for the requested range
    const today = todayStr();
    const rangeStart = ATTENDANCE_START_DATE;
    const rangeEnd = today;
    const allWorkingDays = getWorkingDays(rangeStart, rangeEnd);

    // If filtering by month/year, narrow working days too
    let workingDaysInRange = allWorkingDays;
    if (year || month) {
      const y = year || String(new Date().getFullYear());
      const m = month ? String(month).padStart(2, "0") : null;
      workingDaysInRange = allWorkingDays.filter((d) =>
        m ? d.startsWith(`${y}-${m}-`) : d.startsWith(`${y}-`)
      );
    }

    const presentCount = records.filter((r) => r.status === "present").length;
    const absentCount = records.filter((r) => r.status === "absent").length;
    const unmarkedDays = workingDaysInRange.filter(
      (d) => !records.find((r) => r.date === d)
    );

    return res.status(200).json({
      success: true,
      student: { id: user._id, name: user.name, studentId: user.studentId },
      summary: {
        totalWorkingDays: workingDaysInRange.length,
        present: presentCount,
        absent: absentCount,
        unmarked: unmarkedDays.length,
        unmarkedDates: unmarkedDays,
      },
      records,
    });
  } catch (error) {
    console.error("getUserAttendance error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/attendance/date/:date
// Get attendance for ALL users on a specific date.
// ─────────────────────────────────────────────────────────────────────────────
export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Date must be in YYYY-MM-DD format.",
      });
    }

    // Allow viewing past records even before start date? No — enforce same window
    const dateCheck = validateAttendanceDate(date);
    if (!dateCheck.valid) {
      return res.status(400).json({ success: false, message: dateCheck.message });
    }

    const records = await Attendance.find({ date })
      .populate("user", "name studentId course")
      .sort({ "user.name": 1 })
      .lean();

    const activeUsers = await User.countDocuments({ isActive: true });

    return res.status(200).json({
      success: true,
      date,
      summary: {
        totalActiveStudents: activeUsers,
        marked: records.length,
        present: records.filter((r) => r.status === "present").length,
        absent: records.filter((r) => r.status === "absent").length,
        unmarked: activeUsers - records.length,
      },
      records,
    });
  } catch (error) {
    console.error("getAttendanceByDate error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/attendance/user/:userId/date/:date
// Get a single user's attendance record for a specific date.
// ─────────────────────────────────────────────────────────────────────────────
export const getUserAttendanceByDate = async (req, res) => {
  try {
    const { userId, date } = req.params;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Date must be in YYYY-MM-DD format.",
      });
    }

    const dateCheck = validateAttendanceDate(date);
    if (!dateCheck.valid) {
      return res.status(400).json({ success: false, message: dateCheck.message });
    }

    const user = await resolveUser(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    const record = await Attendance.findOne({ user: user._id, date }).lean();

    if (!record) {
      return res.status(200).json({
        success: true,
        student: { id: user._id, name: user.name, studentId: user.studentId },
        date,
        status: "unmarked",
        record: null,
      });
    }

    return res.status(200).json({
      success: true,
      student: { id: user._id, name: user.name, studentId: user.studentId },
      date,
      status: record.status,
      record,
    });
  } catch (error) {
    console.error("getUserAttendanceByDate error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/attendance/user/:userId/date/:date
// Remove an attendance record (resets to "unmarked" state).
// ─────────────────────────────────────────────────────────────────────────────
export const deleteAttendanceRecord = async (req, res) => {
  try {
    const { userId, date } = req.params;

    const dateCheck = validateAttendanceDate(date);
    if (!dateCheck.valid) {
      return res.status(400).json({ success: false, message: dateCheck.message });
    }

    const user = await resolveUser(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    const deleted = await Attendance.findOneAndDelete({ user: user._id, date });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "No attendance record found for the given user and date.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance record removed. Date is now unmarked.",
    });
  } catch (error) {
    console.error("deleteAttendanceRecord error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/attendance/working-days
// Returns all working days from start date up to today (useful for front-end calendar).
//
// Query params: month (1-12), year (YYYY)
// ─────────────────────────────────────────────────────────────────────────────
export const getWorkingDaysList = async (req, res) => {
  try {
    const { month, year } = req.query;
    const today = todayStr();

    let days = getWorkingDays(ATTENDANCE_START_DATE, today);

    if (year || month) {
      const y = year || String(new Date().getFullYear());
      const m = month ? String(month).padStart(2, "0") : null;
      days = days.filter((d) =>
        m ? d.startsWith(`${y}-${m}-`) : d.startsWith(`${y}-`)
      );
    }

    return res.status(200).json({
      success: true,
      startDate: ATTENDANCE_START_DATE,
      endDate: today,
      totalWorkingDays: days.length,
      workingDays: days,
    });
  } catch (error) {
    console.error("getWorkingDaysList error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};
