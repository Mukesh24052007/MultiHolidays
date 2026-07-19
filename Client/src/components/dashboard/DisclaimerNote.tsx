import Icon from '@/components/ui/Icon';

export default function DisclaimerNote() {
  return (
    <section className="bg-surface-container p-md rounded-lg border border-outline-variant/50 mb-xl">
      <div className="flex gap-sm items-start">
        <Icon name="info" className="text-on-surface-variant mt-1" />
        <div>
          <h4 className="text-label-md font-label-md text-on-surface font-bold mb-xs">Note for Students</h4>
          <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
            The values on MultiHolidays are approximate calculations based on the details provided by the college.
            Attendance figures can vary due to recent entries or pending administrative updates. Please contact the
            academic office for official records.
          </p>
        </div>
      </div>
    </section>
  );
}
