import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Container from '@/components/layout/Container'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { projectsData } from '@/data/projectsData'
import { cn } from '@/lib/utils'
import PlaneGrid from './PlaneGrid'
import ProjectModal from './ProjectModal'
import type { Project } from '@/types/projects'

interface ProjectsSectionProps {
  isDark?: boolean
}

export default function ProjectsSection({ isDark = true }: ProjectsSectionProps) {
  const shouldReduce = useReducedMotion()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const container = shouldReduce ? {} : staggerContainer
  const item = shouldReduce ? {} : fadeInUp

  return (
    <section id="projects" className="py-20 md:py-28 overflow-hidden">
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-2"
        >
          <motion.span
            variants={item}
            className={cn(
              'font-mono text-xs uppercase tracking-[0.2em]',
              isDark ? 'text-white/30' : 'text-stone-400',
            )}
          >
            // mission.log — full_archive
          </motion.span>
          <motion.h2
            variants={item}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            <span className={isDark ? 'text-white' : 'text-stone-900'}>Project </span>
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Archive
            </span>
          </motion.h2>
        </motion.div>
      </Container>

      {/* Diagonal velocity grid — constrained to Container width */}
      <Container className="mt-8">
        <PlaneGrid
          projects={projectsData}
          onSelectProject={setSelectedProject}
          isDark={isDark}
        />
      </Container>

      {/* Modal outside section flow to avoid overflow/z-index clipping */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isDark={isDark}
      />
    </section>
  )
}
