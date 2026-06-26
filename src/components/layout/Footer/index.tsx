import { motion, useReducedMotion } from 'motion/react'
import { fadeIn } from '@/lib/motion'
import { cn } from '@/lib/utils'
import Container from '@/components/layout/Container'
import { navData } from '@/data/navData'

interface FooterProps {
  isDark?: boolean
  activeHref?: string
  onNavClick?: (href: string) => void
}

export default function Footer({ isDark = true, activeHref, onNavClick }: FooterProps) {
  const shouldReduce = useReducedMotion() ?? false
  const variant = shouldReduce ? {} : fadeIn

  const mutedText = isDark ? 'text-white/50' : 'text-stone-400'
  const borderColor = isDark ? 'border-white/10' : 'border-zinc-300'
  const logoColor = isDark ? 'text-white' : 'text-stone-700'

  return (
    <motion.footer
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn('border-t', borderColor)}
    >
      <Container>
        <div className="py-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Left: logo + tagline */}
          <div className="flex flex-col gap-1">
            <a
              href="#home"
              onClick={() => onNavClick?.('#home')}
              className={cn(
                'text-xl font-bold tracking-tight transition-opacity duration-200 hover:opacity-70',
                logoColor,
              )}
            >
              ninda.
            </a>
            <span className={cn('font-mono text-xs', mutedText)}>
              Built in the void between blocks.
            </span>
          </div>

          {/* Right: nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            {navData.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => onNavClick?.(item.href)}
                className={cn(
                  'font-mono text-xs tracking-wide transition-opacity duration-200',
                  activeHref === item.href
                    ? isDark
                      ? 'text-white'
                      : 'text-stone-700'
                    : cn(mutedText, 'hover:opacity-70'),
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

        </div>

        {/* Copyright */}
        <div className={cn('pb-6 text-center font-mono text-xs', isDark ? 'text-white/50' : 'text-zinc-400')}>
          © {new Date().getFullYear()} ninda. ALL SYSTEMS NOMINAL.
        </div>
      </Container>
    </motion.footer>
  )
}
