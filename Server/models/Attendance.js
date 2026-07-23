import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Stored as "YYYY-MM-DD" string for easy querying and to avoid timezone drift
    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"],
    },
    status: {
      type: String,
      enum: {
        values: ["present", "absent"],
        message: "Status must be either 'present' or 'absent'",
      },
      required: true,
    },
    // Optional note for context (late, half-day remark, etc.)
    note: {
      type: String,
      trim: true,
      maxlength: [200, "Note cannot exceed 200 characters"],
    },
    // Track who last marked/updated this record
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// One attendance record per user per date
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
