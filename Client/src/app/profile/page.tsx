import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileHeader from '@/components/layout/MobileHeader';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import Icon from '@/components/ui/Icon';
import Avatar from '@/components/ui/Avatar';
import ProfileCard from '@/components/profile/ProfileCard';
import AccountInfo from '@/components/profile/AccountInfo';
import SystemStatus from '@/components/profile/SystemStatus';
import DisclaimerNote from '@/components/dashboard/DisclaimerNote';
import type { User } from '@/types';

export const metadata: Metadata = {
  title: 'Profile — MultiHolidays',
  description: 'Manage your MultiHolidays student profile and account settings.',
};

/** Fallback avatar URL */
const DEFAULT_AVATAR =
  'https://img.icons8.com/nolan/1200/user-default.jpg';

/**
 * Fetch the full user profile server-side using the httpOnly token cookie.
 * Returns null when the token is absent or rejected (triggers login redirect).
 */
async function getAuthenticatedProfile(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/profile/me`, {
      headers: { Cookie: `token=${token}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user as User;
  } catch {
    return null;
  }
}

/** Derive a friendly display name from the raw name or email. */
function displayName(name: string, email: string): string {
  if (name) return name;
  // Fall back to the part before @ or the first segment before a dot
  const base = email.split('@')[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
}

/** Format a role string from course + year. */
function roleLabel(course: string, year: number | null): string {
  const parts: string[] = [];
  if (course) parts.push(course);
  if (year) parts.push(`Year ${year}`);
  return parts.length ? `Student • ${parts.join(' — ')}` : 'Student';
}

/** Build the year suffix for display. */
function yearSuffix(year: number | null): string {
  if (!year) return '';
  const suffixes: Record<number, string> = { 1: 'st', 2: 'nd', 3: 'rd' };
  return `${year}${suffixes[year] ?? 'th'} Year`;
}

export default async function ProfilePage() {
  const user = await getAuthenticatedProfile();
  if (!user) redirect('/');

  const fullName = displayName(user.name, user.email);
  const role = roleLabel(user.course, user.year);

  const accountFields = [
    { label: 'Full Name', value: fullName, locked: false },
    { label: 'Email Address', value: user.email, locked: true },
    { label: 'Student ID', value: user.studentId || '', locked: false },
    { label: 'Course / Department', value: user.course || '', locked: false },
    { label: 'Year', value: user.year ? yearSuffix(user.year) : '', locked: false },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* ────────────── Mobile ────────────── */}
      <div className="block md:hidden bg-background text-on-surface min-h-screen pb-24">
        <MobileHeader userName={fullName} />

        <main className="pt-24 px-sm max-w-[448px] mx-auto">
          {/* Avatar + name section */}
          <section className="flex flex-col items-center mb-xl">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm">
                <Avatar src={DEFAULT_AVATAR} alt={fullName} size="xl" className="w-full h-full" />
              </div>
              <div className="absolute bottom-0 right-0 bg-primary text-on-primary rounded-full p-1.5 border-2 border-white">
                <Icon name="edit" className="text-sm" />
              </div>
            </div>
            <button className="mt-md px-md py-xs border border-primary text-primary rounded-full font-label-md text-label-md hover:bg-primary/5 transition-colors active:scale-95 duration-100">
              Change pic
            </button>
            <h2 className="mt-md text-headline-md font-headline-md text-on-surface">{fullName}</h2>
            <p className="text-body-md font-body-md text-on-secondary-container">
              {role}
              {user.studentId ? ` • ID ${user.studentId}` : ''}
            </p>
          </section>

          {/* Account info */}
          <section className="mb-lg">
            <h3 className="text-label-sm font-label-sm text-outline uppercase tracking-wider mb-sm">
              Account Information
            </h3>
            <div className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden">
              {[
                { icon: 'person', label: 'Full Name', value: fullName, chevron: false },
                { icon: 'mail', label: 'Email Address', value: user.email, chevron: false },
                { icon: 'badge', label: 'Student ID', value: user.studentId || 'Not set', chevron: true },
                { icon: 'school', label: 'Course', value: user.course || 'Not set', chevron: true },
                { icon: 'calendar_today', label: 'Year', value: user.year ? yearSuffix(user.year) : 'Not set', chevron: true },
                { icon: 'lock', label: 'Change Password', value: '', chevron: true },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`p-md flex items-center justify-between ${
                    i < arr.length - 1 ? 'border-b border-outline-variant/30' : ''
                  }`}
                >
                  <div className="flex items-center gap-sm">
                    <Icon name={row.icon} className="text-on-surface-variant" />
                    <div>
                      <p className="text-label-sm font-label-sm text-outline">{row.label}</p>
                      {row.value && (
                        <p className="text-body-md font-body-md text-on-surface">{row.value}</p>
                      )}
                    </div>
                  </div>
                  {row.chevron && (
                    <Icon name="chevron_right" className="text-outline text-sm" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* System status */}
          <section className="mb-lg">
            <h3 className="text-label-sm font-label-sm text-outline uppercase tracking-wider mb-sm">
              System Status
            </h3>
            <div className="bg-white border border-outline-variant/30 rounded-xl p-md">
              <div className="flex items-center justify-between mb-md">
                <div className="flex items-center gap-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-body-md font-body-md">Attendance Sync</span>
                </div>
                <span className="text-label-sm font-label-sm text-[#10b981]">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <Icon name="cloud_done" className="text-on-surface-variant" />
                  <span className="text-body-md font-body-md">Last backup</span>
                </div>
                <span className="text-label-sm font-label-sm text-on-secondary-container">
                  12 minutes ago
                </span>
              </div>
            </div>
          </section>

          {/* Download report */}
          <section className="mb-xl">
            <button className="w-full bg-primary-container text-on-primary-container py-3 rounded-xl flex items-center justify-center gap-sm shadow-sm hover:brightness-110 transition-all active:scale-[0.98] duration-100">
              <Icon name="download" />
              <span className="text-body-lg font-headline-md">Download Attendance Report</span>
            </button>
            <p className="text-center text-label-sm font-label-sm text-outline mt-sm">
              PDF Format • Academic Year 2023-24
            </p>
          </section>

          <footer className="flex flex-col items-center gap-xs py-md border-t border-outline-variant/30">
            <p className="text-label-sm font-label-sm text-secondary">
              © 2024 MultiHolidays. All rights reserved.
            </p>
            <div className="flex gap-md">
              <a
                href="#"
                className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface underline"
              >
                Terms and Conditions
              </a>
              <a
                href="#"
                className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface underline"
              >
                Meet the Creator
              </a>
            </div>
          </footer>
        </main>

        <BottomNav activeHref="/profile" />
      </div>

      {/* ────────────── Desktop ────────────── */}
      <div className="hidden md:block text-on-surface">
        <Sidebar activeHref="/profile" />
        <TopBar
          title="Your Profile"
          userName={`Hello, ${fullName}`}
        />

        <main className="ml-[280px] pt-16 min-h-[calc(100vh-64px)] flex flex-col">
          <div className="flex-1 p-xl">
            <div className="max-w-4xl mx-auto space-y-lg">
              <ProfileCard
                name={fullName}
                role={role}
                avatarSrc={DEFAULT_AVATAR}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <AccountInfo fields={accountFields} />
                <SystemStatus />
              </div>

              <DisclaimerNote />
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
