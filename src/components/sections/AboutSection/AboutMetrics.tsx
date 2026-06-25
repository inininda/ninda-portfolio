import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeInUp } from '@/lib/motion'
import StatCard from '@/components/ui/StatCard'
import type { Metric } from '@/types/about'
import { cn } from '@/lib/utils'

interface AboutMetricsProps {
  metrics: Metric[]
  isDark?: boolean
  className?: string
}

export default function AboutMetrics({ metrics, isDark = true, className }: AboutMetricsProps) {
  const shouldReduce = useReducedMotion()
  const container = shouldReduce ? {} : staggerContainer
  const item = shouldReduce ? {} : fadeInUp

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn('grid grid-cols-2 gap-6', className)}
    >
      {metrics.map((metric) => (
        <motion.div key={metric.label} variants={item}>
          <StatCard
            value={metric.value}
            label={metric.label}
            animated={!shouldReduce}
            isDark={isDark}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
