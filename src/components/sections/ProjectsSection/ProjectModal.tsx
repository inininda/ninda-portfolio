import Modal from '@/components/ui/Modal'
import StatusBadge from '@/components/ui/StatusBadge'
import Badge from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/projects'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  isDark?: boolean
}

export default function ProjectModal({ project, onClose, isDark = true }: ProjectModalProps) {
  const headingText = isDark ? 'text-white' : 'text-stone-700'
  const bodyText = isDark ? 'text-white/60' : 'text-stone-600'
  const divider = isDark ? 'border-white/10' : 'border-stone-200'
  const labelText = isDark ? 'text-white/50' : 'text-stone-400'
  const closeBtnColor = isDark
    ? 'text-white/50 hover:text-white hover:bg-white/10'
    : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
  const demoLinkColor = isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'
  const repoLinkColor = isDark ? 'text-white/50 hover:text-white' : 'text-stone-500 hover:text-stone-700'

  return (
    <Modal isOpen={project !== null} onClose={onClose}>
      {project && (
        <div className="flex flex-col gap-6 p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className={cn('font-mono text-lg font-bold', headingText)}>{project.name}</h2>
              <StatusBadge status={project.status} />
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className={cn(
                'shrink-0 rounded-full p-1.5 transition-colors duration-150',
                closeBtnColor,
              )}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M3.293 3.293a1 1 0 011.414 0L8 6.586l3.293-3.293a1 1 0 111.414 1.414L9.414 8l3.293 3.293a1 1 0 01-1.414 1.414L8 9.414l-3.293 3.293a1 1 0 01-1.414-1.414L6.586 8 3.293 4.707a1 1 0 010-1.414z" />
              </svg>
            </button>
          </div>

          <div className={cn('border-t', divider)} />

          {/* Description */}
          <p className={cn('text-sm leading-relaxed', bodyText)}>{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-col gap-2">
            <span className={cn('font-mono text-xs uppercase tracking-widest', labelText)}>
              // stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} label={tech} isDark={isDark} />
              ))}
            </div>
          </div>

          {/* Asset gallery */}
          {project.assets && project.assets.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className={cn('font-mono text-xs uppercase tracking-widest', labelText)}>
                // assets
              </span>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {project.assets.map((asset) => (
                  <img
                    key={asset}
                    src={`/projects/${asset}`}
                    alt={`${project.name} screenshot`}
                    className="h-32 w-auto shrink-0 rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(project.demoUrl || project.githubUrl) && (
            <div className={cn('flex flex-wrap gap-4 border-t pt-4', divider)}>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('font-mono text-xs transition-colors duration-150', demoLinkColor)}
                >
                  ▶ DEMO
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('font-mono text-xs transition-colors duration-150', repoLinkColor)}
                >
                  {'</>'} REPO
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
