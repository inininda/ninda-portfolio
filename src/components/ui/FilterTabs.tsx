import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Tab {
  label: string
  value: string
}

interface FilterTabsProps {
  tabs: Tab[]
  active: string
  onChange: (value: string) => void
  isDark?: boolean
  className?: string
}

export default function FilterTabs({
  tabs,
  active,
  onChange,
  isDark = true,
  className,
}: FilterTabsProps) {
  const border = isDark ? 'border-white/10' : 'border-stone-200'
  const activeText = isDark ? 'text-white' : 'text-stone-900'
  const mutedText = isDark ? 'text-white/40' : 'text-stone-400'
  const indicator = isDark ? 'bg-white/10' : 'bg-stone-200'

  return (
    <div className={cn('inline-flex flex-wrap gap-1 rounded-full border p-1', border, className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'relative rounded-full px-3 py-1.5 text-xs font-mono transition-colors duration-150',
            active === tab.value ? activeText : mutedText,
          )}
        >
          {active === tab.value && (
            <motion.span
              layoutId="filter-tab-indicator"
              className={cn('absolute inset-0 rounded-full', indicator)}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
