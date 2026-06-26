import { cn } from '@/lib/utils'
import type { SocialLink } from '@/data/socialData'
import SocialIcon from '@/components/ui/SocialIcon'

interface SocialIconLinkProps {
  social: SocialLink
  isDark?: boolean
  className?: string
}

export default function SocialIconLink({ social, isDark = true, className }: SocialIconLinkProps) {
  const isExternal = social.icon !== 'email'

  return (
    <a
      href={social.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={social.label}
      className={cn(
        'transition-all duration-200 hover:scale-110',
        isDark ? 'text-white/50 hover:text-white' : 'text-stone-400 hover:text-stone-900',
        className
      )}
    >
      <SocialIcon icon={social.icon} />
    </a>
  )
}
