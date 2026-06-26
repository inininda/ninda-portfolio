import Badge from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { Experience } from '@/types/experience'

interface ExperienceItemProps {
  entry: Experience
  isDark: boolean
}

export default function ExperienceItem({ entry, isDark }: ExperienceItemProps) {
  const roleColor = isDark ? 'text-white' : 'text-stone-900'
  const companyColor = isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'
  const locationColor = isDark ? 'text-white/50' : 'text-stone-400'
  const responsibilityColor = isDark ? 'text-white/50' : 'text-stone-500'
  const bulletColor = isDark ? 'text-white/50' : 'text-stone-300'

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h3 className={cn('font-sans text-base font-semibold', roleColor)}>{entry.role}</h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
          {entry.company && (
            entry.companyUrl ? (
              <a
                href={entry.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('font-mono text-sm transition-colors duration-150', companyColor)}
              >
                @{entry.company}
              </a>
            ) : (
              <span className={cn('font-mono text-sm', companyColor)}>@{entry.company}</span>
            )
          )}
          {entry.location && (
            <span className={cn('font-mono text-xs', locationColor)}>{entry.location}</span>
          )}
        </div>
      </div>

      {entry.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.stack.map((tech) => (
            <Badge key={tech} label={tech} isDark={isDark} />
          ))}
        </div>
      )}

      <ul className="flex flex-col gap-1.5">
        {entry.responsibilities.map((r) => (
          <li key={r} className="flex items-start gap-2">
            <span className={cn('mt-px shrink-0 font-mono text-xs leading-5', bulletColor)}>{'>'}</span>
            <span className={cn('font-mono text-xs leading-5', responsibilityColor)}>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
