export function scrollToSection(href: string) {
  const el = document.querySelector(href) as HTMLElement | null
  if (!el) return
  let top = 0
  let curr: HTMLElement | null = el
  while (curr) {
    top += curr.offsetTop
    const parent = curr.offsetParent as HTMLElement | null
    if (!parent || getComputedStyle(parent).position === 'fixed') break
    curr = parent
  }
  window.scrollTo({ top: Math.max(0, top - 64) })
}
