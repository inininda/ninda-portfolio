import { motion } from 'motion/react'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { Experience } from '@/types/experience'
import ExperienceItem from './ExperienceItem'
import SearchingEntry from './SearchingEntry'

interface ExperienceTimelineProps {
  entries: Experience[]
  isDark: boolean
  shouldReduce: boolean
}

const spineColor = {
  dark: 'border-white/10',
  light: 'border-stone-200',
}

const dotActive = {
  dark: 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]',
  light: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]',
}

const dotDone = {
  dark: 'bg-white/25 ring-1 ring-white/10',
  light: 'bg-stone-300 ring-1 ring-stone-200',
}

const dateColor = {
  dark: 'text-white/25',
  light: 'text-stone-400',
}

const theme = (isDark: boolean) => ({
  spine: isDark ? spineColor.dark : spineColor.light,
  dotActive: isDark ? dotActive.dark : dotActive.light,
  dotDone: isDark ? dotDone.dark : dotDone.light,
  date: isDark ? dateColor.dark : dateColor.light,
})

function DateLabel({ entry, className }: { entry: Experience; className?: string }) {
  return (
    <span className={className}>
      {entry.startDate}
      {entry.endDate !== entry.startDate && (
        <> –{' '}{entry.endDate === 'present' ? 'NOW' : entry.endDate}</>
      )}
    </span>
  )
}

export default function ExperienceTimeline({ entries, isDark, shouldReduce }: ExperienceTimelineProps) {
  const t = theme(isDark)
  const list = shouldReduce ? {} : staggerContainer
  const item = shouldReduce ? {} : fadeInUp

  return (
    /*
      Mobile  (<sm): spine at left-3 (12px), entries have pl-8 so content is full-width.
                     Date shown inline above each entry's content.
      sm+          : spine at left-[6.75rem], date in its own w-28 column on the left.
    */
    <div className="relative pl-8 sm:pl-0">
      {/* Animated spine */}
      <motion.div
        className={cn(
          'absolute left-3 top-0 h-full border-l-2 sm:left-[6.75rem]',
          t.spine,
        )}
        initial={shouldReduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
      />

      <motion.div
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col"
      >
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            variants={item}
            className="relative pb-12 last:pb-0 sm:flex sm:items-start sm:gap-0"
          >
            {/* Date column — sm+ only, left side */}
            <div className="hidden sm:block sm:w-28 sm:shrink-0 sm:pt-1.5 sm:pr-5 sm:text-right">
              <DateLabel
                entry={entry}
                className={cn('font-mono text-xs tracking-wider', t.date)}
              />
            </div>

            {/* Dot — mobile: centered on left-3 spine; sm+: centered on left-[6.75rem] spine */}
            <div
              className={cn(
                'absolute z-10 -translate-x-1/2',
                entry.isSearching
                  ? '-left-5 top-[0.45rem] sm:left-[6.75rem]'
                  : '-left-5 top-2 sm:left-[6.75rem]',
              )}
            >
              {entry.isSearching ? (
                <motion.div
                  className={cn('h-3 w-3 rounded-full', t.dotActive)}
                  animate={shouldReduce ? {} : { scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              ) : (
                <div className={cn('h-2.5 w-2.5 rounded-full', t.dotDone)} />
              )}
            </div>

            {/* Content */}
            <div className="sm:flex-1 sm:pl-10">
              {/* Date shown inline on mobile only */}
              <DateLabel
                entry={entry}
                className={cn(
                  'mb-2 block font-mono text-xs tracking-wider sm:hidden',
                  t.date,
                )}
              />

              {entry.isSearching ? (
                <SearchingEntry entry={entry} isDark={isDark} />
              ) : (
                <ExperienceItem entry={entry} isDark={isDark} />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
