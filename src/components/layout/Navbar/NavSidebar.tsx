import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { navData } from '@/data/navData'
import { cn } from '@/lib/utils'
import { overlayVariants, sidebarVariants, sidebarStagger, sidebarItemVariants } from '@/lib/motion'
import ThemeToggle from '@/components/ui/ThemeToggle'

interface NavSidebarProps {
  isOpen: boolean
  isDark: boolean
  activeHref: string
  onClose: () => void
  onNavClick: (href: string) => void
  onToggleTheme: () => void
}

interface SidebarNavLinksProps {
  isDark: boolean
  activeHref: string
  onNavClick: (href: string) => void
}

function SidebarNavLinks({ isDark, activeHref, onNavClick }: SidebarNavLinksProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.nav
      variants={shouldReduce ? {} : sidebarStagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col px-6 pt-2 gap-0 flex-1"
    >
      {navData.map((item) => (
        <motion.a
          key={item.href}
          href={item.href}
          variants={shouldReduce ? {} : sidebarItemVariants}
          onClick={(e) => { e.preventDefault(); onNavClick(item.href) }}
          className={cn(
            'text-base font-medium py-3.5 border-b transition-colors duration-200',
            isDark ? 'border-white/10' : 'border-stone-300/40',
            activeHref === item.href
              ? isDark
                ? 'text-white'
                : 'text-stone-700'
              : isDark
                ? 'text-white/60 hover:text-white'
                : 'text-stone-500 hover:text-stone-700'
          )}
        >
          {item.label}
        </motion.a>
      ))}
    </motion.nav>
  )
}

export default function NavSidebar({
  isOpen,
  isDark,
  activeHref,
  onClose,
  onNavClick,
  onToggleTheme,
}: NavSidebarProps) {
  const shouldReduce = useReducedMotion()
  const logoColor = isDark ? 'text-white' : 'text-stone-700'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            variants={shouldReduce ? {} : overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          <motion.aside
            key="sidebar"
            variants={shouldReduce ? {} : sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed top-0 right-0 bottom-0 z-60 w-64 flex flex-col md:hidden',
              isDark ? 'bg-[#080b1e]' : 'bg-[#ede8d0]'
            )}
          >
            <div className="flex items-center justify-between px-6 h-16">
              <span className={cn('text-xl font-bold tracking-tight', logoColor)}>ninda.</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className={cn(
                  'w-8 h-8 flex items-center justify-center text-lg',
                  'bg-transparent border-none cursor-pointer',
                  'opacity-60 hover:opacity-100 transition-opacity duration-200',
                  isDark ? 'text-white' : 'text-stone-800'
                )}
              >
                ✕
              </button>
            </div>

            <SidebarNavLinks isDark={isDark} activeHref={activeHref} onNavClick={onNavClick} />

            <div className="px-6 pb-8">
              <ThemeToggle
                isDark={isDark}
                onToggle={onToggleTheme}
                showLabel
                className={isDark ? 'text-white' : 'text-stone-700'}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
