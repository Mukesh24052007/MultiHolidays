import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileHeader from '@/components/layout/MobileHeader';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import Icon from '@/components/ui/Icon';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import StatCard from '@/components/dashboard/StatCard';
import DisclaimerNote from '@/components/dashboard/DisclaimerNote';
import AttendanceRecordList from '@/components/dashboard/AttendanceRecord';
import ImageGrid from '@/components/dashboard/ImageGrid';
import { ATTENDANCE_STATS, RECENT_ATTENDANCE, ANNOUNCEMENTS, DASHBOARD_IMAGES } from '@/constants/dashboard';

const USER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBbxpfzYth4wBFaB9fb6Z16bOBf7uU7AClergHGW9X1IfwWIyNv7EMgUvg5Grgqkfh8zwdt5C_D5_l5p4UkiF3iYSJdOKb2vHGhNq-Xrj_SykfWdAAjZbuT9ki2bt0d5mkz3ntu4KbdgLXidy3p9T2srCAAKe29BZTjRhvllY9GfwPSnny8dHt5x0yNW2vBnMcqpP7F1dymE_ivr_nhckGn80Pr1fYhMDGwKpayN5x4nfcVgsXj9Vy6nQ';

const MOBILE_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCIrlEly0VXXD7mApSAT2VUYRTsh10fKgky2OQkPkH8IG4mT9OyQFIoa9-T1ldxvqeuIkwZOaPOZhAOOC2pORG_RhbQQk4ECuGRdztXYVOclW7vVr1YvNgwayx8XENCNZrzAQhcZkSxv5y2N7lFxzKrI4LikUF__rI7LGsXfXYjH4E2sBt_yNmQpcB7P9Q9hG2WGp9Q4devRV-RXerhLVwcyUpFj1k_WzVhHyVsQCMMcIfqPHPQ2EM8pA';

export const metadata: Metadata = {
  title: 'Dashboard — MultiHolidays',
  description: 'View your attendance metrics and academic dashboard.',
};

/**
 * Silently verify the session server-side before rendering.
 * Calls GET /api/auth/me with the cookie forwarded from the browser.
 * If the token is missing or expired the server returns 401 and we redirect.
 */
async function getAuthenticatedAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/auth/me`, {
      headers: { Cookie: `token=${token}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.admin as { id: string; email: string; name: string };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) redirect('/');
  return (
    <div className="w-full min-h-screen">
      {/* ── Mobile ── */}
      <div className="block md:hidden text-on-background min-h-screen pb-24">
        <MobileHeader userAvatar={MOBILE_AVATAR} userName="Alex" />

        <main className="pt-20 px-sm space-y-md">
          {/* Mobile welcome */}
          <section className="relative overflow-hidden rounded-xl bg-primary-container p-md text-on-primary-container">
            <div className="relative z-10">
              <p className="font-label-sm text-label-sm uppercase tracking-wider opacity-80 mb-base">Dashboard Overview</p>
              <h1 className="font-headline-lg text-headline-lg mb-xs">Welcome back, Alex</h1>
              <p className="font-body-md text-body-md opacity-90 max-w-[80%]">
                You&apos;re on track! Your attendance is currently above the 75% threshold.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute right-4 top-4 opacity-20">
              <Icon name="school" filled size="xl" className="text-[80px]" />
            </div>
          </section>

          {/* Mobile metrics */}
          <section className="space-y-sm">
            <h2 className="font-headline-md text-headline-md px-base">Academic Metrics</h2>
            <div className="grid grid-cols-1 gap-sm">
              {/* Circular attendance */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center justify-between hover:translate-y-[-2px] transition-all duration-200">
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant">Overall Attendance</p>
                  <h3 className="font-headline-xl text-headline-xl text-primary mt-xs">88.5%</h3>
                </div>
                <div className="relative flex items-center justify-center w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-surface-container-high" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="8" />
                    <circle className="text-tertiary" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeDasharray="213.6" strokeDashoffset="24.5" strokeWidth="8" />
                  </svg>
                  <Icon name="check_circle" filled className="absolute text-tertiary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-sm">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
                  <Icon name="event_available" className="text-primary mb-xs" />
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Days Present</p>
                  <p className="font-headline-md text-headline-md">115</p>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
                  <Icon name="event_busy" className="text-error mb-xs" />
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Days Absent</p>
                  <p className="font-headline-md text-headline-md">12</p>
                </div>
              </div>
              <div className="bg-secondary-container/30 border border-primary/10 rounded-xl p-md flex items-center gap-md">
                <div className="bg-primary text-on-primary w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="font-label-sm text-[10px] leading-none uppercase">Oct</span>
                  <span className="font-headline-md text-headline-md leading-none">24</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary font-bold">Today&apos;s Schedule</p>
                  <p className="font-body-md text-body-md text-on-surface">3 Lectures Scheduled</p>
                </div>
                <Icon name="chevron_right" className="ml-auto text-on-surface-variant" />
              </div>
            </div>
          </section>

          {/* Mobile announcements */}
          <section className="space-y-sm">
            <div className="flex justify-between items-end px-base">
              <h2 className="font-headline-md text-headline-md">Announcements</h2>
              <button className="text-primary font-label-md text-label-md hover:underline transition-all">View All</button>
            </div>
            <div className="flex overflow-x-auto gap-md no-scrollbar pb-xs snap-x">
              {ANNOUNCEMENTS.map((card, i) =>
                card.type === 'text' ? (
                  <div key={i} className="snap-start shrink-0 w-[85%] bg-surface-container-low border border-outline-variant rounded-xl p-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-xs mb-sm">
                        <Icon name={card.icon} className="text-tertiary" />
                        <span className="font-label-md text-label-md text-tertiary uppercase font-bold">{card.tag}</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant">{card.body}</p>
                    </div>
                    <button className="mt-md font-label-sm text-label-sm text-primary flex items-center gap-xs">
                      {card.linkLabel} <Icon name="arrow_forward" className="text-sm" />
                    </button>
                  </div>
                ) : (
                  <div key={i} className="snap-start shrink-0 w-[85%] relative h-[200px] rounded-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img src={card.src} alt={card.alt} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-md left-md z-20 text-white">
                      <p className="font-label-sm text-label-sm uppercase tracking-wider opacity-80">{card.category}</p>
                      <p className="font-body-lg font-bold">{card.title}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          <AttendanceRecordList records={RECENT_ATTENDANCE} />
        </main>

        <BottomNav activeHref="/dashboard" />

        <button className="fixed bottom-24 right-sm bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all z-40">
          <Icon name="add" size="lg" />
        </button>

        <footer className="mt-xl px-lg py-md text-center border-t border-outline-variant bg-surface">
          <p className="font-label-sm text-label-sm text-secondary">© 2024 MultiHolidays. All rights reserved.</p>
          <div className="flex justify-center gap-md mt-sm">
            <a href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Terms and Conditions</a>
            <a href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Meet the Creator</a>
          </div>
        </footer>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:block font-body-md text-on-surface">
        <Sidebar activeHref="/dashboard" />
        <TopBar title="Your Dashboard" userName="Hello, Natasha" userAvatar={USER_AVATAR} />

        <main className="ml-[280px] pt-24 px-lg min-h-screen">
          <WelcomeBanner name="Natasha" />

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
            {ATTENDANCE_STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </section>

          <DisclaimerNote />

          <ImageGrid images={DASHBOARD_IMAGES} />
        </main>

        <Footer offsetLeft />
      </div>
    </div>
  );
}
