import Icon from '@/components/ui/Icon';

type Field = {
  label: string;
  value: string;
  locked?: boolean;
};

type Props = {
  fields: Field[];
};

export default function AccountInfo({ fields }: Props) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md space-y-md">
      <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Account Information</h3>
      <div className="space-y-sm">
        {fields.map((field) => (
          <div key={field.label} className="group">
            <label className="text-label-sm font-label-sm text-outline mb-1 block">{field.label}</label>
            <div className="flex items-center justify-between p-sm bg-surface-container rounded-lg border border-transparent group-hover:border-primary/20 transition-all">
              <span className="text-body-md font-body-md text-on-surface">{field.value}</span>
              <Icon
                name={field.locked ? 'lock' : 'edit'}
                className="text-outline text-[18px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
