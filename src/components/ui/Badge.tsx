import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  isDark?: boolean
  className?: string
}

export default function Badge({ label, isDark = true, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-1 text-xs font-medium',
        isDark
          ? 'bg-white/10 text-white/80 ring-1 ring-white/10'
          : 'bg-stone-100 text-stone-700 ring-1 ring-stone-200',
        className,
      )}
    >
      {label}
    </span>
  )
}
