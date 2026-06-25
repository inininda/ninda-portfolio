import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
  showLabel?: boolean
  className?: string
}

export default function ThemeToggle({ isDark, onToggle, showLabel = false, className }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'flex items-center gap-2 bg-transparent border-none cursor-pointer',
        'opacity-70 hover:opacity-100 transition-opacity duration-200',
        showLabel ? 'text-sm font-medium' : 'text-xl leading-none p-1',
        className
      )}
    >
      <span className="text-xl leading-none">{isDark ? '☀️' : '🌙'}</span>
      {showLabel && (
        <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
      )}
    </button>
  )
}
