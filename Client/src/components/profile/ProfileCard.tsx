import Icon from '@/components/ui/Icon';
import Avatar from '@/components/ui/Avatar';

type ProfileCardProps = {
  name: string;
  role: string;
  avatarSrc: string;
};

export default function ProfileCard({ name, role, avatarSrc }: ProfileCardProps) {
  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl flex flex-col items-center text-center shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-lg opacity-5">
        <Icon name="person" className="text-[120px]" />
      </div>
      <div className="relative cursor-pointer mb-md">
        <div className="w-48 h-48 rounded-full border-4 border-primary/10 overflow-hidden shadow-lg group-hover:border-primary/30 transition-all">
          <Avatar src={avatarSrc} alt={name} size="xl" />
        </div>
        <button className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform">
          <Icon name="photo_camera" className="text-[20px]" />
        </button>
      </div>
      <h2 className="text-headline-md font-headline-md text-on-surface mb-xs">{name}</h2>
      <p className="text-body-md font-body-md text-on-surface-variant mb-lg">{role}</p>
      <button className="px-lg py-2.5 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors active:scale-95">
        Change pic
      </button>
    </section>
  );
}
