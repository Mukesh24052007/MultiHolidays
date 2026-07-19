import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { NAV_ITEMS, NAV_FOOTER_ITEMS } from '@/constants/nav';

type SidebarProps = {
  activeHref: string;
};

export default function Sidebar({ activeHref }: SidebarProps) {
  return (
    <aside className="w-[280px] h-screen fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col py-md px-sm z-50">
      <div className="mb-xl px-sm">
        <h1 className="text-headline-md font-headline-md font-bold text-primary">MultiHolidays</h1>
        <p className="text-label-sm font-label-sm text-on-surface-variant">Attendance Planning</p>
      </div>

      <nav className="flex-grow space-y-base">
        {NAV_ITEMS.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md transition-colors duration-200 ${
                isActive
                  ? 'text-primary font-bold border-r-4 border-primary bg-secondary-container/30'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
              }`}
            >
              <Icon name={item.icon} filled={isActive} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-base border-t border-outline-variant pt-md">
        <button className="w-full mb-md bg-primary text-on-primary py-2.5 rounded-lg font-label-md font-bold hover:opacity-90 active:scale-95 transition-all">
          Apply for Leave
        </button>
        {NAV_FOOTER_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-200 font-label-md text-label-md"
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
