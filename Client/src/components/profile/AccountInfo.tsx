import Icon from '@/components/ui/Icon';

type Field = {
  label: string;
  value: string;
  locked?: boolean;
  icon?: string;
};

type Props = {
  fields: Field[];
  /** Optional callback when user clicks an editable field or the edit button */
  onEditClick?: () => void;
};

export default function AccountInfo({ fields, onEditClick }: Props) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md space-y-md">
      <div className="flex items-center justify-between">
        <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
          Account Information
        </h3>
        {onEditClick && (
          <button
            onClick={onEditClick}
            className="flex items-center gap-1 text-label-sm font-label-sm text-primary hover:underline"
          >
            <Icon name="edit" className="text-[14px]" />
            Edit
          </button>
        )}
      </div>

      <div className="space-y-sm">
        {fields.map((field) => (
          <div
            key={field.label}
            className={`group ${!field.locked && onEditClick ? 'cursor-pointer' : ''}`}
            onClick={!field.locked && onEditClick ? onEditClick : undefined}
          >
            <label className="text-label-sm font-label-sm text-outline mb-1 block">
              {field.label}
            </label>
            <div className={`flex items-center justify-between p-sm bg-surface-container rounded-lg border border-transparent ${!field.locked && onEditClick ? 'group-hover:border-primary/20' : ''} transition-all`}>
              <span className={`text-body-md font-body-md ${field.value ? 'text-on-surface' : 'text-outline italic'}`}>
                {field.value || 'Not set'}
              </span>
              <Icon
                name={field.icon ?? (field.locked ? 'lock' : 'edit')}
                className="text-outline text-[18px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
