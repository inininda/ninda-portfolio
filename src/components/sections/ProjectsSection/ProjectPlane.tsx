import { cn } from '@/lib/utils'
import type { Project, ProjectStatus } from '@/types/projects'

// Pure visual component — interaction (click, hover scale) is owned by the
// PlaneCard wrapper in PlaneGrid so that 3D positioning and click handling
// live in the same element.
interface ProjectPlaneProps {
  project: Project
  index: number
  isDark?: boolean
}

const statusDot: Record<ProjectStatus, string> = {
  live: 'bg-green-400 animate-pulse',
  'in-progress': 'bg-amber-400 animate-blink',
  archived: 'bg-neutral-500',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 3)
}

export default function ProjectPlane({ project, index, isDark = true }: ProjectPlaneProps) {
  const label = String(index + 1).padStart(2, '0')

  const cardBg = isDark ? 'bg-neutral-900/90 border-blue-900/40' : 'bg-stone-100 border-stone-300'
  const indexColor = isDark ? 'text-white/50' : 'text-stone-400'
  const initialsColor = isDark ? 'text-white/50' : 'text-zinc-400'

  return (
    <>
      {/* Card face — fills the 320×384 PlaneCard container from PlaneGrid */}
      <div className={cn('relative h-full w-full overflow-hidden rounded-xl border', cardBg)}>
        <span
          className={cn('absolute left-4 top-3 z-10 font-mono text-xs tracking-widest', indexColor)}
        >
          {label}
        </span>

        <span
          className={cn(
            'absolute right-4 top-3.5 z-10 h-2 w-2 rounded-full',
            statusDot[project.status],
          )}
        />

        {project.cover ? (
          <img
            src={project.cover}
            alt={project.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className={cn('select-none font-mono text-5xl font-bold', initialsColor)}>
              {getInitials(project.name)}
            </span>
          </div>
        )}
      </div>

      {/* Hover label — `group` lives on the PlaneCard so group-hover works here.
          `left-full` positions it just past the 320px card right edge. */}
      <div
        className={cn(
          'pointer-events-none absolute left-full top-1/2 hidden -translate-y-1/2 items-center gap-2 pl-3 lg:flex',
          'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
        )}
      >
        <div className="h-px w-8 bg-white/30" />
        <span className="whitespace-nowrap font-mono text-xs tracking-widest text-white/80">
          {project.name}
        </span>
      </div>
    </>
  )
}
