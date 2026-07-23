'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { checkLeaveRecovery, createLeaveRequest } from '@/lib/attendance';
import type { LeaveRecoveryResponse } from '@/lib/attendance';

interface Props {
  userId: string;
  selectedDates: string[];   // sorted ISO dates
  onClose: () => void;
  /** Called after a leave is saved — passes the new leave request id and the saved dates */
  onSaved: (leaveRequestId: string, savedDates: string[]) => void;
}

type Step = 'preview' | 'checking' | 'result' | 'saving' | 'saved';

function fmt(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}
function fmtLong(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function PctPill({ value, className = '' }: { value: number | null; className?: string }) {
  if (value === null) return <span className="text-xs text-gray-400">—</span>;
  const ok = value >= 75;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold
      ${ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} ${className}`}>
      {value.toFixed(1)}%
    </span>
  );
}

export default function LeaveCheckModal({ userId, selectedDates, onClose, onSaved }: Props) {
  const [step, setStep]       = useState<Step>('preview');
  const [result, setResult]   = useState<LeaveRecoveryResponse | null>(null);
  const [label, setLabel]     = useState('');
  const [error, setError]     = useState<string | null>(null);

  const startDate = selectedDates[0];
  const endDate   = selectedDates.length > 1 ? selectedDates[selectedDates.length - 1] : undefined;

  async function handleCheck() {
    setStep('checking'); setError(null);
    try {
      const res = await checkLeaveRecovery({ userId, startDate, endDate });
      setResult(res);
      setStep('result');
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg ?? 'Something went wrong.'); setStep('preview');
    }
  }

  async function handleSave() {
    setStep('saving'); setError(null);
    try {
      const res = await createLeaveRequest({
        userId, startDate, endDate, label: label.trim() || undefined,
      });
      setStep('saved');
      onSaved(res.leaveRequestId, selectedDates);
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg ?? 'Could not save leave request.'); setStep('result');
    }
  }

  const isBusy = step === 'checking' || step === 'saving';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full sm:w-[560px] sm:max-w-[560px] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92dvh] flex flex-col overflow-hidden">

        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-start gap-3 px-6 pt-4 pb-3 border-b border-gray-100 shrink-0 w-full">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon name="event_available" filled className="text-primary text-[22px]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-gray-900">
              {step === 'saved' ? 'Leave Saved' : 'Leave Recovery Check'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {selectedDates.length === 1 ? fmtLong(startDate)
                : `${fmt(startDate)} → ${fmt(selectedDates[selectedDates.length - 1])} · ${selectedDates.length} day${selectedDates.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors shrink-0">
            <Icon name="close" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 w-full px-6 py-4 flex flex-col gap-4">

          {/* Selected date chips */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Selected Leave Days</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedDates.map(d => (
                <span key={d} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <Icon name="event_busy" filled className="text-[12px]" />{fmt(d)}
                </span>
              ))}
            </div>
          </div>

          {error && (
            <div className="flex gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
              <Icon name="error" className="text-red-500 text-[16px] shrink-0 mt-0.5" />{error}
            </div>
          )}

          {/* ── PREVIEW state ── */}
          {step === 'preview' && (
            <div className="w-full flex flex-col items-center gap-3 py-4 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name="query_stats" filled className="text-primary text-[28px]" />
              </div>
              <p className="text-sm text-gray-600 px-4">
                See how this leave affects your attendance and what you need to do to recover fully.
              </p>
            </div>
          )}

          {/* ── CHECKING skeleton ── */}
          {step === 'checking' && (
            <div className="w-full space-y-3 animate-pulse py-2">
              {[75, 55, 85, 45, 65].map((w, i) => (
                <div key={i} className="h-4 rounded bg-gray-100" style={{ width: `${w}%` }} />
              ))}
            </div>
          )}

          {/* ── RESULT / SAVING state ── */}
          {(step === 'result' || step === 'saving') && result && (
            <div className="w-full space-y-4">

              {/* % flow row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'Current',        value: result.currentPercentage,       color: 'bg-blue-50 border-blue-100',   text: 'text-blue-500' },
                  { label: 'After Leave',    value: result.percentageAfterLeave,    color: 'bg-red-50 border-red-100',     text: 'text-red-500',
                    sub: result.percentageDrop > 0 ? `−${result.percentageDrop}%` : null },
                  { label: 'After Recovery', value: result.percentageAfterRecovery, color: 'bg-green-50 border-green-100', text: 'text-green-600' },
                ].map(col => (
                  <div key={col.label} className={`rounded-xl border p-3 ${col.color}`}>
                    <p className={`text-[10px] font-semibold uppercase tracking-wide mb-1 ${col.text}`}>{col.label}</p>
                    <PctPill value={col.value} />
                    {col.sub && <p className="text-[10px] text-red-400 mt-0.5">{col.sub}</p>}
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-start gap-2">
                  <Icon name="info" filled className="text-primary text-[18px] shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">{result.summary}</p>
                </div>
              </div>

              {/* Recommended before */}
              {result.recommendedBeforeLeave.count > 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="star" filled className="text-amber-500 text-[18px]" />
                    <h4 className="text-sm font-semibold text-amber-800">
                      Attend before leave
                      <span className="ml-1.5 text-xs font-normal text-amber-600">
                        (+{result.recommendedBeforeLeave.percentageGainIfAttended}%)
                      </span>
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {result.recommendedBeforeLeave.dates.map(d => (
                      <span key={d} className="px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-xs text-amber-800 font-medium">
                        {fmt(d)}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-amber-700 leading-relaxed">{result.recommendedBeforeLeave.note}</p>
                </div>
              )}

              {/* Mandatory after */}
              {result.mandatoryAttendanceDatesCount > 0 && (
                <div className={`rounded-xl border p-4 ${result.recoverableFully ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={result.recoverableFully ? 'check_circle' : 'warning'} filled
                      className={`text-[18px] ${result.recoverableFully ? 'text-green-600' : 'text-red-500'}`} />
                    <h4 className={`text-sm font-semibold ${result.recoverableFully ? 'text-green-800' : 'text-red-800'}`}>
                      Must attend after leave
                      <span className="ml-1.5 text-xs font-normal opacity-70">
                        {result.mandatoryAttendanceDatesCount} day{result.mandatoryAttendanceDatesCount !== 1 ? 's' : ''}
                      </span>
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {result.mandatoryAttendanceDates.map(d => (
                      <span key={d} className={`px-2 py-0.5 rounded-md text-xs font-medium border
                        ${result.recoverableFully
                          ? 'bg-green-100 border-green-300 text-green-800'
                          : 'bg-red-100 border-red-300 text-red-800'}`}>
                        {fmt(d)}
                      </span>
                    ))}
                  </div>
                  {!result.recoverableFully && (
                    <p className="text-xs text-red-600 font-medium">⚠ Not enough remaining semester days to fully recover.</p>
                  )}
                </div>
              )}

              {/* Rules footnote */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 px-1">
                {[
                  { icon: 'remove_circle', label: result.rules.absencePenalty },
                  { icon: 'add_circle',    label: result.rules.presenceReward },
                  { icon: 'event',         label: `Semester ends ${result.rules.semesterEnd}` },
                ].map(r => (
                  <span key={r.label} className="text-xs text-gray-400 flex items-center gap-0.5">
                    <Icon name={r.icon} className="text-[12px]" />{r.label}
                  </span>
                ))}
              </div>

              {/* Label input before saving */}
              <div className="pt-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Label <span className="font-normal normal-case text-gray-400">(optional)</span>
                </label>
                <input
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  placeholder="e.g. Wedding trip, Medical leave…"
                  maxLength={60}
                  disabled={step === 'saving'}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:opacity-60"
                />
              </div>
            </div>
          )}

          {/* ── SAVED state ── */}
          {step === 'saved' && (
            <div className="flex flex-col items-center gap-3 py-6 text-center w-full">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Icon name="check_circle" filled className="text-green-500 text-[36px]" />
              </div>
              <p className="text-base font-semibold text-gray-800">Leave request saved!</p>
              <p className="text-sm text-gray-500 px-4">
                Your leave is now being tracked. Check the Leave Tracker panel to monitor your recovery progress.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-3 border-t border-gray-100 shrink-0 flex gap-3 w-full">
          {step === 'preview' && (
            <>
              <button onClick={onClose}
                className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleCheck}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-all active:scale-[0.97]">
                Check Leave
              </button>
            </>
          )}
          {(step === 'result' || step === 'saving') && (
            <>
              <button onClick={() => { setStep('preview'); setResult(null); setError(null); }}
                disabled={isBusy}
                className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
                Recheck
              </button>
              <button onClick={handleSave} disabled={isBusy}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-all active:scale-[0.97] disabled:opacity-60">
                {step === 'saving'
                  ? <span className="flex items-center justify-center gap-2">
                      <Icon name="progress_activity" className="animate-spin text-[16px]" />Saving…
                    </span>
                  : 'Save Leave'}
              </button>
            </>
          )}
          {step === 'saved' && (
            <button onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-all active:scale-[0.97]">
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
