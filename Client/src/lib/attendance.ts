import api from './axios';

export type AttendanceStatus = 'present' | 'absent';

export interface MarkAttendancePayload {
  userId: string;
  date: string;        // "YYYY-MM-DD"
  status: AttendanceStatus;
  note?: string;
}

export interface AttendanceRecord {
  id: string;
  student: { id: string; name: string; studentId?: string };
  date: string;
  status: AttendanceStatus;
  note?: string;
  markedBy?: string;
  updatedAt: string;
}

// Shape returned by the server for a single attendance record in the records array
export interface RawAttendanceRecord {
  _id: string;
  user: string;
  date: string;        // "YYYY-MM-DD"
  status: AttendanceStatus;
  markedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserAttendanceSummary {
  totalWorkingDays: number;
  present: number;
  absent: number;
  unmarked: number;
  unmarkedDates: string[];   // "YYYY-MM-DD"
}

export interface UserAttendanceResponse {
  success: boolean;
  student: { id: string; name?: string; studentId?: string };
  summary: UserAttendanceSummary;
  records: RawAttendanceRecord[];
}

interface MarkAttendanceResponse {
  success: boolean;
  message: string;
  attendance: AttendanceRecord;
}

interface TodayAttendanceResponse {
  success: boolean;
  status: AttendanceStatus | 'unmarked';
  record: AttendanceRecord | null;
}

/**
 * POST /api/attendance/mark
 * Marks or updates a user's attendance for a given date.
 */
export async function markAttendance(
  payload: MarkAttendancePayload,
): Promise<AttendanceRecord> {
  const { data } = await api.post<MarkAttendanceResponse>(
    '/attendance/mark',
    payload,
  );
  return data.attendance;
}

/**
 * GET /api/attendance/user/:userId/date/:date
 * Returns the attendance status for a user on a specific date.
 */
export async function getTodayAttendance(
  userId: string,
  date: string,
): Promise<AttendanceStatus | 'unmarked'> {
  const { data } = await api.get<TodayAttendanceResponse>(
    `/attendance/user/${userId}/date/${date}`,
  );
  return data.status;
}

/**
 * GET /api/attendance/user/:userId
 * Returns all attendance records + summary for a user.
 * Optionally filter by ?month=M&year=YYYY.
 */
export async function getUserAttendance(
  userId: string,
  opts?: { month?: number; year?: number },
): Promise<UserAttendanceResponse> {
  const params = new URLSearchParams();
  if (opts?.month) params.set('month', String(opts.month));
  if (opts?.year)  params.set('year',  String(opts.year));
  const qs = params.toString();
  const { data } = await api.get<UserAttendanceResponse>(
    `/attendance/user/${userId}${qs ? `?${qs}` : ''}`,
  );
  return data;
}

// ── Attendance percentage ─────────────────────────────────────────────────────

export interface AttendancePercentageResponse {
  success: boolean;
  student: { id: string; name?: string; studentId?: string };
  attendanceWindow: { from: string; to: string };
  percentage: number;
  summary: {
    totalWorkingDays: number;
    presentDays: number;
    absentDays: number;
    unmarkedDays: number;
  };
  rules: {
    startingPercentage: number;
    absencePenalty: string;
    presenceReward: string;
    note: string;
  };
}

/**
 * GET /api/attendance/user/:userId/percentage
 * Returns the live attendance percentage for a user.
 * Optionally pass upToDate (YYYY-MM-DD) and breakdown flag.
 */
export async function getAttendancePercentage(
  userId: string,
  opts?: { upToDate?: string; breakdown?: boolean },
): Promise<AttendancePercentageResponse> {
  const params = new URLSearchParams();
  if (opts?.upToDate)  params.set('upToDate',  opts.upToDate);
  if (opts?.breakdown) params.set('breakdown', 'true');
  const qs = params.toString();
  const { data } = await api.get<AttendancePercentageResponse>(
    `/attendance/user/${userId}/percentage${qs ? `?${qs}` : ''}`,
  );
  return data;
}
