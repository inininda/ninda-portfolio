import { motion, useReducedMotion } from 'motion/react'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import SocialIconLink from '@/components/ui/SocialIconLink'
import { contactInfo } from '@/data/contactData'

interface ContactSectionProps {
  isDark?: boolean
}

export default function ContactSection({ isDark = true }: ContactSectionProps) {
  const shouldReduce = useReducedMotion() ?? false
  const container = shouldReduce ? {} : staggerContainer
  const item = shouldReduce ? {} : fadeInUp

  const mutedText = isDark ? 'text-white/50' : 'text-stone-400'
  const bodyText = isDark ? 'text-white/60' : 'text-stone-500'

  return (
    <section id="contact" className="py-20 md:py-32">
      <Container>
        <div className="flex flex-col items-center gap-10">

          {/* Heading */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <motion.span
              variants={item}
              className={cn('font-mono text-xs uppercase tracking-[0.2em]', mutedText)}
            >
              // open.channel
            </motion.span>
            <motion.h2
              variants={item}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              <span className={isDark ? 'text-white' : 'text-stone-900'}>Let&apos;s </span>
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Connect
              </span>
            </motion.h2>
            <motion.p
              variants={item}
              className={cn('font-mono text-sm mt-1', bodyText)}
            >
              {contactInfo.availability}
            </motion.p>
          </motion.div>

          {/* Email button */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Button as="a" variant="outline" isDark={isDark} href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </Button>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col items-center gap-3"
          >
            <span className={cn('font-mono text-xs tracking-[0.18em] uppercase', mutedText)}>
              OR_FIND_ME_AT
            </span>
            <div className='flex items-center gap-4'>
              {contactInfo.socials.map((social) => (
                <SocialIconLink key={social.icon} social={social} isDark={isDark} />
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
