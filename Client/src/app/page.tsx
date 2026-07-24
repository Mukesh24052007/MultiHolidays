'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import LoginBranding from '@/components/login/LoginBranding';
import LoginForm from '@/components/login/LoginForm';
import LoginSidePanel from '@/components/login/LoginSidePanel';
import TrustBadges from '@/components/login/TrustBadges';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Once auth resolves, redirect already-logged-in users to dashboard
  useEffect(() => {
    if (!loading && user) {
      window.location.assign('/dashboard');
    }
  }, [user, loading]);

  // Show nothing while the session check is in-flight to avoid flash
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  // If user is already set, we're about to redirect — don't render the form
  if (user) return null;

  return (
    <div className="w-full min-h-screen">
      {/* ── Mobile ────────────────────────────────────────────────────────── */}
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
              <p className="font-label-sm text-label-sm text-outline">
                Contact your college administrator to get access.
              </p>
            </div>
          </section>

          <footer className="mt-xl text-center space-y-md relative z-10">
            <div className="flex items-center justify-center gap-md">
              <a href="#" className="font-label-sm text-label-sm text-on-secondary-fixed-variant hover:text-on-surface transition-colors">Terms of Service</a>
              <span className="w-1 h-1 bg-outline rounded-full" />
              <a href="#" className="font-label-sm text-label-sm text-on-secondary-fixed-variant hover:text-on-surface transition-colors">Privacy Policy</a>
            </div>
            <p className="font-label-sm text-label-sm text-outline">© 2026 MultiHolidays. All rights reserved.</p>
          </footer>
        </main>
      </div>

      {/* ── Desktop ───────────────────────────────────────────────────────── */}
      <div className="hidden md:flex min-h-screen items-center justify-center p-md">
        {/* Decorative blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="floating-blob bg-primary w-[500px] h-[500px] -top-24 -left-24 animate-pulse" />
          <div className="floating-blob bg-tertiary w-[400px] h-[400px] bottom-0 right-0" style={{ animationDuration: '10s' }} />
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
              <p className="font-body-md text-body-md text-on-surface-variant mb-sm">New to MultiHolidays?</p>
              <p className="font-label-sm text-label-sm text-outline">
                Contact your college administrator to request access.
              </p>
            </div>
          </section>

          <TrustBadges />

          <footer className="mt-xl text-center">
            <p className="font-label-sm text-label-sm text-outline">© 2026 MultiHolidays. All rights reserved.</p>
          </footer>
        </main>

        <LoginSidePanel />
      </div>
    </div>
  );
}
