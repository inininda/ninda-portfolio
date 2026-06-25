import { useState, useEffect, useRef } from 'react'

// Watches a list of section hrefs via IntersectionObserver and returns
// the one currently occupying the middle band of the viewport.
export function useActiveSection(hrefs: string[]): string {
  const [activeHref, setActiveHref] = useState('')
  const hrefsRef = useRef(hrefs)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`)
          }
        }
      },
      // rootMargin keeps the trigger zone in the middle band of the viewport
      { threshold: 0, rootMargin: '-40% 0px -55% 0px' }
    )

    hrefsRef.current.forEach((href) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return activeHref
}
