import { useState, useEffect } from 'react'
import StarCanvas from './StarCanvas'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
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

        {/* Placeholder sections — to be built out */}
        <section id="contact" className="min-h-screen" />
      </main>
    </>
  )
}

export default App
