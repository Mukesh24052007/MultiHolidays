type ProgressBarProps = {
  value: number; // 0–100
  colorClass?: string;
  height?: string;
};

export default function ProgressBar({
  value,
  colorClass = 'bg-primary',
  height = 'h-2',
}: ProgressBarProps) {
  return (
    <div className={`w-full bg-surface-container-highest ${height} rounded-full overflow-hidden`}>
      <div
        className={`${colorClass} h-full rounded-full`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
