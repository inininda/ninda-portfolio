import { useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  animate,
  useReducedMotion,
  type MotionValue,
  type PanInfo,
} from 'motion/react'
import { scaleIn } from '@/lib/motion'
import type { Project } from '@/types/projects'
import ProjectPlane from './ProjectPlane'

interface PlaneGridProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
  isDark?: boolean
}

// ─── Layout constants ──────────────────────────────────────────────────────
const STEP_X = 200
const STEP_Y = -130
const STEP_Z = -200
const ROTATE_Y = -12
const SENSITIVITY = 160

// ─── PlaneCard ─────────────────────────────────────────────────────────────
interface PlaneCardProps {
  project: Project
  index: number
  numCards: number
  progress: MotionValue<number>
  onClick: (project: Project) => void
  isDark: boolean
}

function PlaneCard({ project, index, numCards, progress, onClick, isDark }: PlaneCardProps) {
  const shouldReduce = useReducedMotion()

  // Centred modulo position in the deck [-n/2, n/2]
  const relPos = useTransform(progress, (p) => {
    const n = numCards
    let rel = ((index - p) % n + n) % n
    if (rel > n / 2) rel -= n
    return rel
  })

  const x = useTransform(relPos, (r) => r * STEP_X)
  const y = useTransform(relPos, (r) => r * STEP_Y)
  const z = useTransform(relPos, (r) => r * STEP_Z)

  const fadeEdge = numCards / 2 - 0.5
  const opacity = useTransform(relPos, (r) => {
    const a = Math.abs(r)
    return a >= fadeEdge ? 0 : a > fadeEdge - 0.8 ? 1 - (a - (fadeEdge - 0.8)) / 0.8 : 1
  })

  return (
    <motion.div
      className="group absolute"
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={
        shouldReduce
          ? { width: 320, height: 384, opacity }
          : {
              x,
              y,
              z,
              rotateY: ROTATE_Y,
              width: 320,
              height: 384,
              transformStyle: 'preserve-3d',
              opacity,
            }
      }
      whileHover={shouldReduce ? {} : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${project.name}`}
      onClick={() => onClick(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick(project)
      }}
    >
      <ProjectPlane project={project} index={index} isDark={isDark} />
    </motion.div>
  )
}

// ─── PlaneGrid ──────────────────────────────────────────────────────────────

export default function PlaneGrid({ projects, onSelectProject, isDark = true }: PlaneGridProps) {
  const shouldReduce = useReducedMotion()

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 640,
  )
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 1024,
  )
  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 639px)')
    const mqDesktop = window.matchMedia('(min-width: 1024px)')
    setIsMobile(mqMobile.matches)
    setIsDesktop(mqDesktop.matches)
    const onMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    const onDesktopChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mqMobile.addEventListener('change', onMobileChange)
    mqDesktop.addEventListener('change', onDesktopChange)
    return () => {
      mqMobile.removeEventListener('change', onMobileChange)
      mqDesktop.removeEventListener('change', onDesktopChange)
    }
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)

  // rawProgress grows unboundedly — wheel + drag accumulate into it
  const rawProgress = useMotionValue(0)
  // Spring smooths rawProgress for fluid feel
  const smoothProgress = useSpring(rawProgress, { stiffness: 70, damping: 20, mass: 0.5 })


  const [activeIndex, setActiveIndex] = useState(0)
  const dragStartProgress = useRef(0)
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Reset progress when the filtered project list changes
  useEffect(() => {
    rawProgress.set(0)
  }, [projects, rawProgress])

  // Track which card is front-most and display it in the HUD counter
  useMotionValueEvent(smoothProgress, 'change', (v) => {
    const n = projects.length
    if (n === 0) return
    setActiveIndex(Math.round(((v % n) + n) % n))
  })

  // Wheel scroll — captures the event so the page doesn't scroll under the deck
  useEffect(() => {
    if (shouldReduce || isMobile) return
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      let delta = e.deltaY
      if (e.deltaMode === 1) delta *= 16
      if (e.deltaMode === 2) delta *= 300
      rawProgress.set(rawProgress.get() + delta / SENSITIVITY)

      // Snap to nearest card after scrolling stops (400 ms idle)
      if (snapTimer.current) clearTimeout(snapTimer.current)
      snapTimer.current = setTimeout(() => {
        animate(rawProgress, Math.round(rawProgress.get()), {
          type: 'spring',
          stiffness: 250,
          damping: 35,
        })
      }, 400)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      if (snapTimer.current) clearTimeout(snapTimer.current)
    }
  }, [shouldReduce, isMobile, rawProgress])

  // Mobile: plain vertical card list, no 3D
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="relative h-48 cursor-pointer overflow-hidden rounded-xl"
              onClick={() => onSelectProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectProject(project)
              }}
            >
              <ProjectPlane project={project} index={i} isDark={isDark} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  const wrapperBorder = isDark ? 'border-white/10' : 'border-stone-200'
  const hudBorder = isDark ? 'border-white/5' : 'border-stone-100'
  const hudText = isDark ? 'text-white/50' : 'text-stone-400'
  const scrollHint = isDark ? 'text-white/50' : 'text-zinc-400'

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > 8) {
      // Real drag — snap to nearest card
      animate(rawProgress, Math.round(rawProgress.get()), {
        type: 'spring',
        stiffness: 250,
        damping: 35,
      })
    } else {
      // Tap on the overlay — open the front-most card
      const n = projects.length
      if (n === 0) return
      const idx = Math.round(((smoothProgress.get() % n) + n) % n)
      onSelectProject(projects[idx])
    }
  }

  return (
    <div
      className={`relative mx-auto flex max-w-full flex-col overflow-hidden rounded-2xl border shadow-[0_0_60px_rgba(99,102,241,0.08)] aspect-video h-[320px] sm:h-[450px] lg:h-[480px] ${wrapperBorder}`}
    >
      {/* HUD titlebar with live card counter */}
      <div className={`flex flex-shrink-0 items-center gap-1.5 border-b px-4 py-2.5 ${hudBorder}`}>
        <div className="h-2 w-2 rounded-full bg-red-500/60" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
        <div className="h-2 w-2 rounded-full bg-green-500/60" />
        <span className={`ml-2 font-mono text-[10px] tracking-widest ${hudText}`}>
          MISSION_ARCHIVE.EXE
        </span>
        <span className={`ml-auto font-mono text-[10px] tabular-nums tracking-widest ${hudText}`}>
          {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      {/* 3D viewport */}
      <div ref={containerRef} className="relative flex-1 overflow-hidden">
        {/* Scanline texture */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
          }}
        />

        {/*
          Drag overlay — sits at z-20 above cards.
          dragConstraints + dragElastic=0 keep the div visually pinned to 0
          while still emitting accurate info.offset values in onDrag/onDragEnd.
          A small offset (<8px) is treated as a tap and opens the front card.
        */}
        {!shouldReduce && !isDesktop && (
          <motion.div
            className="absolute inset-0 z-20 cursor-grab touch-none active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDragStart={() => {
              dragStartProgress.current = rawProgress.get()
            }}
            onDrag={(_, info) => {
              rawProgress.set(dragStartProgress.current - info.offset.x / 150)
            }}
            onDragEnd={handleDragEnd}
          />
        )}

        {/*
          Perspective viewport — origin near top-right so cards cascade
          diagonally from lower-left (near) to upper-right (far).
        */}
        <div
          className="h-full w-full overflow-hidden"
          style={{ perspective: '2000px', perspectiveOrigin: '78% 2%' }}
        >
          {/*
            Anchor position slides toward center when few cards are visible so
            the front card is never stranded in a corner with no room to scroll.
            1 card → centered; 2 cards → slightly off-center; 3+ → original.
          */}
          <div
            className="absolute"
            style={{
              left: projects.length <= 1 ? '50%' : projects.length <= 2 ? '36%' : '22%',
              top:  projects.length <= 1 ? '50%' : projects.length <= 2 ? '62%' : '74%',
              transform: 'translate(-50%, -50%)',
              transformStyle: 'preserve-3d',
              position: 'relative',
            }}
          >
            <AnimatePresence>
              {projects.map((project, i) => (
                <PlaneCard
                  key={project.id}
                  project={project}
                  index={i}
                  numCards={projects.length}
                  progress={smoothProgress}
                  onClick={onSelectProject}
                  isDark={isDark}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute bottom-4 right-5 select-none font-mono text-[10px] tracking-widest ${scrollHint}`}
      >
        DRAG · SCROLL
      </div>
    </div>
  )
}
