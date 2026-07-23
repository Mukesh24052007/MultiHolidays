'use client';

import { useEffect, useState, useCallback } from 'react';
import Icon from '@/components/ui/Icon';
import {
  getLeaveRequests, getLeaveRequestById, cancelLeaveRequest,
} from '@/lib/attendance';
import type { LeaveRequest, LeaveRequestDetail, LeaveRequestStatus } from '@/lib/attendance';

interface Props {
  userId: string;
  /** Bump this to trigger a refresh after a new leave is saved */
  refreshKey?: number;
}

const STATUS_META: Record<LeaveRequestStatus, { label: string; icon: string; ring: string; text: string; bg: string }> = {
  planned:    { label: 'Planned',    icon: 'schedule',      ring: 'border-blue-200',  text: 'text-blue-600',  bg: 'bg-blue-50'   },
  active:     { label: 'Active',     icon: 'play_circle',   ring: 'border-amber-200', text: 'text-amber-600', bg: 'bg-amber-50'  },
  recovered:  { label: 'Recovered',  icon: 'check_circle',  ring: 'border-green-200', text: 'text-green-600', bg: 'bg-green-50'  },
  incomplete: { label: 'Incomplete', icon: 'warning',       ring: 'border-red-200',   text: 'text-red-600',   bg: 'bg-red-50'    },
  cancelled:  { label: 'Cancelled',  icon: 'cancel',        ring: 'border-gray-200',  text: 'text-gray-400',  bg: 'bg-gray-50'   },
};

const ROLE_META = {
  recommended_before: { label: 'Attend before', icon: 'star',       color: 'text-amber-500' },
  leave:              { label: 'Leave day',     icon: 'event_busy',  color: 'text-primary'   },
  mandatory_after:    { label: 'Must attend',   icon: 'assignment_turned_in', color: 'text-green-600' },
} as const;

const TRACKING_DOT: Record<string, string> = {
  upcoming:  'bg-gray-300',
  pending:   'bg-gray-300',
  on_leave:  'bg-primary/60',
  attended:  'bg-green-500',
  missed:    'bg-red-500',
};

function fmt(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ── Detail drawer ─────────────────────────────────────────────────────────────
function LeaveDetailDrawer({
  leaveId, userId, onClose, onCancelled,
}: { leaveId: string; userId: string; onClose: () => void; onCancelled: () => void }) {
  const [data, setData]             = useState<LeaveRequestDetail | null>(null);
  const [loading, setLoading]       = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getLeaveRequestById(leaveId);
        if (!cancelled) setData(res.leaveRequest);
      } catch { if (!cancelled) setError('Could not load details.'); }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [leaveId]);

  async function handleCancel() {
    setCancelling(true);
    try {
      await cancelLeaveRequest(leaveId);
      onCancelled();
    } catch {
      setError('Could not cancel. Try again.');
      setConfirmCancel(false);
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
      role="dialog" aria-modal="true">
      <div className="relative w-full sm:max-w-[520px] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[88dvh] flex flex-col">
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-gray-100 shrink-0">
          <Icon name="event_note" filled className="text-primary text-[22px]" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {data?.label ?? 'Leave Request'}
            </h3>
            {data && (
              <p className="text-xs text-gray-500">
                {fmt(data.leaveWindow.startDate)}
                {data.leaveWindow.startDate !== data.leaveWindow.endDate && ` → ${fmt(data.leaveWindow.endDate)}`}
              </p>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100">
            <Icon name="close" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
          {loading && (
            <div className="space-y-3 animate-pulse">
              {[80, 60, 90, 50].map((w, i) => (
                <div key={i} className="h-4 rounded bg-gray-100" style={{ width: `${w}%` }} />
              ))}
            </div>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {data && (
            <>
              {/* Snapshot row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'Was',      value: data.snapshot.currentPercentage,       bg: 'bg-blue-50'  },
                  { label: 'Dropped',  value: data.snapshot.percentageAfterLeave,    bg: 'bg-red-50'   },
                  { label: 'Live Now', value: data.livePercentage,                   bg: 'bg-green-50' },
                ].map(c => (
                  <div key={c.label} className={`rounded-xl p-2 ${c.bg}`}>
                    <p className="text-[10px] text-gray-500 mb-1">{c.label}</p>
                    <p className={`text-sm font-bold ${c.value >= 75 ? 'text-green-700' : 'text-red-600'}`}>
                      {c.value.toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>

              {/* Recovery progress bar */}
              {data.progress.mandatoryTotal > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-600">Recovery progress</span>
                    <span className="text-xs text-gray-500">
                      {data.progress.mandatoryAttended}/{data.progress.mandatoryTotal} days
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${data.recoveryProgress}%` }} />
                  </div>
                  <div className="flex gap-3 mt-1.5 text-[10px] text-gray-400">
                    <span>✓ Attended: {data.progress.mandatoryAttended}</span>
                    <span>✗ Missed: {data.progress.mandatoryMissed}</span>
                    <span>○ Pending: {data.progress.mandatoryPending}</span>
                  </div>
                </div>
              )}

              {/* Date-by-date breakdown */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Date Breakdown</p>
                <div className="space-y-1">
                  {data.planDates.map(pd => {
                    const role = ROLE_META[pd.role];
                    const dot  = TRACKING_DOT[pd.trackingStatus] ?? 'bg-gray-200';
                    return (
                      <div key={pd.date + pd.role}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
                        <Icon name={role.icon} filled className={`text-[15px] shrink-0 ${role.color}`} />
                        <span className="text-xs text-gray-700 w-[68px] shrink-0">{fmt(pd.date)}</span>
                        <span className="text-xs text-gray-400 flex-1">{role.label}</span>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                        <span className="text-[10px] text-gray-400 capitalize w-16 text-right">
                          {pd.trackingStatus.replace('_', ' ')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {data && data.status !== 'cancelled' && data.status !== 'recovered' && (
          <div className="px-5 pb-5 pt-3 border-t border-gray-100 shrink-0">
            {confirmCancel ? (
              <div className="space-y-2">
                <p className="text-sm text-center text-gray-700 font-medium">Cancel this leave request?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmCancel(false)}
                    disabled={cancelling}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Keep it
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {cancelling
                      ? <><Icon name="progress_activity" className="animate-spin text-[15px]" />Cancelling…</>
                      : 'Yes, cancel'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmCancel(true)}
                className="w-full py-2.5 rounded-xl text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="cancel" className="text-[15px]" />
                Cancel Leave
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Leave request card ────────────────────────────────────────────────────────
function LeaveCard({ lr, onOpen }: { lr: LeaveRequest; onOpen: () => void }) {
  const meta = STATUS_META[lr.status];
  const multiDay = lr.leaveWindow.startDate !== lr.leaveWindow.endDate;

  return (
    <button onClick={onOpen} className={`w-full text-left rounded-xl border ${meta.ring} ${meta.bg} p-3 hover:brightness-95 active:scale-[0.98] transition-all`}>
      <div className="flex items-start gap-2">
        <Icon name={meta.icon} filled className={`text-[18px] shrink-0 mt-0.5 ${meta.text}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <p className="text-xs font-semibold text-gray-800 truncate">
              {lr.label ?? (multiDay
                ? `${fmt(lr.leaveWindow.startDate)} → ${fmt(lr.leaveWindow.endDate)}`
                : fmt(lr.leaveWindow.startDate))}
            </p>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${meta.ring} ${meta.text} ${meta.bg} shrink-0`}>
              {meta.label}
            </span>
          </div>
          {lr.label && (
            <p className="text-[10px] text-gray-400 mt-0.5">
              {multiDay
                ? `${fmt(lr.leaveWindow.startDate)} → ${fmt(lr.leaveWindow.endDate)}`
                : fmt(lr.leaveWindow.startDate)}
            </p>
          )}

          {/* Recovery bar — show for active/incomplete */}
          {(lr.status === 'active' || lr.status === 'incomplete') && lr.progress.mandatoryTotal > 0 && (
            <div className="mt-2">
              <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden border border-gray-200">
                <div className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${lr.recoveryProgress}%` }} />
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Recovery: {lr.progress.mandatoryAttended}/{lr.progress.mandatoryTotal} days
                · live {lr.livePercentage.toFixed(1)}%
              </p>
            </div>
          )}

          {/* Planned — show snapshot */}
          {lr.status === 'planned' && (
            <p className="text-[10px] text-gray-400 mt-1">
              Drop: −{lr.snapshot.percentageDrop}% · Recovery: {lr.snapshot.recoveryDaysNeeded} days needed
            </p>
          )}
        </div>
        <Icon name="chevron_right" className="text-gray-400 text-[18px] shrink-0 mt-0.5" />
      </div>
    </button>
  );
}

// ── Main LeaveTracker panel ───────────────────────────────────────────────────
export default function LeaveTracker({ userId, refreshKey = 0 }: Props) {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading]   = useState(true);
  const [openId, setOpenId]     = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLeaveRequests(userId);
      setRequests(res.leaveRequests);
    } catch {
      // silently ignore
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { load(); }, [load, refreshKey]);

  const active    = requests.filter(r => r.status === 'active');
  const planned   = requests.filter(r => r.status === 'planned');
  const past      = requests.filter(r => r.status === 'recovered' || r.status === 'incomplete' || r.status === 'cancelled');

  function Section({ title, items }: { title: string; items: LeaveRequest[] }) {
    if (items.length === 0) return null;
    return (
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{title}</p>
        <div className="space-y-2">
          {items.map(lr => (
            <LeaveCard key={String(lr.id)} lr={lr} onOpen={() => setOpenId(String(lr.id))} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {openId && (
        <LeaveDetailDrawer
          leaveId={openId}
          userId={userId}
          onClose={() => setOpenId(null)}
          onCancelled={() => { setOpenId(null); load(); }}
        />
      )}

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="history" filled className="text-primary text-[20px]" />
          <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Leave Tracker</h3>
          {!loading && requests.length > 0 && (
            <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {requests.filter(r => r.status !== 'cancelled').length}
            </span>
          )}
        </div>

        {loading && (
          <div className="space-y-2 animate-pulse">
            {[1, 2].map(i => <div key={i} className="h-14 rounded-xl bg-gray-100" />)}
          </div>
        )}

        {!loading && requests.length === 0 && (
          <div className="text-center py-6">
            <Icon name="event_available" className="text-gray-300 text-[36px] mx-auto" />
            <p className="text-xs text-gray-400 mt-2">No leave requests yet.</p>
            <p className="text-xs text-gray-400">Use "Check Leave" to plan one.</p>
          </div>
        )}

        {!loading && requests.length > 0 && (
          <div className="space-y-4">
            <Section title="On Leave / Recovery" items={active} />
            <Section title="Planned"             items={planned} />
            <Section title="Past"                items={past} />
          </div>
        )}
      </div>
    </>
  );
}
