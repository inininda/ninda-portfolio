import { motion, useReducedMotion } from 'motion/react'
import Container from '@/components/layout/Container'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { skillsData, certificationsData } from '@/data/skillsData'
import type { SkillGroup as SkillGroupType } from '@/types/skills'
import { cn } from '@/lib/utils'
import SkillGroup from './SkillGroup'
import CertificationCard from '@/components/ui/CertificationCard'

const GROUP_ORDER: SkillGroupType[] = [
  'frontend', 'mobile', 'backend', 'databases',
  'blockchain', 'testing', 'build', 'state',
  'professional', 'ai', 'aitools',
]

interface SkillsSectionProps {
  isDark?: boolean
}

export default function SkillsSection({ isDark = true }: SkillsSectionProps) {
  const shouldReduce = useReducedMotion()
  const container = shouldReduce ? {} : staggerContainer
  const item = shouldReduce ? {} : fadeInUp

  const grouped = GROUP_ORDER.reduce<Record<SkillGroupType, typeof skillsData>>(
    (acc, g) => {
      acc[g] = skillsData.filter((s) => s.group === g)
      return acc
    },
    { frontend: [], mobile: [], backend: [], databases: [], blockchain: [], testing: [], build: [], state: [], professional: [], ai: [], aitools: [] },
  )

  return (
    <section id="skills" className="py-20 md:py-32 overflow-hidden">
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
              // sys.scan — crew_manifest
            </motion.span>
            <motion.h2
              variants={item}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              <span className={isDark ? 'text-white' : 'text-stone-700'}>System </span>
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Diagnostics
              </span>
            </motion.h2>
          </motion.div>

          {/* Skill groups — 2-col grid on md+ */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-12 md:grid-cols-2"
          >
            {GROUP_ORDER.map((group) => (
              <SkillGroup
                key={group}
                group={group}
                skills={grouped[group]}
                itemVariants={item}
                isDark={isDark}
              />
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col gap-5"
          >
            <motion.div variants={item} className="flex items-center gap-3">
              <span className={cn('shrink-0 font-mono text-xs uppercase tracking-[0.2em]', isDark ? 'text-white/50' : 'text-stone-400')}>
                [ certifications ]
              </span>
              <div className={cn('flex-1 border-t', isDark ? 'border-white/10' : 'border-stone-200')} />
            </motion.div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {certificationsData.map((cert) => (
                <CertificationCard key={cert.name} cert={cert} variants={item} isDark={isDark} />
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
