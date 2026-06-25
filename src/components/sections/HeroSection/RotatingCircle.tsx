import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface RotatingCircleProps {
  text?: string
  isDark?: boolean
  className?: string
}

export default function RotatingCircle({
  text = 'Frontend Developer • Available for work • ',
  isDark = true,
  className,
}: RotatingCircleProps) {
  const shouldReduce = useReducedMotion()
  const pathId = useId()

  return (
    <div className={cn('relative w-32 h-32', className)}>
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        animate={shouldReduce ? {} : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <defs>
          <path
            id={pathId}
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fontSize="9"
          letterSpacing="2.5"
          style={{ fill: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(68,64,60,0.5)' }}
        >
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </motion.svg>
    </div>
  )
}
