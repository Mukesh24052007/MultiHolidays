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

// ── Leave recovery check ──────────────────────────────────────────────────────

export interface LeaveRecoveryResponse {
  success: boolean;
  student: { id: string; name?: string; studentId?: string };
  leaveWindow: { startDate: string; endDate: string };

  /** Working days inside the requested leave window */
  workingDaysOnLeave: string[];
  workingDaysOnLeaveCount: number;

  /** User's live attendance % right now (based on actual records up to today) */
  currentPercentage: number | null;

  /** % after every leave day is counted as absent (assumes pre-leave days attended) */
  percentageAfterLeave: number | null;

  /** Total percentage points lost to the leave */
  percentageDrop: number;

  /**
   * Phase 1 — RECOMMENDED (not mandatory): working days from tomorrow up to
   * the day before the leave starts. Attending these boosts % before the leave
   * and directly reduces how many post-leave mandatory days are needed.
   */
  recommendedBeforeLeave: {
    dates: string[];
    count: number;
    /** How much % is gained if all pre-leave days are attended */
    percentageGainIfAttended: number;
    /** What the % would be at leave-start if all pre-leave days are attended */
    percentageAtLeaveStartIfAttended: number | null;
    note: string;
  };

  /** Number of consecutive present days needed AFTER the leave to recover */
  recoveryDaysNeeded: number;

  /**
   * Phase 2 — MANDATORY: the exact "YYYY-MM-DD" dates the user must attend
   * after the leave to recover back to pre-leave baseline.
   */
  mandatoryAttendanceDates: string[];
  mandatoryAttendanceDatesCount: number;

  /** True when the semester has enough days remaining to recover fully */
  recoverableFully: boolean;

  /** % reached after completing all mandatory post-leave attendance */
  percentageAfterRecovery: number | null;

  /** Plain-English summary covering all three phases */
  summary: string;

  rules: {
    absencePenalty: string;
    presenceReward: string;
    semesterEnd: string;
  };
}

export interface CheckLeaveRecoveryPayload {
  userId: string;
  startDate: string; // "YYYY-MM-DD"
  endDate?: string;  // "YYYY-MM-DD" — omit for a single-day leave request
}

/**
 * POST /api/leave/check-recovery
 *
 * Given a leave date range, returns the mandatory attendance dates the user
 * must attend after the leave to recover their attendance percentage.
 * Preview only — no DB write.
 */
export async function checkLeaveRecovery(
  payload: CheckLeaveRecoveryPayload,
): Promise<LeaveRecoveryResponse> {
  const { data } = await api.post<LeaveRecoveryResponse>(
    '/leave/check-recovery',
    payload,
  );
  return data;
}

// ── Leave request CRUD ────────────────────────────────────────────────────────

export interface CreateLeavePayload {
  userId: string;
  startDate: string;   // "YYYY-MM-DD"
  endDate?: string;    // "YYYY-MM-DD" — omit for single-day
  label?: string;
}

export interface LeaveProgressCounts {
  mandatoryTotal: number;
  mandatoryAttended: number;
  mandatoryMissed: number;
  mandatoryPending: number;
  preLeaveTotal: number;
  preLeaveAttended: number;
  preLeaveMissed: number;
  preLeaveUpcoming: number;
}

export interface LeaveRequestSnapshot {
  currentPercentage: number;
  percentageAtLeaveStart: number;
  percentageAfterLeave: number;
  percentageDrop: number;
  recoveryDaysNeeded: number;
  percentageAfterRecovery: number;
  recoverableFully: boolean;
}

export type LeaveRequestStatus = 'planned' | 'active' | 'recovered' | 'incomplete' | 'cancelled';

export interface LeaveRequest {
  id: string;
  label: string | null;
  leaveWindow: { startDate: string; endDate: string };
  status: LeaveRequestStatus;
  snapshot: LeaveRequestSnapshot;
  livePercentage: number;
  recoveryProgress: number;   // 0–100
  progress: LeaveProgressCounts;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequestDetail extends LeaveRequest {
  planDates: Array<{
    date: string;
    role: 'recommended_before' | 'leave' | 'mandatory_after';
    trackingStatus: 'upcoming' | 'attended' | 'missed' | 'on_leave' | 'pending';
  }>;
}

interface CreateLeaveResponse extends LeaveRecoveryResponse {
  leaveRequestId: string;
}

interface GetLeaveRequestsResponse {
  success: boolean;
  student: { id: string; name?: string; studentId?: string };
  total: number;
  leaveRequests: LeaveRequest[];
}

interface GetLeaveRequestByIdResponse {
  success: boolean;
  student: { id: string; name?: string; studentId?: string };
  leaveRequest: LeaveRequestDetail;
}

/**
 * POST /api/leave
 * Same as check-recovery but saves the request to the DB for ongoing tracking.
 */
export async function createLeaveRequest(
  payload: CreateLeavePayload,
): Promise<CreateLeaveResponse> {
  const { data } = await api.post<CreateLeaveResponse>('/leave', payload);
  return data;
}

/**
 * GET /api/leave/user/:userId
 * All leave requests for a user with live recovery progress.
 * Optional: ?status=planned|active|recovered|incomplete|cancelled
 */
export async function getLeaveRequests(
  userId: string,
  status?: LeaveRequestStatus,
): Promise<GetLeaveRequestsResponse> {
  const qs = status ? `?status=${status}` : '';
  const { data } = await api.get<GetLeaveRequestsResponse>(`/leave/user/${userId}${qs}`);
  return data;
}

/**
 * GET /api/leave/:id
 * Single leave request with full date-by-date tracking breakdown.
 */
export async function getLeaveRequestById(
  id: string,
): Promise<GetLeaveRequestByIdResponse> {
  const { data } = await api.get<GetLeaveRequestByIdResponse>(`/leave/${id}`);
  return data;
}

/**
 * DELETE /api/leave/:id
 * Soft-cancels a leave request (sets status to "cancelled").
 */
export async function cancelLeaveRequest(id: string): Promise<void> {
  await api.delete(`/leave/${id}`);
}
