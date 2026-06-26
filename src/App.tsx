import { useState, useEffect } from 'react'
import StarCanvas from './StarCanvas'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/layout/Footer'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const [activeHref, setActiveHref] = useState('#home')

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    function onSystemChange(e: MediaQueryListEvent) {
      setIsDark(e.matches)
    }
    mq.addEventListener('change', onSystemChange)
    return () => mq.removeEventListener('change', onSystemChange)
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
      <StarCanvas isDark={isDark} />
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        activeHref={activeHref}
        onSetActive={setActiveHref}
      />

      <main>
        <HeroSection isDark={isDark} onViewWork={handleViewWork} />

        <AboutSection isDark={isDark} />

        <SkillsSection isDark={isDark} />

        <ProjectsSection isDark={isDark} />

        <ExperienceSection isDark={isDark} />

        <ContactSection isDark={isDark} />
      </main>

      <Footer isDark={isDark} activeHref={activeHref} onNavClick={setActiveHref} />
    </>
  )
}

export default App
