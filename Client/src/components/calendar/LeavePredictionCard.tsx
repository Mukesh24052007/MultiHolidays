import Icon from '@/components/ui/Icon';

export default function LeavePredictionCard() {
  return (
    <section className="bg-primary-container text-on-primary-container rounded-xl p-md overflow-hidden relative">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="auto_awesome" filled className="text-on-primary-container" />
          <h3 className="text-label-md font-label-md">Leave Prediction</h3>
        </div>
        <p className="text-body-md mb-4 opacity-90">
          Based on your current attendance trend, taking 3 days off in May will maintain an 88% attendance rate.
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex justify-between items-center">
          <span className="text-label-sm">Safe to proceed</span>
          <Icon name="check_circle" className="text-tertiary-fixed" />
        </div>
      </div>
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
    </section>
  );
}
