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
