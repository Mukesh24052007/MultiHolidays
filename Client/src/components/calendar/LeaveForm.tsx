'use client';

export default function LeaveForm() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md space-y-md">
      <div className="space-y-sm">
        <label className="text-label-sm font-label-sm text-outline block">Leave Type</label>
        <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
          <option>Annual Leave</option>
          <option>Sick Leave</option>
          <option>Casual Leave</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-sm">
        <div className="space-y-sm">
          <label className="text-label-sm font-label-sm text-outline block">Start Date</label>
          <input
            type="date"
            defaultValue="2024-05-13"
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md text-on-surface"
          />
        </div>
        <div className="space-y-sm">
          <label className="text-label-sm font-label-sm text-outline block">End Date</label>
          <input
            type="date"
            defaultValue="2024-05-15"
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md text-on-surface"
          />
        </div>
      </div>
      <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold text-label-md hover:bg-surface-tint transition-colors active:scale-[0.98] duration-100">
        Check Eligibility
      </button>
    </div>
  );
}
