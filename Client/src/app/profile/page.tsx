import type { Metadata } from 'next';
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

const USER_AVATAR_DESKTOP =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCyTIzoa5SNVXI0EnZFFbvyso45JnO3e291bE87nyTT_7A6LDkyz3ntMRxB-ktwSA_XF1qdCiK7BeC23DbYxopitgI9S7d1ZlkOwEhQjQcWQ4YevzDWnv5AkPxG9dvr2V42qmAJDzRPGDu3PT1tkxmJIpxreKDBl-vSUMlRLoKcaqz8n9VTu0qLnSESyUXum1EwyUeBUHM5GILHstgmZ6_uzXQl2Y1dya-WXWkE-Q-TiJ3YTjmzlKn-hQ';

const USER_AVATAR_TOPBAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCmZHHWXII0oEnJOm-1RAoA3vPoO9dUanrghS8zLTIR5iAsVcxUUy8Qn9-ykHRl7sNycR448EGlNUftI9zREHdnhMa7RD-Sol9qmkf_9BMBKmoG-e1AE3NeAKO-KiC1oOMo9_r56L7LK9jtbZiqruTt0EoIzwov5kXdkJj-1lwb276iKVwFzjA-irEtS8GIdV-imW-m5c6qZP-vjKfNIIyPJuFtvv1QKuVZU24jvSD-fGJtKhSTXu53Iw';

const USER_AVATAR_MOBILE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ClYUiSO2eK_5x7aUcwRZG5dTAiWbDEUPepMccjxaCRmpqLxPL62Rh3piYs3_hOYkDTvzIEBEsCcxcdQr-7OSPrpgF-kGcBH-MoPI7kcTSDlp8zeV5Gys4xtGcpkUAH1ssxXAA7LWYwKhzVviVz5WKmcCpxkHswxwqDzmIkLqP-ia7hxhx8JI-B4XZqbGx_NAEwjtuYGo1x7IrG_znJqKlttZWa8_nOAxBpG08LJp665NzpxKwuNpkQ';

const ACCOUNT_FIELDS = [
  { label: 'Full Name', value: 'Natasha S', locked: false },
  { label: 'Email Address', value: 'natashas@email.com', locked: true },
];

export const metadata: Metadata = {
  title: 'Profile — MultiHolidays',
  description: 'Manage your MultiHolidays student profile and account settings.',
};

export default function ProfilePage() {
  return (
    <div className="w-full min-h-screen">
      {/* ── Mobile ── */}
      <div className="block md:hidden bg-background text-on-surface min-h-screen pb-24">
        <MobileHeader />

        <main className="pt-24 px-sm max-w-[448px] mx-auto">
          {/* Avatar section */}
          <section className="flex flex-col items-center mb-xl">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm">
                <Avatar src={USER_AVATAR_MOBILE} alt="Alex Rivera" size="xl" className="w-full h-full" />
              </div>
              <div className="absolute bottom-0 right-0 bg-primary text-on-primary rounded-full p-1.5 border-2 border-white">
                <Icon name="edit" className="text-sm" />
              </div>
            </div>
            <button className="mt-md px-md py-xs border border-primary text-primary rounded-full font-label-md text-label-md hover:bg-primary/5 transition-colors active:scale-95 duration-100">
              Change pic
            </button>
            <h2 className="mt-md text-headline-md font-headline-md text-on-surface">Alex Rivera</h2>
            <p className="text-body-md font-body-md text-on-secondary-container">Senior Academic Year • ID 2024-0892</p>
          </section>

          {/* Account info */}
          <section className="mb-lg">
            <h3 className="text-label-sm font-label-sm text-outline uppercase tracking-wider mb-sm">Account Information</h3>
            <div className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden">
              {[
                { icon: 'mail', label: 'Email Address', value: 'a.rivera@university.edu', chevron: true },
                { icon: 'school', label: 'Department', value: 'Computer Science', chevron: false },
                { icon: 'lock', label: 'Change Password', value: '', chevron: true },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`p-md flex items-center justify-between ${i < arr.length - 1 ? 'border-b border-outline-variant/30' : ''}`}
                >
                  <div className="flex items-center gap-sm">
                    <Icon name={row.icon} className="text-on-surface-variant" />
                    <div>
                      <p className="text-label-sm font-label-sm text-outline">{row.label}</p>
                      {row.value && <p className="text-body-md font-body-md">{row.value}</p>}
                    </div>
                  </div>
                  {row.chevron && <Icon name="chevron_right" className="text-outline text-sm" />}
                </div>
              ))}
            </div>
          </section>

          {/* System status */}
          <section className="mb-lg">
            <h3 className="text-label-sm font-label-sm text-outline uppercase tracking-wider mb-sm">System Status</h3>
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
                <span className="text-label-sm font-label-sm text-on-secondary-container">12 minutes ago</span>
              </div>
            </div>
          </section>

          {/* Download */}
          <section className="mb-xl">
            <button className="w-full bg-primary-container text-on-primary-container py-3 rounded-xl flex items-center justify-center gap-sm shadow-sm hover:brightness-110 transition-all active:scale-[0.98] duration-100">
              <Icon name="download" />
              <span className="text-body-lg font-headline-md">Download Attendance Report</span>
            </button>
            <p className="text-center text-label-sm font-label-sm text-outline mt-sm">PDF Format • Academic Year 2023-24</p>
          </section>

          <footer className="flex flex-col items-center gap-xs py-md border-t border-outline-variant/30">
            <p className="text-label-sm font-label-sm text-secondary">© 2024 MultiHolidays. All rights reserved.</p>
            <div className="flex gap-md">
              <a href="#" className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface underline">Terms and Conditions</a>
              <a href="#" className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface underline">Meet the Creator</a>
            </div>
          </footer>
        </main>

        <BottomNav activeHref="/profile" />
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:block text-on-surface">
        <Sidebar activeHref="/profile" />
        <TopBar title="Your Profile" userName="Hello, Natasha" userAvatar={USER_AVATAR_TOPBAR} />

        <main className="ml-[280px] pt-16 min-h-[calc(100vh-64px)] flex flex-col">
          <div className="flex-1 p-xl">
            <div className="max-w-4xl mx-auto space-y-lg">
              <ProfileCard
                name="Natasha S"
                role="Student • Faculty of Engineering"
                avatarSrc={USER_AVATAR_DESKTOP}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <AccountInfo fields={ACCOUNT_FIELDS} />
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
