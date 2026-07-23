/**
 * Attendance business-rule helpers
 *
 * Holiday rules (no attendance expected):
 *  - Every Sunday (day index 0)
 *  - 1st Saturday of each month (day index 6, occurrence = 1)
 *  - 3rd Saturday of each month (day index 6, occurrence = 3)
 *
 * Valid date window:
 *  - Start : 2026-07-15
 *  - End   : today (the current date at the time of the call)
 */

export const ATTENDANCE_START_DATE = "2026-07-15";

/**
 * Returns a Date object representing the date portion only (midnight UTC)
 * from a "YYYY-MM-DD" string, avoiding local-timezone drift.
 */
export const parseDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

/**
 * Returns today's date as a "YYYY-MM-DD" string (server local date).
 */
export const todayStr = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/**
 * Returns the occurrence number of a weekday within its month.
 * e.g. the 2nd Saturday → 2
 */
const weekdayOccurrence = (dateUTC) => {
  const dayOfMonth = dateUTC.getUTCDate(); // 1-based
  return Math.ceil(dayOfMonth / 7);
};

/**
 * Returns true if the given "YYYY-MM-DD" date is a holiday:
 *  - Sunday
 *  - 1st Saturday
 *  - 3rd Saturday
 */
export const isHoliday = (dateStr) => {
  const d = parseDate(dateStr);
  const dow = d.getUTCDay(); // 0 = Sunday, 6 = Saturday

  if (dow === 0) return true; // Sunday

  if (dow === 6) {
    const occurrence = weekdayOccurrence(d);
    if (occurrence === 1 || occurrence === 3) return true; // 1st or 3rd Saturday
  }

  return false;
};

/**
 * Validates whether a given "YYYY-MM-DD" string is a valid, editable attendance date.
 *
 * Returns { valid: true } or { valid: false, message: string }
 */
export const validateAttendanceDate = (dateStr) => {
  // 1. Format check
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { valid: false, message: "Date must be in YYYY-MM-DD format." };
  }

  const today = todayStr();

  // 2. Must not be in the future
  if (dateStr > today) {
    return {
      valid: false,
      message: `Cannot mark attendance for a future date. Today is ${today}.`,
    };
  }

  // 3. Must be on or after the start date
  if (dateStr < ATTENDANCE_START_DATE) {
    return {
      valid: false,
      message: `Attendance tracking starts from ${ATTENDANCE_START_DATE}.`,
    };
  }

  // 4. Must not be a holiday
  if (isHoliday(dateStr)) {
    return {
      valid: false,
      message: `${dateStr} is a holiday (Sunday or 1st/3rd Saturday). No attendance required.`,
    };
  }

  return { valid: true };
};

/**
 * Generates all working days (non-holiday) between startStr and endStr inclusive.
 * Both params are "YYYY-MM-DD" strings.
 */
export const getWorkingDays = (startStr, endStr) => {
  const days = [];
  const start = parseDate(startStr);
  const end = parseDate(endStr);

  const cursor = new Date(start);
  while (cursor <= end) {
    const y = cursor.getUTCFullYear();
    const m = String(cursor.getUTCMonth() + 1).padStart(2, "0");
    const d = String(cursor.getUTCDate()).padStart(2, "0");
    const str = `${y}-${m}-${d}`;

    if (!isHoliday(str)) days.push(str);

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return days;
};

// ─────────────────────────────────────────────────────────────────────────────
// Attendance Percentage Calculation
//
// Rules:
//   - Starts at 100% on the very first working day
//   - Each absence  → -3%   (applied immediately on that day)
//   - Each presence → +0.5% (applied immediately on that day)
//   - Clamped to [0, 100]
//
// Working days with no attendance record yet are treated as "unmarked" and do
// NOT change the running percentage (we only apply deltas for marked days).
// ─────────────────────────────────────────────────────────────────────────────

export const ABSENCE_PENALTY  = 3;    // percentage points deducted per absence
export const PRESENCE_REWARD  = 0.5;  // percentage points added per presence

/**
 * Given a sorted array of attendance records and the full list of working days
 * up to today, returns:
 *   - currentPercentage   : the live attendance %
 *   - breakdown           : day-by-day log showing delta and running total
 *   - totalWorkingDays
 *   - presentDays
 *   - absentDays
 *   - unmarkedDays
 *
 * @param {Array<{date: string, status: "present"|"absent"}>} records  – sorted by date asc
 * @param {string[]} workingDays  – all working days from start through today, sorted asc
 */
export const calculateAttendancePercentage = (records, workingDays) => {
  // Build a quick lookup: date → status
  const statusMap = {};
  for (const r of records) {
    statusMap[r.date] = r.status;
  }

  let percentage = 100;
  let presentDays  = 0;
  let absentDays   = 0;
  let unmarkedDays = 0;

  const breakdown = workingDays.map((date) => {
    const status = statusMap[date] ?? "unmarked";
    let delta = 0;

    if (status === "absent") {
      delta = -ABSENCE_PENALTY;
      absentDays++;
    } else if (status === "present") {
      delta = +PRESENCE_REWARD;
      presentDays++;
    } else {
      unmarkedDays++;
    }

    percentage = Math.min(100, Math.max(0, percentage + delta));

    return {
      date,
      status,
      delta,
      // Round to 2 decimal places to avoid floating-point noise
      percentageAfter: Math.round(percentage * 100) / 100,
    };
  });

  return {
    currentPercentage: Math.round(percentage * 100) / 100,
    totalWorkingDays: workingDays.length,
    presentDays,
    absentDays,
    unmarkedDays,
    breakdown,
  };
};
