type IconProps = {
  name: string;
  filled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const SIZE_MAP = {
  sm: 'text-[18px]',
  md: 'text-[24px]',
  lg: 'text-[32px]',
  xl: 'text-[40px]',
};

export default function Icon({ name, filled = false, className = '', size = 'md' }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${SIZE_MAP[size]} ${className}`}
      style={filled ? { fontVariationSettings: '"FILL" 1' } : undefined}
    >
      {name}
    </span>
  );
}
