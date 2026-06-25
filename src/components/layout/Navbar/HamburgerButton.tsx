import { cn } from '@/lib/utils'

interface HamburgerButtonProps {
  isDark: boolean
  onClick: () => void
  className?: string
}

export default function HamburgerButton({ isDark, onClick, className }: HamburgerButtonProps) {
  const barColor = isDark ? 'bg-white' : 'bg-stone-800'

  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      className={cn(
        'md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5',
        'bg-transparent border-none cursor-pointer',
        className
      )}
    >
      <span className={cn('block w-5 h-px', barColor)} />
      <span className={cn('block w-5 h-px', barColor)} />
      <span className={cn('block w-5 h-px', barColor)} />
    </button>
  )
}
