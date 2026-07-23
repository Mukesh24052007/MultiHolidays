import mongoose from "mongoose";

// ─────────────────────────────────────────────────────────────────────────────
// LeaveRequest
//
// Stores a user's leave plan — the window they requested, the snapshot of the
// recovery plan calculated at request time, and the live tracking state of
// every recommended / mandatory date.
//
// Recovery progress is derived at read-time by cross-referencing the
// Attendance collection, so this document only needs to store the plan dates
// and their expected role (recommended_before | leave | mandatory_after).
// ─────────────────────────────────────────────────────────────────────────────

const trackingDateSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"],
    },
    // Role this date plays in the recovery plan
    role: {
      type: String,
      enum: ["recommended_before", "leave", "mandatory_after"],
      required: true,
    },
  },
  { _id: false }
);

const leaveRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ── Leave window ──────────────────────────────────────────────────────────
    startDate: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"],
    },
    endDate: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"],
    },

    // Optional label the user can set (e.g. "Festival trip", "Medical")
    label: {
      type: String,
      trim: true,
      maxlength: [100, "Label cannot exceed 100 characters"],
    },

    // ── Plan snapshot (calculated at request creation time) ───────────────────
    // These are the numbers at the moment the leave was planned.
    snapshot: {
      currentPercentage:            { type: Number, required: true },
      percentageAtLeaveStart:       { type: Number, required: true },
      percentageAfterLeave:         { type: Number, required: true },
      percentageDrop:               { type: Number, required: true },
      recoveryDaysNeeded:           { type: Number, required: true },
      percentageAfterRecovery:      { type: Number, required: true },
      recoverableFully:             { type: Boolean, required: true },
    },

    // ── Flat list of every date in the plan, tagged by role ───────────────────
    // recommended_before : pre-leave working days (attend to reduce post-leave needs)
    // leave              : the actual leave days (will be absent)
    // mandatory_after    : post-leave days the user must attend to recover
    planDates: {
      type: [trackingDateSchema],
      default: [],
    },

    // ── High-level status of the whole request ────────────────────────────────
    // planned    : created, leave hasn't started yet
    // active     : leave window is currently ongoing or recovery is in progress
    // recovered  : all mandatory dates attended — recovery complete
    // incomplete : some mandatory dates were missed — recovery failed
    // cancelled  : user deleted / cancelled the request
    status: {
      type: String,
      enum: ["planned", "active", "recovered", "incomplete", "cancelled"],
      default: "planned",
    },

    // Who created this request (the logged-in user, or an admin on their behalf)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Prevent duplicate leave requests for the exact same window per user
leaveRequestSchema.index({ user: 1, startDate: 1, endDate: 1 }, { unique: true });

const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);
export default LeaveRequest;
