import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'motion/react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  value: string
  label: string
  animated?: boolean
  isDark?: boolean
  className?: string
}

// Splits "40+" into { num: 40, suffix: "+" }
function parseValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^(\d+)(.*)$/)
  return match ? { num: parseInt(match[1], 10), suffix: match[2] } : { num: 0, suffix: val }
}

export default function StatCard({
  value,
  label,
  animated = false,
  isDark = true,
  className,
}: StatCardProps) {
  const { num, suffix } = parseValue(value)
  const [display, setDisplay] = useState(animated ? `0${suffix}` : value)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!animated || !inView) return
    const controls = animate(0, num, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    })
    return () => controls.stop()
  }, [animated, inView, num, suffix])

  return (
    <div ref={ref} className={cn('flex flex-col gap-1', className)}>
      <span
        className={cn(
          'text-3xl font-bold tracking-tight tabular-nums',
          isDark ? 'text-white' : 'text-stone-700',
        )}
      >
        {display}
      </span>
      <span className={cn('text-sm', isDark ? 'text-white/50' : 'text-stone-500')}>{label}</span>
    </div>
  )
}
