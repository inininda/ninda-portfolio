import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeInUp } from '@/lib/motion'
import type { JourneyEntry as JourneyEntryType } from '@/types/about'
import JourneyEntry from './JourneyEntry'
import { cn } from '@/lib/utils'

interface JourneyLogProps {
  entries: JourneyEntryType[]
  isDark?: boolean
  className?: string
}

export default function JourneyLog({ entries, isDark = true, className }: JourneyLogProps) {
  const shouldReduce = useReducedMotion()
  const container = shouldReduce ? {} : staggerContainer
  const item = shouldReduce ? {} : fadeInUp

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn('flex flex-col', className)}
    >
      {entries.map((entry, i) => (
        <JourneyEntry
          key={entry.code}
          entry={entry}
          variants={item}
          isDark={isDark}
          isLast={i === entries.length - 1}
        />
      ))}
    </motion.div>
  )
}
