import { navData } from '@/data/navData'
import { cn } from '@/lib/utils'

interface NavLinksProps {
  isDark: boolean
  activeHref: string
  onNavClick: (href: string) => void
  className?: string
}

export default function NavLinks({ isDark, activeHref, onNavClick, className }: NavLinksProps) {
  const textColor = isDark ? 'text-white/70' : 'text-stone-600'
  const activeTextColor = isDark ? 'text-white' : 'text-stone-900'

  return (
    <div className={cn('flex items-center gap-8', className)}>
      {navData.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={() => onNavClick(item.href)}
          className={cn(
            'relative text-sm font-medium py-1 transition-colors duration-200 group',
            activeHref === item.href ? activeTextColor : textColor,
            isDark ? 'hover:text-white' : 'hover:text-stone-900'
          )}
        >
          {item.label}
          <span
            className={cn(
              'absolute bottom-0 left-0 h-px transition-all duration-300',
              isDark ? 'bg-white' : 'bg-stone-900',
              activeHref === item.href ? 'w-full' : 'w-0 group-hover:w-full'
            )}
          />
        </a>
      ))}
    </div>
  )
}
