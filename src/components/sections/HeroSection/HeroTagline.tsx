import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { cn } from '@/lib/utils'

interface HeroTaglineProps {
  isDark: boolean
  variants?: Variants
  children: React.ReactNode
  className?: string
}

export default function HeroTagline({ isDark, variants, children, className }: HeroTaglineProps) {
  const bodyText = isDark ? 'text-white/60' : 'text-stone-500'

  return (
    <motion.p
      variants={variants}
      className={cn('text-base sm:text-lg leading-relaxed max-w-sm', bodyText, className)}
    >
      {children}
    </motion.p>
  )
}
