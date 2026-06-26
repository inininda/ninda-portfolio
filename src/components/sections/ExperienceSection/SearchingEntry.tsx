import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { Experience } from '@/types/experience'

interface SearchingEntryProps {
  entry: Experience
  isDark: boolean
}

export default function SearchingEntry({ entry, isDark }: SearchingEntryProps) {
  const cardBg = isDark
    ? 'bg-cyan-950/10 border-cyan-400/25'
    : 'bg-cyan-50 border-cyan-400/40'
  const labelColor = isDark ? 'text-cyan-400/70' : 'text-cyan-600/80'
  const roleColor = isDark ? 'text-white' : 'text-stone-900'
  const broadcastColor = isDark ? 'text-white/25' : 'text-stone-400'
  const responsibilityColor = isDark ? 'text-white/45' : 'text-stone-500'
  const bulletColor = isDark ? 'text-cyan-400/50' : 'text-cyan-500/70'

  return (
    <div className={cn('rounded-xl border border-dashed p-5', cardBg)}>
      <span
        className={cn('font-mono text-[10px] uppercase tracking-[0.2em]', labelColor)}
      >
        [ MISSION_ACTIVE ]
      </span>

      <h3 className={cn('mt-1.5 font-sans text-base font-semibold', roleColor)}>
        {entry.role}
        <motion.span
          className="ml-0.5 text-cyan-400"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'steps(1)' }}
        >
          _
        </motion.span>
      </h3>

      <p className={cn('mt-2 font-mono text-[10px] uppercase tracking-[0.2em]', broadcastColor)}>
        BROADCASTING ON ALL FREQUENCIES...
      </p>

      <ul className="mt-4 flex flex-col gap-1.5">
        {entry.responsibilities.map((r) => (
          <li key={r} className="flex items-start gap-2">
            <span className={cn('mt-px shrink-0 font-mono text-xs', bulletColor)}>▸</span>
            <span className={cn('font-mono text-xs', responsibilityColor)}>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
