import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-lg">
          <Icon name="search_off" filled className="text-primary text-[48px]" />
        </div>

        {/* Copy */}
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-sm">
          Page not found
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-xl">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-sm justify-center">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-xs bg-primary text-on-primary px-lg py-2.5 rounded-lg font-label-md font-bold hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <Icon name="home" className="text-[18px]" />
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-xs border border-outline-variant text-on-surface-variant px-lg py-2.5 rounded-lg font-label-md hover:bg-surface-container transition-colors"
          >
            <Icon name="login" className="text-[18px]" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
