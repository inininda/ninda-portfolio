import type { Variants } from 'motion/react'
import { motion } from 'motion/react'
import type { Certification } from '@/types/skills'
import { cn } from '@/lib/utils'

interface CertificationCardProps {
  cert: Certification
  variants: Variants
  isDark: boolean
}

export default function CertificationCard({ cert, variants, isDark }: CertificationCardProps) {
  const border = isDark ? 'border-white/10 hover:border-white/20' : 'border-stone-200 hover:border-stone-300'
  const bg = isDark ? 'bg-white/[0.03]' : 'bg-stone-50'
  const muted = isDark ? 'text-white/40' : 'text-stone-400'
  const text = isDark ? 'text-white/80' : 'text-stone-700'
  const issuerColor = isDark ? 'text-sky-400' : 'text-sky-600'

  const Tag = cert.url ? 'a' : 'div'
  const linkProps = cert.url
    ? { href: cert.url, target: '_blank', rel: 'noreferrer' }
    : {}

  return (
    <motion.div variants={variants}>
      <Tag
        {...linkProps}
        className={cn(
          'flex items-start justify-between gap-4 rounded-lg border px-4 py-3 transition-colors duration-200',
          bg, border,
          cert.url && 'cursor-pointer',
        )}
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className={cn('text-sm font-medium leading-snug truncate', text)}>
            {cert.name}
          </span>
          <span className={cn('font-mono text-xs', issuerColor)}>
            {cert.issuer}
          </span>
        </div>
        <span className={cn('shrink-0 font-mono text-xs mt-0.5', muted)}>
          {cert.year}
        </span>
      </Tag>
    </motion.div>
  )
}
