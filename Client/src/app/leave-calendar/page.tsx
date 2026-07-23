'use client';

import { useEffect, useRef, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileHeader from '@/components/layout/MobileHeader';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import Icon from '@/components/ui/Icon';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import LeaveForm from '@/components/calendar/LeaveForm';
import LeaveSummaryCards from '@/components/calendar/LeaveSummaryCards';
import LeavePredictionCard from '@/components/calendar/LeavePredictionCard';
import { SEMESTER_MONTHS, WEEKDAY_HEADERS_SHORT, buildMonthsFromRecords } from '@/constants/calendar';
import { getMe } from '@/lib/auth';
import { getUserAttendance, markAttendance } from '@/lib/attendance';
import type { AttendanceStatus } from '@/lib/attendance';
import type { CalendarDay } from '@/types';

const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx7kbb9ys2eQvwxAU3cM-cn7Wkqdr3T4wGW1DisZUK9eILShpHUBKSg0AAkMvX6jLLHb-24h4lJUKyoo-nGtkJB9XZZ5GfW9KlyhpXEus2vIIDVzmdBM3aViljDASjhdYxoFqzZPr8BeF6I3unxUEJNFgKfJOddbCOJLNB4SDcYX1e5wgGjB_RV7U4BZXYEVQBolIZERIXSKPedMJMVzJerAfTGSkD8W-8soMD2__WBDEsRryjNz8ehQ';
const MOBILE_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwwHgDkQRyuvDQwxr7hfQTdodp_g4R3LZ0j4cl1WPgCux9Qa1xX_hMDR4g9N41MtSzu5nAj0uWgmFk-s1CQUVI9wnT_ygqWxPs05yXqLbGjghVbYAkyyXf0HSJg8RyS1EyhOyqBsTjXwQdtHafY_sAmJm1F-CRMyIofG5Q4bidYkPxsa7SDoDhngL9ShrkgJAOa7plx47sbsxVQONPGWrmNxckCT5IkdOSJZCw4CrbOix85HJ3HT2N2g';

type MonthEntry = typeof SEMESTER_MONTHS[number];

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatIsoForDisplay(iso: string) {
  const [y, m, d] = iso.split('-');
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ─── Mark-attendance modal (inline, for clicking past unmarked/marked days) ───
function MarkModal({
  date, userId, currentStatus, onMarked, onClose,
}: {
  date: string; userId: string;
  currentStatus: CalendarDay['status'];
  onMarked: (date: string, status: AttendanceStatus) => void;
  onClose: () => void;
}) {
  const isEdit = currentStatus === 'present' || currentStatus === 'absent';
  // Pre-select the existing value when editing
  const [selected, setSelected] = useState<AttendanceStatus | null>(
    isEdit ? (currentStatus as AttendanceStatus) : null
  );
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  async function handleSubmit() {
    if (!selected) return;
    setLoading(true); setError(null);
    try {
      await markAttendance({ userId, date, status: selected });
      onMarked(date, selected);
    } catch (e: unknown) {
      setError((e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog" aria-modal="true">
      <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-6 animate-slide-up">
        <button onClick={onClose} aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors">
          <Icon name="close" />
        </button>

        <div className="flex items-start gap-3 mb-5 pr-8">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isEdit ? 'bg-blue-100' : 'bg-amber-100'}`}>
            <Icon
              name={isEdit ? 'edit_note' : 'edit_calendar'}
              filled
              className={`text-[20px] ${isEdit ? 'text-blue-600' : 'text-amber-600'}`}
            />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {isEdit ? 'Edit Attendance' : 'Mark Attendance'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{formatIsoForDisplay(date)}</p>
            {isEdit && (
              <span className={`inline-flex items-center gap-1 mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                currentStatus === 'present'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-600'
              }`}>
                <Icon name={currentStatus === 'present' ? 'check_circle' : 'cancel'} filled className="text-[12px]" />
                Currently: {currentStatus}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {(['present', 'absent'] as AttendanceStatus[]).map(s => (
            <button key={s} onClick={() => { setSelected(s); setError(null); }}
              aria-pressed={selected === s}
              className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition-all active:scale-95
                ${selected === s
                  ? s === 'present' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-red-400 bg-red-50 shadow-sm'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selected === s
                  ? s === 'present' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  : s === 'present' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                <Icon name={s === 'present' ? 'check_circle' : 'cancel'} filled className="text-[24px]" />
              </div>
              <span className={`text-sm font-semibold capitalize ${
                selected === s ? (s === 'present' ? 'text-green-600' : 'text-red-500') : 'text-gray-700'}`}>
                {s}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="flex gap-2 mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            <Icon name="error" className="text-red-500 text-[16px] shrink-0 mt-0.5" />{error}
          </div>
        )}

        <button onClick={handleSubmit}
          disabled={!selected || loading || (isEdit && selected === currentStatus)}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
            selected && !loading && !(isEdit && selected === currentStatus)
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
          {loading
            ? <span className="flex items-center justify-center gap-2">
                <Icon name="progress_activity" className="animate-spin text-[16px]" />Saving…
              </span>
            : isEdit ? 'Update Attendance' : 'Confirm'}
        </button>

        {isEdit && selected === currentStatus && (
          <p className="text-xs text-gray-400 text-center mt-2">
            Select a different status to update.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CalendarPage() {
  const [monthIndex, setMonthIndex]   = useState(0);
  const [months, setMonths]           = useState<MonthEntry[]>(SEMESTER_MONTHS);
  const [userId, setUserId]           = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  // Modal state: which date was clicked + its current status
  const [modalDate, setModalDate]     = useState<string | null>(null);
  const [modalStatus, setModalStatus] = useState<CalendarDay['status']>('unmarked');

  // ── Fetch all attendance records once on mount ─────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const user = await getMe();
        if (cancelled) return;
        setUserId(user.id);
        const res = await getUserAttendance(user.id);
        if (cancelled) return;
        setMonths(buildMonthsFromRecords(res.records));
      } catch {
        // silently fallback to static months
      } finally {
        if (!cancelled) setLoadingData(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ── When a day is marked via the modal, patch just that cell ──────────────
  function handleMarked(date: string, status: AttendanceStatus) {
    setMonths(prev => prev.map(m => ({
      ...m,
      days: m.days.map(d => {
        if (d.day === null) return d;
        const [y, mo, day] = date.split('-');
        const iso = `${m.year}-${String(m.month).padStart(2,'0')}-${String(d.day).padStart(2,'0')}`;
        return iso === `${y}-${mo}-${day}` ? { ...d, status } : d;
      }),
    })));
    setModalDate(null);
  }

  function handleDayClick(iso: string, status: CalendarDay['status']) {
    // Allow marking/editing any past day that isn't a holiday or upcoming
    if (status === 'holiday' || status === 'empty' || status === 'upcoming') return;
    // Don't open modal for today — use the dashboard popup instead
    if (iso === getTodayKey()) return;
    setModalStatus(status);
    setModalDate(iso);
  }

  const current       = months[monthIndex];
  const canGoBack     = monthIndex > 0;
  const canGoFwd      = monthIndex < months.length - 1;
  const presentCount  = current.days.filter(d => d.status === 'present').length;
  const absentCount   = current.days.filter(d => d.status === 'absent').length;
  const unmarkedCount = current.days.filter(d => d.status === 'unmarked').length;
  const workedDays    = presentCount + absentCount;
  const attendancePct = workedDays > 0 ? Math.round((presentCount / workedDays) * 100) : 0;

  return (
    <div className="w-full min-h-screen">
      {/* Mark / Edit attendance modal */}
      {modalDate && userId && (
        <MarkModal
          date={modalDate}
          userId={userId}
          currentStatus={modalStatus}
          onMarked={handleMarked}
          onClose={() => setModalDate(null)}
        />
      )}

      {/* ══ MOBILE ══ */}
      <div className="block md:hidden bg-background text-on-surface">
        <MobileHeader userAvatar={MOBILE_AVATAR} userName="Alex" />
        <main className="pt-20 pb-24 px-4 min-h-screen">
          <div className="max-w-[448px] mx-auto space-y-4">

            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 animate-fade-in">
              {/* Month nav */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-on-surface">{current.label}</h2>
                <div className="flex gap-1">
                  <button onClick={() => canGoBack && setMonthIndex(i => i - 1)} disabled={!canGoBack}
                    aria-label="Previous month"
                    className="p-2 hover:bg-surface-container-low rounded-full disabled:opacity-30 transition-opacity">
                    <Icon name="chevron_left" className="text-on-surface-variant" />
                  </button>
                  <button onClick={() => canGoFwd && setMonthIndex(i => i + 1)} disabled={!canGoFwd}
                    aria-label="Next month"
                    className="p-2 hover:bg-surface-container-low rounded-full disabled:opacity-30 transition-opacity">
                    <Icon name="chevron_right" className="text-on-surface-variant" />
                  </button>
                </div>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 mb-1">
                {WEEKDAY_HEADERS_SHORT.map((d, i) => (
                  <div key={i} className="text-center text-xs text-outline py-2">{d}</div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-y-1">
                {current.days.map((day, i) => {
                  if (day.day === null) return <div key={i} />;
                  const { status } = day;
                  const isHoliday = status === 'holiday';
                  const isUnmarked = status === 'unmarked';
                  const isToday   = status === 'today';
                  const isPresent = status === 'present';
                  const isAbsent  = status === 'absent';

                  const iso = `${current.year}-${String(current.month).padStart(2,'0')}-${String(day.day).padStart(2,'0')}`;

                  return (
                    <div key={i} onClick={() => handleDayClick(iso, status)}
                      className={`relative flex flex-col items-center justify-center py-1.5 text-sm rounded-lg overflow-hidden
                        ${isHoliday  ? 'cursor-not-allowed' :
                          isUnmarked ? 'cursor-pointer bg-amber-50 border border-amber-400' :
                          isToday    ? 'bg-primary/10 text-primary font-bold border border-primary/30' :
                          isAbsent   ? 'bg-error-container/30 cursor-pointer' :
                          isPresent  ? 'cursor-pointer' : 'cursor-pointer'}`}>
                      {isHoliday && (
                        <div aria-hidden="true" className="absolute inset-0 rounded-lg"
                          style={{ background: 'repeating-linear-gradient(45deg,#f9fafb,#f9fafb 3px,#e5e7eb 3px,#e5e7eb 6px)' }} />
                      )}
                      <span className={`relative z-10 ${isHoliday ? 'text-gray-300 font-semibold' : isPresent || isUnmarked ? 'font-semibold' : ''} ${isUnmarked ? 'text-amber-700' : ''}`}>
                        {day.day}
                      </span>
                      {isPresent  && <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-0.5" />}
                      {isAbsent   && <span className="w-1.5 h-1.5 rounded-full bg-error mt-0.5" />}
                      {isToday    && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />}
                      {isUnmarked && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />}
                    </div>
                  );
                })}
              </div>

              {/* Stats strip */}
              <div className="mt-4 pt-3 border-t border-outline-variant grid grid-cols-4 text-center">
                <div><p className="text-xs text-on-surface-variant">Present</p><p className="text-base font-bold text-tertiary">{presentCount}</p></div>
                <div><p className="text-xs text-on-surface-variant">Absent</p><p className="text-base font-bold text-error">{absentCount}</p></div>
                <div><p className="text-xs text-on-surface-variant">Unmarked</p><p className="text-base font-bold text-amber-500">{unmarkedCount}</p></div>
                <div><p className="text-xs text-on-surface-variant">Rate</p><p className="text-base font-bold text-primary">{attendancePct}%</p></div>
              </div>
            </section>

            {/* Month pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {months.map((m, i) => (
                <button key={m.label} onClick={() => setMonthIndex(i)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    i === monthIndex ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}>
                  {m.label.split(' ')[0]}
                </button>
              ))}
            </div>

            <LeaveForm />
            <LeaveSummaryCards />
            <LeavePredictionCard />
          </div>
        </main>
        <BottomNav activeHref="/leave-calendar" />
      </div>

      {/* ══ DESKTOP ══ */}
      <div className="hidden md:block bg-surface">
        <Sidebar activeHref="/leave-calendar" />
        <TopBar title="Leave Calendar" userName="Alex Chen" userAvatar={USER_AVATAR} />

        <main className="ml-[280px] mt-16 p-8 pb-16 min-h-[calc(100vh-64px)]">
          <div className="max-w-[1280px] mx-auto">

            {/* Action bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex items-center gap-2 flex-wrap">
                {months.map((m, i) => (
                  <button key={m.label} onClick={() => setMonthIndex(i)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                      i === monthIndex
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant border border-outline-variant hover:bg-surface-container'}`}>
                    {m.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant p-1 rounded-xl shadow-sm w-full md:w-auto shrink-0">
                <div className="relative flex-grow">
                  <Icon name="date_range" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input type="number" placeholder="Days of leave needed…"
                    className="pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-body-md w-full md:w-56 placeholder:text-outline" />
                </div>
                <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-on-primary-fixed-variant transition-colors">Check</button>
              </div>
            </div>

            {/* Unmarked alert banner */}
            {!loadingData && unmarkedCount > 0 && (
              <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <Icon name="pending_actions" filled className="text-amber-500 text-[22px] shrink-0" />
                <p className="text-sm text-amber-800 flex-1">
                  <span className="font-semibold">{unmarkedCount} day{unmarkedCount > 1 ? 's' : ''}</span> in {current.label} still unmarked.
                  Click any <span className="font-semibold text-amber-600">amber cell</span> on the calendar to mark it.
                </p>
              </div>
            )}

            {/* Calendar + sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <CalendarGrid
                  month={current.label}
                  days={current.days}
                  onPrev={canGoBack ? () => setMonthIndex(i => i - 1) : undefined}
                  onNext={canGoFwd  ? () => setMonthIndex(i => i + 1) : undefined}
                  onDayClick={handleDayClick}
                />
              </div>

              <div className="lg:col-span-4 space-y-6">
                {/* Live stats card */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-4">
                    {current.label} — Stats
                    {loadingData && <span className="ml-2 text-xs font-normal text-outline animate-pulse">loading…</span>}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-tertiary">{presentCount}</p>
                      <p className="text-xs text-on-surface-variant mt-1">Present</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-error">{absentCount}</p>
                      <p className="text-xs text-on-surface-variant mt-1">Absent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-500">{unmarkedCount}</p>
                      <p className="text-xs text-on-surface-variant mt-1">Unmarked</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{attendancePct}%</p>
                      <p className="text-xs text-on-surface-variant mt-1">Rate</p>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${attendancePct}%` }} />
                  </div>
                </div>

                <LeaveSummaryCards />
                <LeavePredictionCard />

                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Leave Balance</h3>
                  {[
                    { label: 'Annual Leave', used: 5, total: 20, color: 'bg-primary' },
                    { label: 'Sick Leave',   used: 2, total: 10, color: 'bg-error' },
                    { label: 'Casual Leave', used: 1, total: 5,  color: 'bg-tertiary' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-on-surface">{item.label}</span>
                        <span className="text-xs text-on-surface-variant">{item.used}/{item.total} days</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div className={`${item.color} h-full rounded-full`} style={{ width: `${(item.used / item.total) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer offsetLeft />
      </div>
    </div>
  );
}
