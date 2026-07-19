import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { NAV_ITEMS } from '@/constants/nav';

type BottomNavProps = {
  activeHref: string;
};

export default function BottomNav({ activeHref }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-t border-outline-variant z-50 flex justify-around items-center h-20 px-sm md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = activeHref === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 flex-1 active:scale-95 transition-all duration-100 ${
              isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {isActive ? (
              <div className="bg-secondary-container/30 px-5 py-1 rounded-full">
                <Icon name={item.icon} filled />
              </div>
            ) : (
              <Icon name={item.icon} />
            )}
            <span className={`font-label-sm text-label-sm ${isActive ? 'font-bold' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
