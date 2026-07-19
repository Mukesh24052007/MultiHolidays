import Icon from '@/components/ui/Icon';

type WelcomeBannerProps = {
  name: string;
  subtitle?: string;
};

export default function WelcomeBanner({
  name,
  subtitle = "Your academic journey is on track. Keep maintaining your presence to ensure a smooth semester end.",
}: WelcomeBannerProps) {
  return (
    <section className="bg-primary-container p-lg rounded-xl text-on-primary-container relative overflow-hidden flex items-center justify-between mb-xl">
      <div className="relative z-10 max-w-[576px]">
        <h3 className="text-headline-lg font-headline-lg mb-xs">Welcome back, {name}!</h3>
        <p className="text-body-md font-body-md opacity-90">{subtitle}</p>
      </div>
      <div className="hidden lg:block relative z-10 opacity-20 transform translate-x-4">
        <Icon name="school" filled size="xl" className="text-[120px]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
    </section>
  );
}
