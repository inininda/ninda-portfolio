import { cn } from '@/lib/utils'
import type { ProjectStatus } from '@/types/projects'

interface StatusBadgeProps {
  status: ProjectStatus
  className?: string
}

type StatusConfig = { label: string; dot: string; text: string; ring: string }

const config: Record<ProjectStatus, StatusConfig> = {
  live: {
    label: 'Live',
    dot: 'bg-green-400 animate-pulse',
    text: 'text-green-400',
    ring: 'bg-green-400/10 ring-1 ring-green-400/20',
  },
  'in-progress': {
    label: 'In Progress',
    dot: 'bg-amber-400 animate-blink',
    text: 'text-amber-400',
    ring: 'bg-amber-400/10 ring-1 ring-amber-400/20',
  },
  archived: {
    label: 'Archived',
    dot: 'bg-neutral-500',
    text: 'text-neutral-400',
    ring: 'bg-neutral-500/10 ring-1 ring-neutral-500/20',
  },
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const c = config[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-mono',
        c.ring,
        c.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', c.dot)} />
      {c.label}
    </span>
  )
}
