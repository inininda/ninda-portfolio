import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate as animateValue, useReducedMotion } from 'motion/react'
import type { SkillGroup } from '@/types/skills'
import { cn } from '@/lib/utils'

// Neon fill and dim track colors per group
const GROUP_FILL: Record<SkillGroup, string> = {
  frontend:     'rgba(34,211,238,1)',
  mobile:       'rgba(244,114,182,1)',
  backend:      'rgba(74,222,128,1)',
  databases:    'rgba(251,146,60,1)',
  blockchain:   'rgba(167,139,250,1)',
  testing:      'rgba(248,113,113,1)',
  build:        'rgba(250,204,21,1)',
  state:        'rgba(129,140,248,1)',
  professional: 'rgba(45,212,191,1)',
  ai:           'rgba(192,132,252,1)',
  aitools:      'rgba(56,189,248,1)',
}

const GROUP_TRACK: Record<SkillGroup, string> = {
  frontend:     'rgba(34,211,238,0.12)',
  mobile:       'rgba(244,114,182,0.12)',
  backend:      'rgba(74,222,128,0.12)',
  databases:    'rgba(251,146,60,0.12)',
  blockchain:   'rgba(167,139,250,0.12)',
  testing:      'rgba(248,113,113,0.12)',
  build:        'rgba(250,204,21,0.12)',
  state:        'rgba(129,140,248,0.12)',
  professional: 'rgba(45,212,191,0.12)',
  ai:           'rgba(192,132,252,0.12)',
  aitools:      'rgba(56,189,248,0.12)',
}

interface SkillBarProps {
  name: string
  proficiency: number
  group: SkillGroup
  isDark?: boolean
  className?: string
}

export default function SkillBar({ name, proficiency, group, isDark = true, className }: SkillBarProps) {
  const shouldReduce = useReducedMotion()
  const [count, setCount] = useState(shouldReduce ? proficiency : 0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (shouldReduce || !inView) return
    const controls = animateValue(0, proficiency, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, shouldReduce, proficiency])

  const fill = GROUP_FILL[group]
  const track = GROUP_TRACK[group]

  return (
    <div ref={ref} className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'w-32 shrink-0 font-mono text-xs uppercase tracking-wider',
          isDark ? 'text-white/50' : 'text-stone-500',
        )}
      >
        {name}
      </span>

      {/* Segmented bar — repeating-linear-gradient gives the block/tick aesthetic */}
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-sm" style={{ background: track }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-sm"
          initial={{ width: shouldReduce ? `${proficiency}%` : '0%' }}
          animate={inView ? { width: `${proficiency}%` } : undefined}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            background: `repeating-linear-gradient(
              90deg,
              ${fill} 0px,
              ${fill} 5px,
              transparent 5px,
              transparent 7px
            )`,
          }}
        />
      </div>

      <span
        className={cn(
          'w-8 shrink-0 text-right font-mono text-xs tabular-nums',
          isDark ? 'text-white/50' : 'text-stone-400',
        )}
      >
        {count}%
      </span>
    </div>
  )
}
