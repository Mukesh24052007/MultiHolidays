'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileHeader from '@/components/layout/MobileHeader';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import Icon from '@/components/ui/Icon';
import Avatar from '@/components/ui/Avatar';
import AccountInfo from '@/components/profile/AccountInfo';
import SystemStatus from '@/components/profile/SystemStatus';
import EditProfileModal from '@/components/profile/EditProfileModal';
import ChangePasswordModal from '@/components/profile/ChangePasswordModal';
import DisclaimerNote from '@/components/dashboard/DisclaimerNote';
import { getProfile } from '@/lib/profile';
import type { User } from '@/types';

const DEFAULT_AVATAR = 'https://img.icons8.com/nolan/1200/user-default.jpg';

function displayName(name: string, email: string): string {
  if (name) return name;
  const base = email.split('@')[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
}

function roleLabel(course: string, year: number | null): string {
  const parts: string[] = [];
  if (course) parts.push(course);
  if (year)   parts.push(`Year ${year}`);
  return parts.length ? `Student • ${parts.join(' — ')}` : 'Student';
}

function yearSuffix(year: number | null): string {
  if (!year) return '';
  const suffixes: Record<number, string> = { 1: 'st', 2: 'nd', 3: 'rd' };
  return `${year}${suffixes[year] ?? 'th'} Year`;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser]             = useState<User | null>(null);
  const [loading, setLoading]       = useState(true);
  const [showEdit, setShowEdit]     = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch(() => router.replace('/'))
      .finally(() => setLoading(false));
  }, [router]);

  function handleSaved(updated: User) {
    setUser(updated);
    setShowEdit(false);
  }

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading || !user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="text-label-md font-label-md text-on-surface-variant">Loading profile…</p>
        </div>
      </div>
    );
  }

  const fullName = displayName(user.name, user.email);
  const role     = roleLabel(user.course, user.year);

  const accountFields = [
    { label: 'Full Name',           value: fullName,                             locked: false },
    { label: 'Email Address',       value: user.email,                           locked: true  },
    { label: 'Student ID',          value: user.studentId || '',                 locked: false },
    { label: 'Course / Department', value: user.course || '',                    locked: false },
    { label: 'Year',                value: user.year ? yearSuffix(user.year) : '', locked: false },
  ];

  // Mobile account rows — same data, slightly different shape
  const mobileRows = [
    { icon: 'person',         label: 'Full Name',     value: fullName,                            tappable: false, action: undefined        },
    { icon: 'mail',           label: 'Email Address', value: user.email,                          tappable: false, action: undefined        },
    { icon: 'badge',          label: 'Student ID',    value: user.studentId || 'Not set',         tappable: true,  action: () => setShowEdit(true) },
    { icon: 'school',         label: 'Course',        value: user.course    || 'Not set',         tappable: true,  action: () => setShowEdit(true) },
    { icon: 'calendar_today', label: 'Year',          value: user.year ? yearSuffix(user.year) : 'Not set', tappable: true, action: () => setShowEdit(true) },
    { icon: 'lock',           label: 'Change Password', value: '',                                tappable: true,  action: () => setShowPassword(true) },
  ] as const;

  return (
    <div className="w-full min-h-screen">

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {showEdit && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEdit(false)}
          onSaved={handleSaved}
        />
      )}
      {showPassword && (
        <ChangePasswordModal
          onClose={() => setShowPassword(false)}
          onChanged={() => setShowPassword(false)}
        />
      )}

      {/* ══ MOBILE ══════════════════════════════════════════════════════════ */}
      <div className="block md:hidden bg-background text-on-surface min-h-screen pb-24">
        <MobileHeader userName={fullName} />

        <main className="pt-24 px-sm max-w-[448px] mx-auto">

          {/* Avatar hero */}
          <section className="flex flex-col items-center mb-xl">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm">
                <Avatar src={DEFAULT_AVATAR} alt={fullName} size="xl" className="w-full h-full" />
              </div>
              <div className="absolute bottom-0 right-0 bg-primary text-on-primary rounded-full p-1.5 border-2 border-white">
                <Icon name="edit" className="text-sm" />
              </div>
            </div>
            <button
              onClick={() => setShowEdit(true)}
              className="mt-md px-md py-xs border border-primary text-primary rounded-full font-label-md text-label-md hover:bg-primary/5 transition-colors active:scale-95 duration-100"
            >
              Edit Profile
            </button>
            <h2 className="mt-md text-headline-md font-headline-md text-on-surface">{fullName}</h2>
            <p className="text-body-md font-body-md text-on-secondary-container">
              {role}{user.studentId ? ` • ID ${user.studentId}` : ''}
            </p>
          </section>

          {/* Account info rows */}
          <section className="mb-lg">
            <div className="flex justify-between items-center mb-sm">
              <h3 className="text-label-sm font-label-sm text-outline uppercase tracking-wider">
                Account Information
              </h3>
              <button
                onClick={() => setShowEdit(true)}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <Icon name="edit" className="text-[14px]" />Edit
              </button>
            </div>
            <div className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden divide-y divide-outline-variant/30">
              {mobileRows.map((row) => (
                <button
                  key={row.label}
                  onClick={row.tappable ? row.action : undefined}
                  className={`w-full text-left p-md flex items-center justify-between ${
                    row.tappable ? 'hover:bg-surface-container-low transition-colors active:bg-surface-container' : ''
                  }`}
                >
                  <div className="flex items-center gap-sm">
                    <Icon name={row.icon} className="text-on-surface-variant" />
                    <div>
                      <p className="text-label-sm font-label-sm text-outline">{row.label}</p>
                      {row.value && (
                        <p className={`text-body-md font-body-md ${
                          row.value === 'Not set' ? 'text-outline italic' : 'text-on-surface'
                        }`}>
                          {row.value}
                        </p>
                      )}
                    </div>
                  </div>
                  {row.tappable && <Icon name="chevron_right" className="text-outline text-sm" />}
                </button>
              ))}
            </div>
          </section>

          {/* System status */}
          <section className="mb-lg">
            <h3 className="text-label-sm font-label-sm text-outline uppercase tracking-wider mb-sm">
              System Status
            </h3>
            <div className="bg-white border border-outline-variant/30 rounded-xl p-md space-y-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-body-md font-body-md">Attendance Sync</span>
                </div>
                <span className="text-label-sm font-label-sm text-[#10b981]">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <Icon name="verified" className="text-on-surface-variant" />
                  <span className="text-body-md font-body-md">Profile Verified</span>
                </div>
                <Icon name="check_circle" filled className="text-[#10b981] text-[18px]" />
              </div>
              {user.createdAt && (
                <div className="flex items-center gap-sm text-on-surface-variant pt-xs border-t border-outline-variant/30">
                  <Icon name="history" className="text-[18px]" />
                  <p className="text-label-sm font-label-sm">
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>
          </section>

          <footer className="flex flex-col items-center gap-xs py-md border-t border-outline-variant/30">
            <p className="text-label-sm font-label-sm text-secondary">© 2026 MultiHolidays. All rights reserved.</p>
            <div className="flex gap-md">
              <a href="#" className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface underline">
                Terms and Conditions
              </a>
              <a href="#" className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface underline">
                Meet the Creator
              </a>
            </div>
          </footer>
        </main>

        <BottomNav activeHref="/profile" />
      </div>

      {/* ══ DESKTOP ═════════════════════════════════════════════════════════ */}
      <div className="hidden md:block text-on-surface">
        <Sidebar activeHref="/profile" />
        <TopBar title="Your Profile" userName={`Hello, ${fullName}`} />

        <main className="ml-[280px] pt-16 min-h-[calc(100vh-64px)] flex flex-col">
          <div className="flex-1 p-xl">
            <div className="max-w-4xl mx-auto space-y-lg">

              {/* Profile hero card */}
              <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-lg opacity-5">
                  <Icon name="person" className="text-[120px]" />
                </div>
                <div className="relative mb-md">
                  <div className="w-40 h-40 rounded-full border-4 border-primary/10 overflow-hidden shadow-lg">
                    <Avatar src={DEFAULT_AVATAR} alt={fullName} size="xl" />
                  </div>
                </div>
                <h2 className="text-headline-md font-headline-md text-on-surface mb-xs">{fullName}</h2>
                <p className="text-body-md font-body-md text-on-surface-variant mb-xs">{role}</p>
                {user.studentId && (
                  <p className="text-label-sm font-label-sm text-outline mb-lg">ID: {user.studentId}</p>
                )}
                <div className="flex items-center gap-sm flex-wrap justify-center">
                  <button
                    onClick={() => setShowEdit(true)}
                    className="px-lg py-2.5 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors active:scale-95 flex items-center gap-xs"
                  >
                    <Icon name="edit" className="text-[18px]" />Edit Profile
                  </button>
                  <button
                    onClick={() => setShowPassword(true)}
                    className="px-lg py-2.5 border border-outline-variant text-on-surface-variant font-bold rounded-lg hover:bg-surface-container transition-colors active:scale-95 flex items-center gap-xs"
                  >
                    <Icon name="lock_reset" className="text-[18px]" />Change Password
                  </button>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <AccountInfo fields={accountFields} onEditClick={() => setShowEdit(true)} />
                <SystemStatus memberSince={user.createdAt} />
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
