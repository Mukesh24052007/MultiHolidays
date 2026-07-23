import Attendance from "../models/Attendance.js";
import LeaveRequest from "../models/LeaveRequest.js";
import User from "../models/User.js";
import {
  getWorkingDays,
  ATTENDANCE_START_DATE,
  calculateAttendancePercentage,
  parseDate,
  ABSENCE_PENALTY,
  PRESENCE_REWARD,
  todayStr,
} from "../utils/attendanceHelpers.js";

const SEMESTER_END = "2026-11-20";

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────

const resolveUser = async (userId) => {
  let user = null;
  if (userId.match(/^[a-f\d]{24}$/i)) user = await User.findById(userId);
  if (!user) user = await User.findOne({ studentId: userId.toUpperCase() });
  return user;
};

function nextCalendarDay(dateStr) {
  const d = parseDate(dateStr);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function getPreviousCalendarDay(dateStr) {
  const d = parseDate(dateStr);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

// ─────────────────────────────────────────────────────────────────────────────
// Core calculation — used by both the preview and the create endpoints
// Returns the full plan object without touching the database.
// ─────────────────────────────────────────────────────────────────────────────
async function computeLeavePlan(userId, startDate, endDate) {
  const today  = todayStr();
  const leaveDays = getWorkingDays(startDate, endDate);

  // Current live %
  let currentPercentage = 100;
  if (today >= ATTENDANCE_START_DATE) {
    const records = await Attendance.find({
      user: userId,
      date: { $gte: ATTENDANCE_START_DATE, $lte: today },
    }).sort({ date: 1 }).lean();
    const workingDays = getWorkingDays(ATTENDANCE_START_DATE, today);
    currentPercentage = calculateAttendancePercentage(records, workingDays).currentPercentage;
  }

  // Pre-leave recommended dates (tomorrow → day before leave)
  const tomorrow       = nextCalendarDay(today);
  const dayBeforeLeave = getPreviousCalendarDay(startDate);
  let recommendedBeforeDates = [];
  if (tomorrow <= dayBeforeLeave && dayBeforeLeave >= ATTENDANCE_START_DATE) {
    recommendedBeforeDates = getWorkingDays(tomorrow, dayBeforeLeave);
  }

  // % if all recommended pre-leave days are attended
  let percentageAtLeaveStart = currentPercentage;
  for (let i = 0; i < recommendedBeforeDates.length; i++) {
    percentageAtLeaveStart = Math.min(
      100,
      Math.round((percentageAtLeaveStart + PRESENCE_REWARD) * 100) / 100
    );
  }
  const preLeavePctGain =
    Math.round((percentageAtLeaveStart - currentPercentage) * 100) / 100;

  // % after leave absences
  let percentageAfterLeave = percentageAtLeaveStart;
  for (let i = 0; i < leaveDays.length; i++) {
    percentageAfterLeave = Math.max(
      0,
      Math.min(100, Math.round((percentageAfterLeave - ABSENCE_PENALTY) * 100) / 100)
    );
  }
  const totalDrop = Math.round((percentageAtLeaveStart - percentageAfterLeave) * 100) / 100;

  // Mandatory post-leave dates
  const recoveryDaysNeeded = totalDrop > 0 ? Math.ceil(totalDrop / PRESENCE_REWARD) : 0;
  const daysAfterLeave = getWorkingDays(nextCalendarDay(endDate), SEMESTER_END);
  const mandatoryDates = daysAfterLeave.slice(0, recoveryDaysNeeded);
  const recoverableFully = mandatoryDates.length === recoveryDaysNeeded;

  // % after completing all mandatory attendance
  let percentageAfterRecovery = percentageAfterLeave;
  for (let i = 0; i < mandatoryDates.length; i++) {
    percentageAfterRecovery = Math.min(
      100,
      Math.round((percentageAfterRecovery + PRESENCE_REWARD) * 100) / 100
    );
  }

  return {
    today,
    currentPercentage,
    leaveDays,
    recommendedBeforeDates,
    preLeavePctGain,
    percentageAtLeaveStart,
    percentageAfterLeave,
    totalDrop,
    recoveryDaysNeeded,
    mandatoryDates,
    recoverableFully,
    percentageAfterRecovery,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared input validation — returns { valid, endDate } or sends a 400 response
// ─────────────────────────────────────────────────────────────────────────────
function validateLeaveInput(req, res) {
  const { userId, startDate, endDate: rawEndDate } = req.body;
  const endDate = rawEndDate ?? startDate;

  if (!userId || !startDate) {
    res.status(400).json({ success: false, message: "userId and startDate are required." });
    return null;
  }

  const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;
  if (!ISO_RE.test(startDate) || !ISO_RE.test(endDate)) {
    res.status(400).json({ success: false, message: "Dates must be in YYYY-MM-DD format." });
    return null;
  }

  if (startDate > endDate) {
    res.status(400).json({ success: false, message: "startDate must be on or before endDate." });
    return null;
  }

  if (startDate < ATTENDANCE_START_DATE) {
    res.status(400).json({
      success: false,
      message: `Dates must be on or after the attendance start date (${ATTENDANCE_START_DATE}).`,
    });
    return null;
  }

  if (endDate > SEMESTER_END) {
    res.status(400).json({
      success: false,
      message: `Dates must be within the semester (up to ${SEMESTER_END}).`,
    });
    return null;
  }

  return { userId, startDate, endDate };
}

// ─────────────────────────────────────────────────────────────────────────────
// Build the shared response shape used by both preview and stored requests
// ─────────────────────────────────────────────────────────────────────────────
function buildResponsePayload(user, startDate, endDate, plan) {
  const {
    currentPercentage, leaveDays, recommendedBeforeDates, preLeavePctGain,
    percentageAtLeaveStart, percentageAfterLeave, totalDrop,
    recoveryDaysNeeded, mandatoryDates, recoverableFully, percentageAfterRecovery,
  } = plan;

  return {
    student: { id: user._id, name: user.name, studentId: user.studentId },
    leaveWindow: { startDate, endDate },
    workingDaysOnLeave: leaveDays,
    workingDaysOnLeaveCount: leaveDays.length,
    currentPercentage,
    recommendedBeforeLeave: {
      dates: recommendedBeforeDates,
      count: recommendedBeforeDates.length,
      percentageGainIfAttended: preLeavePctGain,
      percentageAtLeaveStartIfAttended: percentageAtLeaveStart,
      note: recommendedBeforeDates.length > 0
        ? `Attending these ${recommendedBeforeDates.length} day${recommendedBeforeDates.length > 1 ? "s" : ""} ` +
          `before your leave gains you +${preLeavePctGain}% and reduces your ` +
          `post-leave mandatory days from ` +
          `${Math.ceil((leaveDays.length * ABSENCE_PENALTY) / PRESENCE_REWARD)} to ${recoveryDaysNeeded}.`
        : "No working days available between today and the start of your leave.",
    },
    percentageAfterLeave,
    percentageDrop: totalDrop,
    recoveryDaysNeeded,
    mandatoryAttendanceDates: mandatoryDates,
    mandatoryAttendanceDatesCount: mandatoryDates.length,
    recoverableFully,
    percentageAfterRecovery,
    rules: {
      absencePenalty: `-${ABSENCE_PENALTY}% per absent working day`,
      presenceReward: `+${PRESENCE_REWARD}% per present day`,
      semesterEnd: SEMESTER_END,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/leave/check-recovery   (preview — no DB write)
//
// Runs the full calculation and returns the plan without saving anything.
// Use this to show the user what their leave will cost before they confirm.
//
// Body: { userId, startDate, endDate? }
// ─────────────────────────────────────────────────────────────────────────────
export const checkLeaveRecovery = async (req, res) => {
  try {
    const input = validateLeaveInput(req, res);
    if (!input) return;

    const { userId, startDate, endDate } = input;
    const user = await resolveUser(userId);
    if (!user) return res.status(404).json({ success: false, message: "Student not found." });

    const plan = await computeLeavePlan(user._id, startDate, endDate);

    if (plan.leaveDays.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No working days fall in this window — it covers only holidays.",
        ...buildResponsePayload(user, startDate, endDate, plan),
      });
    }

    return res.status(200).json({
      success: true,
      message: "Preview only — not saved. Use POST /api/leave to save this request.",
      ...buildResponsePayload(user, startDate, endDate, plan),
    });
  } catch (error) {
    console.error("checkLeaveRecovery error:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/leave   (create & persist a leave request)
//
// Runs the same calculation as check-recovery but also saves the request to
// the database so recovery progress can be tracked over time.
//
// Body: { userId, startDate, endDate?, label? }
// ─────────────────────────────────────────────────────────────────────────────
export const createLeaveRequest = async (req, res) => {
  try {
    const input = validateLeaveInput(req, res);
    if (!input) return;

    const { userId, startDate, endDate } = input;
    const { label } = req.body;

    const user = await resolveUser(userId);
    if (!user) return res.status(404).json({ success: false, message: "Student not found." });

    const plan = await computeLeavePlan(user._id, startDate, endDate);

    if (plan.leaveDays.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No working days fall in this window — nothing to track.",
      });
    }

    // Build the flat planDates array: recommended_before + leave + mandatory_after
    const planDates = [
      ...plan.recommendedBeforeDates.map((date) => ({ date, role: "recommended_before" })),
      ...plan.leaveDays.map((date)              => ({ date, role: "leave" })),
      ...plan.mandatoryDates.map((date)         => ({ date, role: "mandatory_after" })),
    ];

    // Upsert: if the same user/startDate/endDate already exists, update it
    const leaveRequest = await LeaveRequest.findOneAndUpdate(
      { user: user._id, startDate, endDate },
      {
        user: user._id,
        startDate,
        endDate,
        label: label?.trim() || undefined,
        snapshot: {
          currentPercentage:       plan.currentPercentage,
          percentageAtLeaveStart:  plan.percentageAtLeaveStart,
          percentageAfterLeave:    plan.percentageAfterLeave,
          percentageDrop:          plan.totalDrop,
          recoveryDaysNeeded:      plan.recoveryDaysNeeded,
          percentageAfterRecovery: plan.percentageAfterRecovery,
          recoverableFully:        plan.recoverableFully,
        },
        planDates,
        status: "planned",
        createdBy: req.user._id,
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    const isNew = leaveRequest.createdAt.getTime() === leaveRequest.updatedAt.getTime();

    return res.status(isNew ? 201 : 200).json({
      success: true,
      message: isNew ? "Leave request created and saved." : "Leave request updated.",
      leaveRequestId: leaveRequest._id,
      ...buildResponsePayload(user, startDate, endDate, plan),
    });
  } catch (error) {
    console.error("createLeaveRequest error:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// resolveProgress — enriches a stored LeaveRequest with live attendance data
//
// For each planDate we cross-reference the Attendance collection:
//   - recommended_before : attended | missed (if past) | upcoming (if future)
//   - leave              : on_leave (always — the user is on leave)
//   - mandatory_after    : attended | missed (if past) | pending (if future)
//
// Also derives the overall request status and a live recovery percentage.
// ─────────────────────────────────────────────────────────────────────────────
async function resolveProgress(leaveRequest, userObjectId) {
  const today = todayStr();

  // Fetch attendance records for all plan dates in one query
  const allPlanDateStrs = leaveRequest.planDates.map((p) => p.date);
  const attendanceRecords = await Attendance.find({
    user: userObjectId,
    date: { $in: allPlanDateStrs },
  }).lean();

  // Build a quick lookup: date → attendance status
  const attendanceMap = {};
  for (const r of attendanceRecords) {
    attendanceMap[r.date] = r.status; // "present" | "absent"
  }

  // Enrich each plan date with its live tracking status
  const enrichedDates = leaveRequest.planDates.map((p) => {
    const isPast   = p.date <= today;
    const isFuture = p.date > today;
    const attStatus = attendanceMap[p.date]; // "present" | "absent" | undefined

    let trackingStatus;

    if (p.role === "leave") {
      trackingStatus = "on_leave";
    } else if (p.role === "recommended_before") {
      if (isFuture) {
        trackingStatus = "upcoming";
      } else {
        trackingStatus = attStatus === "present" ? "attended" : "missed";
      }
    } else {
      // mandatory_after
      if (isFuture) {
        trackingStatus = "pending";
      } else {
        trackingStatus = attStatus === "present" ? "attended" : "missed";
      }
    }

    return { date: p.date, role: p.role, trackingStatus };
  });

  // Compute derived counts
  const mandatoryDates = enrichedDates.filter((d) => d.role === "mandatory_after");
  const preLeaveDates  = enrichedDates.filter((d) => d.role === "recommended_before");

  const mandatoryTotal   = mandatoryDates.length;
  const mandatoryPast    = mandatoryDates.filter((d) => d.trackingStatus !== "pending").length;
  const mandatoryAttended = mandatoryDates.filter((d) => d.trackingStatus === "attended").length;
  const mandatoryMissed  = mandatoryDates.filter((d) => d.trackingStatus === "missed").length;
  const mandatoryPending = mandatoryDates.filter((d) => d.trackingStatus === "pending").length;

  const preLeaveAttended = preLeaveDates.filter((d) => d.trackingStatus === "attended").length;
  const preLeaveMissed   = preLeaveDates.filter((d) => d.trackingStatus === "missed").length;
  const preLeaveUpcoming = preLeaveDates.filter((d) => d.trackingStatus === "upcoming").length;

  // Derive overall request status
  const { startDate, endDate } = leaveRequest;
  let overallStatus;

  if (leaveRequest.status === "cancelled") {
    overallStatus = "cancelled";
  } else if (today < startDate) {
    overallStatus = "planned";
  } else if (today <= endDate) {
    overallStatus = "active"; // currently on leave
  } else if (mandatoryTotal === 0) {
    overallStatus = "recovered"; // no recovery needed
  } else if (mandatoryPast === 0) {
    overallStatus = "active"; // leave done, recovery not started
  } else if (mandatoryAttended === mandatoryTotal) {
    overallStatus = "recovered";
  } else if (mandatoryPending === 0) {
    // All mandatory dates have passed — check if fully attended
    overallStatus = mandatoryMissed > 0 ? "incomplete" : "recovered";
  } else {
    overallStatus = "active"; // recovery in progress
  }

  // Live recovery % — simulate from snapshot percentageAfterLeave applying
  // only the mandatory days that were actually attended so far
  let livePercentage = leaveRequest.snapshot.percentageAfterLeave;
  for (const d of mandatoryDates) {
    if (d.trackingStatus === "attended") {
      livePercentage = Math.min(
        100,
        Math.round((livePercentage + PRESENCE_REWARD) * 100) / 100
      );
    }
  }

  // Recovery progress as a fraction of mandatory days attended
  const recoveryProgress =
    mandatoryTotal > 0
      ? Math.round((mandatoryAttended / mandatoryTotal) * 100)
      : 100;

  return {
    enrichedDates,
    overallStatus,
    livePercentage,
    recoveryProgress,
    progress: {
      mandatoryTotal,
      mandatoryAttended,
      mandatoryMissed,
      mandatoryPending,
      preLeaveTotal:    preLeaveDates.length,
      preLeaveAttended,
      preLeaveMissed,
      preLeaveUpcoming,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/leave/user/:userId
//
// List all leave requests for a user with live recovery progress on each.
// Query params: status  — filter by status (planned|active|recovered|incomplete|cancelled)
// ─────────────────────────────────────────────────────────────────────────────
export const getLeaveRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status }  = req.query;

    const user = await resolveUser(userId);
    if (!user) return res.status(404).json({ success: false, message: "Student not found." });

    const filter = { user: user._id };
    if (status) filter.status = status;

    const requests = await LeaveRequest.find(filter).sort({ startDate: -1 }).lean();

    // Enrich each request with live progress (parallel resolution)
    const enriched = await Promise.all(
      requests.map(async (lr) => {
        const progress = await resolveProgress(lr, user._id);
        return formatLeaveRequest(lr, progress);
      })
    );

    return res.status(200).json({
      success: true,
      student: { id: user._id, name: user.name, studentId: user.studentId },
      total: enriched.length,
      leaveRequests: enriched,
    });
  } catch (error) {
    console.error("getLeaveRequests error:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/leave/:id
//
// Get a single leave request by its MongoDB _id, with full live tracking data.
// ─────────────────────────────────────────────────────────────────────────────
export const getLeaveRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return res.status(400).json({ success: false, message: "Invalid leave request id." });
    }

    const lr = await LeaveRequest.findById(id).lean();
    if (!lr) {
      return res.status(404).json({ success: false, message: "Leave request not found." });
    }

    const user = await User.findById(lr.user);
    if (!user) return res.status(404).json({ success: false, message: "Student not found." });

    const progress = await resolveProgress(lr, user._id);

    return res.status(200).json({
      success: true,
      student: { id: user._id, name: user.name, studentId: user.studentId },
      leaveRequest: {
        ...formatLeaveRequest(lr, progress),
        // Full date-by-date breakdown only in the detail view
        planDates: progress.enrichedDates,
      },
    });
  } catch (error) {
    console.error("getLeaveRequestById error:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/leave/:id
//
// Cancel (soft-delete) a leave request by marking it as "cancelled".
// Hard-delete is not used so history is preserved.
// ─────────────────────────────────────────────────────────────────────────────
export const deleteLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return res.status(400).json({ success: false, message: "Invalid leave request id." });
    }

    const lr = await LeaveRequest.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );

    if (!lr) {
      return res.status(404).json({ success: false, message: "Leave request not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Leave request cancelled.",
      leaveRequestId: lr._id,
    });
  } catch (error) {
    console.error("deleteLeaveRequest error:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Utility: format a stored LeaveRequest + resolved progress into a clean shape
// ─────────────────────────────────────────────────────────────────────────────
function formatLeaveRequest(lr, progress) {
  return {
    id:        lr._id,
    label:     lr.label || null,
    leaveWindow: { startDate: lr.startDate, endDate: lr.endDate },
    status:    progress.overallStatus,

    // What was planned at creation time
    snapshot: lr.snapshot,

    // Live % after accounting for mandatory days actually attended so far
    livePercentage: progress.livePercentage,

    // 0–100 — how much of the mandatory recovery has been completed
    recoveryProgress: progress.recoveryProgress,

    // Counts broken out by phase and status
    progress: progress.progress,

    createdAt: lr.createdAt,
    updatedAt: lr.updatedAt,
  };
}
