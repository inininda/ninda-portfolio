import { motion, useReducedMotion } from 'motion/react'
import Container from '@/components/layout/Container'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { journeyData, metricsData, skillsData } from '@/data/aboutData'
import { cn } from '@/lib/utils'
import JourneyLog from './JourneyLog'
import AboutSkills from './AboutSkills'
import AboutMetrics from './AboutMetrics'

interface AboutSectionProps {
  isDark?: boolean
}

export default function AboutSection({ isDark = true }: AboutSectionProps) {
  const shouldReduce = useReducedMotion()
  const container = shouldReduce ? {} : staggerContainer
  const item = shouldReduce ? {} : fadeInUp

  const divider = isDark ? 'border-white/10' : 'border-stone-200'

  return (
    <section id="about" className="py-20 md:py-32">
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
              // log.entry — deep_space
            </motion.span>
            <motion.h2
              variants={item}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              <span className={isDark ? 'text-white' : 'text-stone-900'}>About </span>
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Me
              </span>
            </motion.h2>
          </motion.div>

          {/* Two-column body */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">

            {/* Left: mission log + work history */}
            <div className="flex flex-col gap-12">
              <JourneyLog entries={journeyData} isDark={isDark} />
            </div>

            {/* Right: tech stack + metrics */}
            <div className="flex flex-col gap-12">
              <AboutSkills skills={skillsData} isDark={isDark} />
              <div className={cn('border-t', divider)} />
              <AboutMetrics metrics={metricsData} isDark={isDark} />
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}
