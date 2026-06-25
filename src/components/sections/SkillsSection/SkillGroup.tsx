import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import type { Skill, SkillGroup as SkillGroupType } from '@/types/skills'
import SkillBar from '@/components/ui/SkillBar'
import { cn } from '@/lib/utils'

const GROUP_LABELS: Record<SkillGroupType, string> = {
  fullstack: 'fullstack',
  web3: 'web3',
  devops: 'devops',
  tools: 'tools',
}

interface SkillGroupProps {
  group: SkillGroupType
  skills: Skill[]
  itemVariants: Variants
  isDark?: boolean
  className?: string
}

export default function SkillGroup({
  group,
  skills,
  itemVariants,
  isDark = true,
  className,
}: SkillGroupProps) {
  const mutedText = isDark ? 'text-white/25' : 'text-stone-400'
  const divider = isDark ? 'border-white/10' : 'border-stone-200'

  return (
    <motion.div variants={itemVariants} className={cn('flex flex-col gap-5', className)}>
      {/* Group header: [ LABEL ] ──────── */}
      <div className="flex items-center gap-3">
        <span className={cn('shrink-0 font-mono text-xs uppercase tracking-[0.2em]', mutedText)}>
          [ {GROUP_LABELS[group]} ]
        </span>
        <div className={cn('flex-1 border-t', divider)} />
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-3">
        {skills.map((skill) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            proficiency={skill.proficiency}
            group={skill.group}
            isDark={isDark}
          />
        ))}
      </div>
    </motion.div>
  )
}
