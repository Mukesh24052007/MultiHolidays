import type { Metadata } from 'next';
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
import { OCTOBER_2024, WEEKDAY_HEADERS_SHORT } from '@/constants/calendar';

const USER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDx7kbb9ys2eQvwxAU3cM-cn7Wkqdr3T4wGW1DisZUK9eILShpHUBKSg0AAkMvX6jLLHb-24h4lJUKyoo-nGtkJB9XZZ5GfW9KlyhpXEus2vIIDVzmdBM3aViljDASjhdYxoFqzZPr8BeF6I3unxUEJNFgKfJOddbCOJLNB4SDcYX1e5wgGjB_RV7U4BZXYEVQBolIZERIXSKPedMJMVzJerAfTGSkD8W-8soMD2__WBDEsRryjNz8ehQ';

const MOBILE_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBwwHgDkQRyuvDQwxr7hfQTdodp_g4R3LZ0j4cl1WPgCux9Qa1xX_hMDR4g9N41MtSzu5nAj0uWgmFk-s1CQUVI9wnT_ygqWxPs05yXqLbGjghVbYAkyyXf0HSJg8RyS1EyhOyqBsTjXwQdtHafY_sAmJm1F-CRMyIofG5Q4bidYkPxsa7SDoDhngL9ShrkgJAOa7plx47sbsxVQONPGWrmNxckCT5IkdOSJZCw4CrbOix85HJ3HT2N2g';

// Simple mobile calendar using the short-header variant
const MAY_2024_MOBILE = [
  { day: null, status: 'empty' as const }, { day: null, status: 'empty' as const },
  { day: 1, status: 'present' as const }, { day: 2, status: 'upcoming' as const },
  { day: 3, status: 'upcoming' as const }, { day: 4, status: 'weekend' as const },
  { day: 5, status: 'weekend' as const }, { day: 6, status: 'present' as const },
  { day: 7, status: 'upcoming' as const }, { day: 8, status: 'absent' as const },
  { day: 9, status: 'upcoming' as const }, { day: 10, status: 'upcoming' as const },
  { day: 11, status: 'weekend' as const }, { day: 12, status: 'weekend' as const },
  { day: 13, status: 'today' as const }, { day: 14, status: 'upcoming' as const },
  { day: 15, status: 'upcoming' as const }, { day: 16, status: 'upcoming' as const },
  { day: 17, status: 'upcoming' as const }, { day: 18, status: 'weekend' as const },
  { day: 19, status: 'weekend' as const },
];

export const metadata: Metadata = {
  title: 'Leave Calendar — MultiHolidays',
  description: 'View and plan your academic leave with the MultiHolidays calendar.',
};

export default function CalendarPage() {
  return (
    <div className="w-full min-h-screen">
      {/* ── Mobile ── */}
      <div className="block md:hidden bg-background text-on-surface">
        <MobileHeader userAvatar={MOBILE_AVATAR} userName="Alex" />

        <main className="pt-20 pb-24 px-sm min-h-screen">
          <div className="max-w-[448px] mx-auto space-y-sm">

            {/* Mobile calendar */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md animate-fade-in">
              <div className="flex justify-between items-center mb-md">
                <h2 className="text-headline-md font-headline-md text-on-surface">May 2024</h2>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-surface-container-low rounded-full">
                    <Icon name="chevron_left" className="text-on-surface-variant" />
                  </button>
                  <button className="p-2 hover:bg-surface-container-low rounded-full">
                    <Icon name="chevron_right" className="text-on-surface-variant" />
                  </button>
                </div>
              </div>

              {/* Weekday row */}
              <div className="grid grid-cols-7 mb-xs">
                {WEEKDAY_HEADERS_SHORT.map((d, i) => (
                  <div key={i} className="text-center text-label-sm font-label-sm text-outline py-2">{d}</div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-y-2">
                {MAY_2024_MOBILE.map((day, i) => {
                  if (day.day === null) {
                    return <div key={i} className="text-center py-2 text-outline/30 text-label-md" />;
                  }
                  const isToday = day.status === 'today';
                  const isWeekend = day.status === 'weekend';
                  return (
                    <div
                      key={i}
                      className={`relative flex flex-col items-center justify-center py-2 text-label-md rounded-lg ${
                        isToday
                          ? 'bg-primary/10 text-primary font-bold border border-primary/20'
                          : isWeekend
                          ? 'bg-surface-container'
                          : ''
                      }`}
                    >
                      {day.day}
                      {day.status === 'present' && <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1" />}
                      {day.status === 'absent' && <span className="w-1.5 h-1.5 rounded-full bg-error mt-1" />}
                      {isToday && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />}
                    </div>
                  );
                })}
              </div>
            </section>

            <LeaveForm />
            <LeaveSummaryCards />
            <LeavePredictionCard />
          </div>
        </main>

        <BottomNav activeHref="/leave-calendar" />

        <footer className="hidden" />
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:block bg-surface">
        <Sidebar activeHref="/leave-calendar" />
        <TopBar title="Leave Calendar" userName="Alex Chen" userAvatar={USER_AVATAR} />

        <main className="ml-[280px] mt-16 p-lg pb-xl min-h-[calc(100vh-64px)]">
          <div className="max-w-[1280px] mx-auto">

            {/* Action bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl">
              <button className="bg-primary text-on-primary px-lg py-2.5 rounded-lg font-bold text-body-md shadow-sm hover:translate-y-[-2px] hover:shadow-md active:scale-95 transition-all flex items-center gap-2">
                <Icon name="fact_check" />
                Check leave
              </button>
              <div className="flex items-center gap-base bg-surface-container-lowest border border-outline-variant p-1 rounded-xl shadow-sm w-full md:w-auto">
                <div className="relative flex-grow">
                  <Icon name="date_range" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    type="number"
                    placeholder="Enter No. of days leave needed.."
                    className="pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-body-md w-full md:w-64 placeholder:text-outline"
                  />
                </div>
                <button className="bg-primary text-on-primary px-md py-2 rounded-lg font-bold text-label-md hover:bg-on-primary-fixed-variant transition-colors">
                  Check
                </button>
              </div>
            </div>

            {/* Calendar + sidebar panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
              <div className="lg:col-span-8">
                <CalendarGrid month="October 2024" days={OCTOBER_2024} />
              </div>

              <div className="lg:col-span-4 space-y-lg">
                <LeaveSummaryCards />
                <LeavePredictionCard />

                {/* Leave stats panel */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md space-y-md">
                  <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Leave Summary</h3>
                  {[
                    { label: 'Annual Leave', used: 5, total: 20, color: 'bg-primary' },
                    { label: 'Sick Leave', used: 2, total: 10, color: 'bg-error' },
                    { label: 'Casual Leave', used: 1, total: 5, color: 'bg-tertiary' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-label-sm font-label-sm text-on-surface">{item.label}</span>
                        <span className="text-label-sm font-label-sm text-on-surface-variant">
                          {item.used}/{item.total} days
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`${item.color} h-full rounded-full`}
                          style={{ width: `${(item.used / item.total) * 100}%` }}
                        />
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
