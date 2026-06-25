import { cn } from '@/lib/utils'

interface TerminalWindowProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export default function TerminalWindow({ children, title = 'terminal', className }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden border border-white/10 bg-black/70 backdrop-blur-sm font-mono text-sm',
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-white/30">{title}</span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-0.5">{children}</div>
    </div>
  )
}
