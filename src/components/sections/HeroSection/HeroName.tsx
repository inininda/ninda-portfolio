import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { cn } from '@/lib/utils'

interface HeroNameProps {
  isDark: boolean
  variants?: Variants
}

export default function HeroName({ isDark, variants }: HeroNameProps) {
  const headingPrimary = isDark ? 'text-white' : 'text-stone-900'
  const headingMuted = isDark ? 'text-white/30' : 'text-stone-300'

  return (
    <motion.h1 variants={variants} className="leading-none mb-8 tracking-tight">
      <span
        className={cn(
          'block text-6xl sm:text-7xl lg:text-8xl font-extralight italic',
          headingMuted
        )}
      >
        Ninda
      </span>
      <span
        className={cn(
          'block text-6xl sm:text-7xl lg:text-8xl font-black not-italic',
          headingPrimary
        )}
      >
        Mawarni.
      </span>
    </motion.h1>
  )
}
