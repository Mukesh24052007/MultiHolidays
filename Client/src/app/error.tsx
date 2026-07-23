'use client';

import { useEffect } from 'react';
import Icon from '@/components/ui/Icon';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    // Log to console — swap for a real error tracker (Sentry, etc.) in production
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-lg">
          <Icon name="error" filled className="text-error text-[48px]" />
        </div>

        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-sm">
          Something went wrong
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-md">
          An unexpected error occurred. You can try again or return to the dashboard.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <pre className="text-left text-xs bg-surface-container p-sm rounded-lg border border-outline-variant text-error mb-lg overflow-auto max-h-32">
            {error.message}
          </pre>
        )}

        <div className="flex flex-col sm:flex-row gap-sm justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-xs bg-primary text-on-primary px-lg py-2.5 rounded-lg font-label-md font-bold hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <Icon name="refresh" className="text-[18px]" />
            Try Again
          </button>
          <a
            href="/dashboard"
            className="flex items-center justify-center gap-xs border border-outline-variant text-on-surface-variant px-lg py-2.5 rounded-lg font-label-md hover:bg-surface-container transition-colors"
          >
            <Icon name="home" className="text-[18px]" />
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
