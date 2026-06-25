import { motion, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeInUp } from '@/lib/motion'
import Badge from '@/components/ui/Badge'
import type { Skill, SkillGroup } from '@/types/about'
import { cn } from '@/lib/utils'

const GROUP_LABELS: Record<SkillGroup, string> = {
  fullstack: 'Fullstack',
  web3: 'Web3',
  devops: 'DevOps',
}

const GROUP_ORDER: SkillGroup[] = ['fullstack', 'web3', 'devops']

interface AboutSkillsProps {
  skills: Skill[]
  isDark?: boolean
  className?: string
}

export default function AboutSkills({ skills, isDark = true, className }: AboutSkillsProps) {
  const shouldReduce = useReducedMotion()
  const container = shouldReduce ? {} : staggerContainer
  const item = shouldReduce ? {} : fadeInUp

  const grouped = GROUP_ORDER.reduce<Record<SkillGroup, Skill[]>>(
    (acc, group) => {
      acc[group] = skills.filter((s) => s.group === group)
      return acc
    },
    { fullstack: [], web3: [], devops: [] },
  )

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn('grid grid-cols-1 gap-6 sm:grid-cols-3', className)}
    >
      {GROUP_ORDER.map((group) => (
        <motion.div key={group} variants={item} className="flex flex-col gap-3">
          <span
            className={cn(
              'font-mono text-xs uppercase tracking-widest',
              isDark ? 'text-white/30' : 'text-stone-400',
            )}
          >
            // {GROUP_LABELS[group]}
          </span>
          <div className="flex flex-wrap gap-2">
            {grouped[group].map((skill) => (
              <Badge key={skill.name} label={skill.name} isDark={isDark} />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
