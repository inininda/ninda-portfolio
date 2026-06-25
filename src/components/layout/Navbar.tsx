import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navData } from '@/data/navData'
import { cn } from '@/lib/utils'

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close sidebar on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setIsSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  function handleNavClick(href: string) {
    setActiveHref(href)
    setIsSidebarOpen(false)
  }

  const textColor = isDark ? 'text-white/80' : 'text-stone-700'
  const activeTextColor = isDark ? 'text-white' : 'text-stone-900'
  const hoverTextColor = isDark ? 'hover:text-white' : 'hover:text-stone-900'
  const logoColor = isDark ? 'text-white' : 'text-stone-900'

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? isDark
              ? 'bg-black/20 backdrop-blur-md'
              : 'bg-white/20 backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#home"
              className={cn(
                'text-xl font-bold tracking-tight transition-opacity duration-200 hover:opacity-80',
                logoColor
              )}
              onClick={() => handleNavClick('#home')}
            >
              ninda.
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navData.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'relative text-sm font-medium transition-colors duration-200 py-1 group',
                    textColor,
                    hoverTextColor,
                    activeHref === item.href && activeTextColor
                  )}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-px bg-current transition-all duration-300',
                      activeHref === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </a>
              ))}

              {/* Theme toggle */}
              <button
                onClick={onToggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={cn(
                  'text-xl leading-none p-1 opacity-80 hover:opacity-100 transition-opacity duration-200',
                  'bg-transparent border-none cursor-pointer'
                )}
              >
                {isDark ? '☀️' : '🌙'}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5',
                'bg-transparent border-none cursor-pointer'
              )}
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <span
                className={cn(
                  'block w-5 h-px transition-colors duration-200',
                  isDark ? 'bg-white' : 'bg-stone-800'
                )}
              />
              <span
                className={cn(
                  'block w-5 h-px transition-colors duration-200',
                  isDark ? 'bg-white' : 'bg-stone-800'
                )}
              />
              <span
                className={cn(
                  'block w-5 h-px transition-colors duration-200',
                  isDark ? 'bg-white' : 'bg-stone-800'
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar + overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              key="sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className={cn(
                'fixed top-0 right-0 bottom-0 z-50 w-64 flex flex-col md:hidden',
                isDark ? 'bg-[#080b1e]' : 'bg-[#ede8d0]'
              )}
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-6 h-16">
                <span className={cn('text-xl font-bold tracking-tight', logoColor)}>ninda.</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close menu"
                  className={cn(
                    'w-8 h-8 flex items-center justify-center text-lg',
                    'bg-transparent border-none cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200',
                    isDark ? 'text-white' : 'text-stone-800'
                  )}
                >
                  ✕
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col px-6 pt-4 gap-1 flex-1">
                {navData.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.25 }}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'text-base font-medium py-3 border-b transition-colors duration-200',
                      isDark
                        ? 'text-white/70 hover:text-white border-white/10'
                        : 'text-stone-600 hover:text-stone-900 border-stone-300/40',
                      activeHref === item.href &&
                        (isDark ? 'text-white' : 'text-stone-900')
                    )}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Sidebar footer: theme toggle */}
              <div className="px-6 pb-8">
                <button
                  onClick={onToggleTheme}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  className={cn(
                    'flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity duration-200',
                    'bg-transparent border-none cursor-pointer',
                    isDark ? 'text-white' : 'text-stone-700'
                  )}
                >
                  <span className="text-xl">{isDark ? '☀️' : '🌙'}</span>
                  {isDark ? 'Light mode' : 'Dark mode'}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
