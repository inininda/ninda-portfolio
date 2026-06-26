import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import type { JourneyEntry as JourneyEntryType } from '@/types/about'
import { cn } from '@/lib/utils'

interface JourneyEntryProps {
  entry: JourneyEntryType
  variants: Variants
  isDark?: boolean
  isLast?: boolean
}

export default function JourneyEntry({
  entry,
  variants,
  isDark = true,
  isLast = false,
}: JourneyEntryProps) {
  const mutedText = isDark ? 'text-white/50' : 'text-stone-400'
  const bodyText = isDark ? 'text-white/60' : 'text-stone-500'
  const titleText = isDark ? 'text-white' : 'text-stone-900'
  const dotBg = isDark ? 'bg-cyan-400' : 'bg-cyan-500'
  const lineBg = isDark ? 'border-white/10' : 'border-stone-200'

  return (
    <motion.div variants={variants} className="relative flex gap-6">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div className={cn('mt-1 h-2.5 w-2.5 shrink-0 rounded-full', dotBg)} />
        {!isLast && <div className={cn('mt-2 w-px flex-1 border-l', lineBg)} />}
      </div>

      {/* Content */}
      <div className={cn('flex flex-col gap-1 pb-10', isLast && 'pb-0')}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <span className={cn('font-mono text-xs tracking-widest uppercase', mutedText)}>
            [{entry.year}]
          </span>
          <span className={cn('font-mono text-xs tracking-widest uppercase', 'text-cyan-400/70')}>
            {entry.code}
          </span>
        </div>
        <p className={cn('text-sm font-semibold sm:text-base', titleText)}>{entry.title}</p>
        <p className={cn('text-sm leading-relaxed', bodyText)}>{entry.description}</p>
      </div>
    </motion.div>
  )
}
