import { motion, useReducedMotion } from 'motion/react'
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { socialData } from '@/data/socialData'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import TerminalWindow from '@/components/ui/TerminalWindow'
import SocialIconLink from '@/components/ui/SocialIconLink'

interface HeroSectionProps {
  isDark: boolean
  onViewWork: () => void
}

type TerminalLine =
  | { type: 'cmd'; text: string }
  | { type: 'out'; text: string }
  | { type: 'kv'; key: string; val: string }
  | { type: 'gap' }

const terminalLines: TerminalLine[] = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'ninda_mawarni' },
  { type: 'gap' },
  { type: 'cmd', text: 'get_status --current' },
  { type: 'kv', key: 'role  ', val: '"Frontend Developer"' },
  { type: 'kv', key: 'stack ', val: '["React", "TypeScript", "Tailwind"]' },
  { type: 'kv', key: 'status', val: '"Open to opportunities"' },
  { type: 'kv', key: 'based ', val: '"Indonesia"' },
]

export default function HeroSection({ isDark, onViewWork }: HeroSectionProps) {
  const shouldReduce = useReducedMotion()
  const leftContainer = shouldReduce ? {} : staggerContainer
  const leftItem = shouldReduce ? {} : fadeInUp

  const mutedText = isDark ? 'text-white/40' : 'text-stone-400'
  const bodyText = isDark ? 'text-white/60' : 'text-stone-500'
  const headingPrimary = isDark ? 'text-white' : 'text-stone-900'
  const headingMuted = isDark ? 'text-white/30' : 'text-stone-300'

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <Container className="pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left column ── */}
          <motion.div
            variants={leftContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <motion.p
              variants={leftItem}
              className={cn('text-xs font-mono tracking-[0.2em] uppercase mb-8', mutedText)}
            >
              // portfolio.v2025
            </motion.p>

            {/* Name — mixed typography */}
            <motion.h1
              variants={leftItem}
              className="leading-none mb-8 tracking-tight"
            >
              <span
                className={cn(
                  'block text-6xl sm:text-7xl lg:text-8xl font-extralight italic',
                  headingMuted
                )}
              >
                Ninda
              </span>
              <span
                className={cn(
                  'block text-6xl sm:text-7xl lg:text-8xl font-black not-italic',
                  headingPrimary
                )}
              >
                Mawarni.
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={leftItem}
              className={cn('text-base sm:text-lg leading-relaxed max-w-sm', bodyText)}
            >
              Crafting clean, animated interfaces at the intersection of design and engineering.
            </motion.p>
          </motion.div>

          {/* ── Right column ── */}
          <motion.div
            variants={shouldReduce ? {} : staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Terminal */}
            <motion.div variants={shouldReduce ? {} : fadeIn}>
              <TerminalWindow>
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={shouldReduce ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.2 }}
                  >
                    {line.type === 'gap' && <div className="h-2" />}

                    {line.type === 'cmd' && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 select-none">$</span>
                        <span className="text-white">{line.text}</span>
                      </div>
                    )}

                    {line.type === 'out' && (
                      <div className="pl-4 text-green-300">{line.text}</div>
                    )}

                    {line.type === 'kv' && (
                      <div className="pl-4 flex gap-3">
                        <span className="text-cyan-400 shrink-0">{line.key}</span>
                        <span className="text-white/70">{line.val}</span>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.div
                  initial={shouldReduce ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: terminalLines.length * 0.1 + 0.4 }}
                  className="flex items-center gap-2 pt-1"
                >
                  <span className="text-green-400 select-none">$</span>
                  <span className="inline-block w-2 h-4 bg-green-400 animate-blink" />
                </motion.div>
              </TerminalWindow>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={shouldReduce ? {} : fadeInUp}
              className="flex flex-wrap gap-3"
            >
              <Button variant="primary" isDark={isDark} onClick={onViewWork}>
                View Work <span aria-hidden="true">→</span>
              </Button>

              <Button as="a" variant="outline" isDark={isDark} href="/cv.pdf" download>
                Download CV <span aria-hidden="true">↓</span>
              </Button>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={shouldReduce ? {} : fadeInUp}
              className="flex items-center gap-4"
            >
              {socialData.map((social) => (
                <SocialIconLink key={social.icon} social={social} isDark={isDark} />
              ))}

              <span className={cn('ml-1 text-xs', isDark ? 'text-white/20' : 'text-stone-300')}>
                —
              </span>
              <span className={cn('text-xs font-mono', isDark ? 'text-white/25' : 'text-stone-400')}>
                let's connect
              </span>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
