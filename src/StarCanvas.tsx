import { useEffect, useRef, useState } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  speed: number
  baseOpacity: number
  phase: number
  phaseSpeed: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  length: number
  life: number
  width: number
}

interface Theme {
  dark: boolean
  bg: [string, string]
  fadeColor: string
  starColor: string
  starGlow: string
  shootHead: string
  shootMid: string
  shootTail: string
  glowTransparent: string
}

const DARK_THEME: Theme = {
  dark: true,
  bg: ['#000005', '#0a0f2e'],
  fadeColor: '0,0,0',
  starColor: '220,235,255',
  starGlow: '180,210,255',
  shootHead: '255,255,255',
  shootMid: '200,220,255',
  shootTail: '255,255,255',
  glowTransparent: '0,0,0',
}

const LIGHT_THEME: Theme = {
  dark: false,
  bg: ['#EDE8D0', '#E8E2C4'],
  fadeColor: '237,232,208',
  starColor: '160,140,90',
  starGlow: '180,158,100',
  shootHead: '170,145,75',
  shootMid: '190,165,90',
  shootTail: '170,145,75',
  glowTransparent: '237,232,208',
}

function createStar(canvasWidth: number, canvasHeight: number): Star {
  const radius = Math.random() * 1.7 + 0.3
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius,
    speed: Math.random() * 0.4 + 0.1,
    baseOpacity: Math.random() * 0.6 + 0.3,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: Math.random() * 0.02 + 0.005,
  }
}

function spawnShootingStar(canvasWidth: number, canvasHeight: number): ShootingStar {
  const angle = (Math.random() * 20 + 20) * (Math.PI / 180)
  const speed = Math.random() * 8 + 6
  return {
    x: Math.random() * canvasWidth * 0.6,
    y: Math.random() * canvasHeight * 0.5,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    length: Math.random() * 120 + 80,
    life: 1,
    width: Math.random() * 1.5 + 0.8,
  }
}

export default function StarCanvas() {
  'use no memo'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef<Theme>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME
  )
  const [isDark, setIsDark] = useState(themeRef.current.dark)

  function toggleTheme() {
    const next = themeRef.current.dark ? LIGHT_THEME : DARK_THEME
    themeRef.current = next
    setIsDark(next.dark)
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    function onSystemChange(e: MediaQueryListEvent) {
      const next = e.matches ? DARK_THEME : LIGHT_THEME
      themeRef.current = next
      setIsDark(next.dark)
    }
    mq.addEventListener('change', onSystemChange)
    return () => mq.removeEventListener('change', onSystemChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const STAR_COUNT = 220
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => createStar(width, height))
    const shootingStars: ShootingStar[] = []
    let frameId: number
    let tick = 0

    let bgGrad = makeBgGrad()
    let topFadeGrad = makeTopFade()
    let botFadeGrad = makeBotFade()

    function theme() {
      return themeRef.current
    }

    function makeBgGrad() {
      const g = ctx!.createLinearGradient(0, 0, 0, height)
      g.addColorStop(0, theme().bg[0])
      g.addColorStop(1, theme().bg[1])
      return g
    }
    function makeTopFade() {
      const fc = theme().fadeColor
      const g = ctx!.createLinearGradient(0, 0, 0, height * 0.12)
      g.addColorStop(0, `rgba(${fc},0.95)`)
      g.addColorStop(1, `rgba(${fc},0)`)
      return g
    }
    function makeBotFade() {
      const fc = theme().fadeColor
      const g = ctx!.createLinearGradient(0, height * 0.88, 0, height)
      g.addColorStop(0, `rgba(${fc},0)`)
      g.addColorStop(1, `rgba(${fc},0.95)`)
      return g
    }

    function rebuildGrads() {
      bgGrad = makeBgGrad()
      topFadeGrad = makeTopFade()
      botFadeGrad = makeBotFade()
    }

    function resize() {
      const prevW = width
      const prevH = height
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width
      canvas!.height = height
      rebuildGrads()
      for (const star of stars) {
        star.x = (star.x / prevW) * width
        star.y = (star.y / prevH) * height
      }
    }

    window.addEventListener('resize', resize)

    // Rebuild gradients when theme changes (themeRef is a ref so no dep array issue)
    let lastTheme = themeRef.current
    function checkThemeChange() {
      if (themeRef.current !== lastTheme) {
        lastTheme = themeRef.current
        rebuildGrads()
      }
    }

    function drawBackground() {
      ctx!.fillStyle = bgGrad
      ctx!.fillRect(0, 0, width, height)
    }

    function drawStar(star: Star) {
      const t = theme()
      const opacity = star.baseOpacity * (0.7 + 0.3 * Math.sin(star.phase))
      ctx!.save()

      if (star.radius > 1.2) {
        const glow = ctx!.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 5)
        glow.addColorStop(0, `rgba(${t.starGlow},${opacity * 0.6})`)
        glow.addColorStop(1, `rgba(${t.glowTransparent},0)`)
        ctx!.beginPath()
        ctx!.arc(star.x, star.y, star.radius * 5, 0, Math.PI * 2)
        ctx!.fillStyle = glow
        ctx!.fill()
      }

      ctx!.beginPath()
      ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      const starOpacity = t.dark ? opacity : opacity * 0.5
      ctx!.fillStyle = `rgba(${t.starColor},${starOpacity})`
      ctx!.fill()
      ctx!.restore()
    }

    function drawShootingStar(ss: ShootingStar) {
      const t = theme()
      const alpha = ss.life
      const tailX = ss.x - ss.vx * (ss.length / Math.hypot(ss.vx, ss.vy))
      const tailY = ss.y - ss.vy * (ss.length / Math.hypot(ss.vx, ss.vy))

      const grad = ctx!.createLinearGradient(tailX, tailY, ss.x, ss.y)
      grad.addColorStop(0, `rgba(${t.shootTail},0)`)
      grad.addColorStop(0.7, `rgba(${t.shootMid},${alpha * 0.4})`)
      grad.addColorStop(1, `rgba(${t.shootHead},${alpha})`)

      ctx!.save()
      ctx!.beginPath()
      ctx!.moveTo(tailX, tailY)
      ctx!.lineTo(ss.x, ss.y)
      ctx!.strokeStyle = grad
      ctx!.lineWidth = ss.width
      ctx!.lineCap = 'round'
      ctx!.stroke()

      const glow = ctx!.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, ss.width * 6)
      glow.addColorStop(0, `rgba(${t.shootHead},${alpha})`)
      glow.addColorStop(1, `rgba(${t.glowTransparent},0)`)
      ctx!.beginPath()
      ctx!.arc(ss.x, ss.y, ss.width * 6, 0, Math.PI * 2)
      ctx!.fillStyle = glow
      ctx!.fill()
      ctx!.restore()
    }

    function drawEdgeFades() {
      ctx!.fillStyle = topFadeGrad
      ctx!.fillRect(0, 0, width, height * 0.12)
      ctx!.fillStyle = botFadeGrad
      ctx!.fillRect(0, height * 0.88, width, height * 0.12)
    }

    function animate() {
      checkThemeChange()
      tick = (tick + 1) % 180
      drawBackground()

      for (const star of stars) {
        star.y -= star.speed
        star.phase = (star.phase + star.phaseSpeed) % (Math.PI * 2)
        if (star.y + star.radius < 0) {
          star.y = height + star.radius
          star.x = Math.random() * width
        }
        drawStar(star)
      }

      if (tick === 0 && Math.random() < 0.7) {
        shootingStars.push(spawnShootingStar(width, height))
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i]
        ss.x += ss.vx
        ss.y += ss.vy
        ss.life -= 0.012
        if (ss.life <= 0 || ss.x > width + 200 || ss.y > height + 200) {
          shootingStars.splice(i, 1)
          continue
        }
        drawShootingStar(ss)
      }

      drawEdgeFades()
      frameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          display: 'block',
        }}
      />
      <button
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 100,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5rem',
          lineHeight: 1,
          padding: '0.25rem',
          opacity: 0.8,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.8')}
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    </>
  )
}
