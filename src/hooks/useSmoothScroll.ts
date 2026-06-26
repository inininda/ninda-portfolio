import { useScroll, useSpring, useReducedMotion } from 'motion/react'

export function useSmoothScroll() {
  const shouldReduce = useReducedMotion()
  const { scrollY } = useScroll()

  const springConfig = shouldReduce
    ? { damping: 1000, stiffness: 10000, mass: 0.8 }
    : { damping: 40, stiffness: 300, mass: 0.8 }

  const smoothY = useSpring(scrollY, springConfig)

  return smoothY
}
