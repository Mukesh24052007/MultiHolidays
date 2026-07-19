import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';

type MobileHeaderProps = {
  userAvatar?: string;
  userName?: string;
};

export default function MobileHeader({ userAvatar, userName }: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center px-sm">
      <span className="text-headline-md font-headline-md font-bold text-primary">MultiHolidays</span>
      <div className="flex items-center gap-xs">
        <button className="hover:bg-surface-container-low rounded-full p-2 transition-opacity active:opacity-80">
          <Icon name="notifications" className="text-primary" />
        </button>
        {userAvatar && (
          <div className="w-8 h-8 rounded-full bg-secondary-container overflow-hidden">
            <Avatar src={userAvatar} alt={userName ?? 'User'} size="sm" />
          </div>
        )}
      </div>
    </header>
  );
}
