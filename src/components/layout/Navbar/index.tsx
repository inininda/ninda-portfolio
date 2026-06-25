import { useState, useEffect, useRef } from 'react'
import { navData } from '@/data/navData'
import { cn } from '@/lib/utils'
import { useActiveSection } from '@/hooks/useActiveSection'
import Container from '@/components/layout/Container'
import ThemeToggle from '@/components/ui/ThemeToggle'
import NavLinks from './NavLinks'
import HamburgerButton from './HamburgerButton'
import NavSidebar from './NavSidebar'

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
  activeHref: string
  onSetActive: (href: string) => void
}

export default function Navbar({ isDark, onToggleTheme, activeHref, onSetActive }: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const observedActive = useActiveSection(navData.map((i) => i.href))
  // Sync observer result up to App without re-triggering the effect on every render
  const onSetActiveRef = useRef(onSetActive)
  onSetActiveRef.current = onSetActive
  useEffect(() => {
    if (observedActive) onSetActiveRef.current(observedActive)
  }, [observedActive])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setIsSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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
        <Container>
          <div className="flex items-center justify-between h-16">
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

            <div className="hidden md:flex items-center gap-8">
              <NavLinks isDark={isDark} activeHref={activeHref} onNavClick={handleNavClick} />
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            </div>

            <HamburgerButton isDark={isDark} onClick={() => setIsSidebarOpen(true)} />
          </div>
        </Container>
      </nav>

      <NavSidebar
        isOpen={isSidebarOpen}
        isDark={isDark}
        activeHref={activeHref}
        onClose={() => setIsSidebarOpen(false)}
        onNavClick={handleNavClick}
        onToggleTheme={onToggleTheme}
      />
    </>
  )
}
