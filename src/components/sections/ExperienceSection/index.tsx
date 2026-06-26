import { motion, useReducedMotion } from 'motion/react'
import Container from '@/components/layout/Container'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { experienceData } from '@/data/experienceData'
import { cn } from '@/lib/utils'
import ExperienceTimeline from './ExperienceTimeline'

interface ExperienceSectionProps {
  isDark?: boolean
}

export default function ExperienceSection({ isDark = true }: ExperienceSectionProps) {
  const shouldReduce = useReducedMotion() ?? false
  const container = shouldReduce ? {} : staggerContainer
  const item = shouldReduce ? {} : fadeInUp

  return (
    <section id="experience" className="py-20 md:py-32 overflow-hidden">
      <Container>
        <div className="flex flex-col gap-16">

          {/* Heading */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col gap-2"
          >
            <motion.span
              variants={item}
              className={cn(
                'font-mono text-xs uppercase tracking-[0.2em]',
                isDark ? 'text-white/50' : 'text-stone-400',
              )}
            >
              // deployment.log — mission_history
            </motion.span>
            <motion.h2
              variants={item}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              <span className={isDark ? 'text-white' : 'text-stone-900'}>Flight </span>
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Record
              </span>
            </motion.h2>
          </motion.div>

          {/* Timeline */}
          <ExperienceTimeline
            entries={experienceData}
            isDark={isDark}
            shouldReduce={shouldReduce}
          />

        </div>
      </Container>
    </section>
  )
}
