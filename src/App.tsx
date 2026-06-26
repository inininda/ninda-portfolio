import { useState, useEffect, useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import StarCanvas from './StarCanvas'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/layout/Footer'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const [activeHref, setActiveHref] = useState('#home')
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const smoothY = useSmoothScroll()
  const y = useTransform(smoothY, (v) => -v)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    function onSystemChange(e: MediaQueryListEvent) {
      setIsDark(e.matches)
    }
    mq.addEventListener('change', onSystemChange)
    return () => mq.removeEventListener('change', onSystemChange)
  }, [])

  useEffect(() => {
    if (!contentRef.current) return
    const ro = new ResizeObserver(() => {
      setContentHeight(contentRef.current?.scrollHeight ?? 0)
    })
    ro.observe(contentRef.current)
    return () => ro.disconnect()
  }, [])

  function toggleTheme() {
    setIsDark((prev) => !prev)
  }

  function handleViewWork() {
    setActiveHref('#works')
    document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* StarCanvas must live outside the motion.div — a CSS transform on an
          ancestor creates a new containing block, breaking position:fixed */}
      <StarCanvas isDark={isDark} />

      {/* Spacer that drives the native scrollbar height */}
      <div style={{ height: contentHeight }} aria-hidden="true" />

      {/* Navbar must also live outside — same containing-block issue as StarCanvas */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        activeHref={activeHref}
        onSetActive={setActiveHref}
      />

      {/* Fixed content panel translated by spring-smoothed scroll value */}
      <motion.div
        ref={contentRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          y,
        }}
      >

        <main>
          <HeroSection isDark={isDark} onViewWork={handleViewWork} />

          <AboutSection isDark={isDark} />

          <SkillsSection isDark={isDark} />

          <ProjectsSection isDark={isDark} />

          <ExperienceSection isDark={isDark} />

          <ContactSection isDark={isDark} />
        </main>

        <Footer isDark={isDark} activeHref={activeHref} onNavClick={setActiveHref} />
      </motion.div>
    </>
  )
}

export default App
