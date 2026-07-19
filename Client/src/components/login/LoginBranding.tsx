import Icon from '@/components/ui/Icon';

export default function LoginBranding() {
  return (
    <div className="flex flex-col items-center gap-xs">
      <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-md shadow-sm">
        <Icon name="calendar_month" filled size="xl" className="text-white" />
      </div>
      <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight">MultiHolidays</h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] mx-auto text-center">
        Secure student portal for attendance and academic leave management.
      </p>
    </div>
  );
}
