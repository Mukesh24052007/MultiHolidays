type AvatarProps = {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

const SIZE_MAP = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-48 h-48',
};

export default function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${SIZE_MAP[size]} rounded-full object-cover ${className}`}
    />
  );
}
