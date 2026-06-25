import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navData } from '@/data/navData'
import { cn } from '@/lib/utils'

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
  activeHref: string
  onSetActive: (href: string) => void
}

export default function Navbar({ isDark, onToggleTheme, activeHref, onSetActive }: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Keep latest onSetActive in a ref so the observer doesn't re-run on every render
  const onSetActiveRef = useRef(onSetActive)
  onSetActiveRef.current = onSetActive

  // Frosted glass effect on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-detect active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onSetActiveRef.current(`#${entry.target.id}`)
          }
        }
      },
      // Section is "active" when its top half occupies the middle of the viewport
      { threshold: 0, rootMargin: '-40% 0px -55% 0px' }
    )

    navData.forEach((item) => {
      const el = document.querySelector(item.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Close sidebar on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setIsSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  function handleNavClick(href: string) {
    onSetActive(href)
    setIsSidebarOpen(false)
  }

  const textColor = isDark ? 'text-white/70' : 'text-stone-600'
  const activeTextColor = isDark ? 'text-white' : 'text-stone-900'
  const logoColor = isDark ? 'text-white' : 'text-stone-900'
  const barColor = isDark ? 'bg-white' : 'bg-stone-800'

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
              onClick={() => handleNavClick('#home')}
              className={cn(
                'text-xl font-bold tracking-tight transition-opacity duration-200 hover:opacity-75',
                logoColor
              )}
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
                    'relative text-sm font-medium py-1 transition-colors duration-200 group',
                    activeHref === item.href ? activeTextColor : textColor,
                    'hover:' + (isDark ? 'text-white' : 'text-stone-900')
                  )}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-px transition-all duration-300',
                      isDark ? 'bg-white' : 'bg-stone-900',
                      activeHref === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </a>
              ))}

              {/* Theme toggle */}
              <button
                onClick={onToggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="text-xl leading-none p-1 opacity-70 hover:opacity-100 transition-opacity duration-200 bg-transparent border-none cursor-pointer"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 bg-transparent border-none cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <span className={cn('block w-5 h-px', barColor)} />
              <span className={cn('block w-5 h-px', barColor)} />
              <span className={cn('block w-5 h-px', barColor)} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar + overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.aside
              key="sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className={cn(
                'fixed top-0 right-0 bottom-0 z-60 w-64 flex flex-col md:hidden',
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
                    'w-8 h-8 flex items-center justify-center text-lg bg-transparent border-none cursor-pointer',
                    'opacity-60 hover:opacity-100 transition-opacity duration-200',
                    isDark ? 'text-white' : 'text-stone-800'
                  )}
                >
                  ✕
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col px-6 pt-2 gap-0 flex-1">
                {navData.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055 + 0.08, duration: 0.22 }}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'text-base font-medium py-3.5 border-b transition-colors duration-200',
                      isDark ? 'border-white/10' : 'border-stone-300/40',
                      activeHref === item.href
                        ? isDark
                          ? 'text-white'
                          : 'text-stone-900'
                        : isDark
                          ? 'text-white/60 hover:text-white'
                          : 'text-stone-500 hover:text-stone-900'
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
                    'flex items-center gap-2 text-sm font-medium bg-transparent border-none cursor-pointer',
                    'opacity-60 hover:opacity-100 transition-opacity duration-200',
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
