import type { Metadata } from 'next';
import Icon from '@/components/ui/Icon';
import LoginBranding from '@/components/login/LoginBranding';
import LoginForm from '@/components/login/LoginForm';
import LoginSidePanel from '@/components/login/LoginSidePanel';
import TrustBadges from '@/components/login/TrustBadges';

export const metadata: Metadata = {
  title: 'Login — MultiHolidays',
  description: 'Sign in to the MultiHolidays student portal.',
};

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen">
      {/* ── Mobile ── */}
      <div className="block md:hidden">
        <main className="mobile-container flex flex-col justify-center items-center px-sm py-xl max-w-[448px] mx-auto relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

          <header className="w-full text-center mb-xl relative z-10">
            <LoginBranding />
          </header>

          <section className="w-full bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm relative z-10">
            <LoginForm />
            <div className="mt-xl pt-md border-t border-outline-variant text-center">
              <p className="font-body-md text-body-md text-on-surface-variant mb-sm">New to the system?</p>
              <button className="w-full py-3 px-lg border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary/5 active:scale-[0.98] transition-all">
                Apply for Access
              </button>
            </div>
          </section>

          <footer className="mt-xl text-center space-y-md relative z-10">
            <div className="flex items-center justify-center gap-md">
              <a href="#" className="font-label-sm text-label-sm text-on-secondary-fixed-variant hover:text-on-surface transition-colors">Terms of Service</a>
              <span className="w-1 h-1 bg-outline rounded-full" />
              <a href="#" className="font-label-sm text-label-sm text-on-secondary-fixed-variant hover:text-on-surface transition-colors">Privacy Policy</a>
            </div>
            <p className="font-label-sm text-label-sm text-outline">© 2024 MultiHolidays. All rights reserved.</p>
          </footer>
        </main>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex min-h-screen items-center justify-center p-md">
        {/* Decorative blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="floating-blob bg-primary w-[500px] h-[500px] -top-24 -left-24 animate-pulse" />
          <div className="floating-blob bg-tertiary w-[400px] h-[400px] bottom-0 right-0 animate-bounce" style={{ animationDuration: '10s' }} />
        </div>

        <main className="w-full max-w-[440px] z-10">
          <div className="text-center mb-xl">
            <div className="flex items-center justify-center mb-sm">
              <div className="bg-primary-container text-on-primary-container w-12 h-12 rounded-xl flex items-center justify-center mr-xs">
                <Icon name="calendar_month" filled className="text-[28px]" />
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">MultiHolidays</h1>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Welcome back</p>
          </div>

          <section className="login-card bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
            <LoginForm showRemember />
            <div className="mt-lg pt-lg border-t border-outline-variant text-center">
              <p className="font-body-md text-body-md text-on-surface-variant mb-md">New to MultiHolidays?</p>
              <button className="w-full border border-primary text-primary py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary/5 active:bg-primary/10 transition-all">
                Apply for Access
              </button>
            </div>
          </section>

          <TrustBadges />

          <footer className="mt-xl text-center">
            <p className="font-label-sm text-label-sm text-outline">© 2024 MultiHolidays. All rights reserved.</p>
          </footer>
        </main>

        <LoginSidePanel />
      </div>
    </div>
  );
}
