import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';

type TopBarProps = {
  title: string;
  userName: string;
  userAvatar: string;
};

export default function TopBar({ title, userName, userAvatar }: TopBarProps) {
  return (
    <header className="fixed top-0 right-0 left-[280px] h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-lg z-40">
      <h2 className="text-headline-md font-headline-md text-on-surface">{title}</h2>
      <div className="flex items-center gap-md">
        <button className="hover:bg-surface-container-low rounded-full p-2 transition-opacity active:opacity-80">
          <Icon name="notifications" className="text-on-surface-variant" />
        </button>
        <div className="flex items-center gap-sm bg-surface-container rounded-full pl-base pr-md py-base border border-outline-variant hover:bg-surface-container-high cursor-pointer transition-colors">
          <Avatar src={userAvatar} alt={userName} size="sm" />
          <span className="font-label-md text-label-md text-on-surface">{userName}</span>
        </div>
      </div>
    </header>
  );
}
