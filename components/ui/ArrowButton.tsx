import Link from 'next/link';

export function ArrowButton({
  href,
  children,
  variant = 'solid',
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'yala';
  className?: string;
  external?: boolean;
}) {
  const base =
    'group inline-flex items-center gap-3 rounded-full px-7 py-4 text-xs font-medium uppercase tracking-wider transition-colors duration-300 ease-framer';
  const styles =
    variant === 'solid'
      ? 'bg-paper text-ink hover:bg-accent hover:text-paper'
      : variant === 'yala'
        ? 'bg-yala text-white hover:bg-yala-ink'
        : 'border border-line text-paper hover:border-accent hover:text-accent';

  return (
    <Link
      href={href}
      className={`${base} ${styles} ${className ?? ''}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
      <span aria-hidden className="inline-block transition-transform duration-300 ease-framer group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
