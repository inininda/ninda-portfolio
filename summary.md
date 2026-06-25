# Portfolio — Module Summary

_Last updated: 2026-06-25_

## Components / Layout

- `Navbar` — Orchestrator: owns scroll/sidebar state, syncs `useActiveSection` to App, composes all nav children
- `Container` — Responsive centered wrapper (`max-w-7xl`, horizontal padding); required around all page content
- `NavLinks` — Desktop nav links with animated underline; accepts `activeHref`, `isDark`, `onNavClick`
- `HamburgerButton` — Three-bar mobile menu trigger; accepts `isDark`, `onClick`
- `NavSidebar` — Mobile sidebar: overlay + slide-in panel + header + nav links + theme toggle; accepts `isOpen`, `isDark`, `activeHref`, `onClose`, `onNavClick`, `onToggleTheme`
- `SidebarNavLinks` — Stagger-animated nav links rendered inside `NavSidebar`

## Components / Sections

- `HeroSection` — Two-column hero: mixed-typography name left, terminal + CTAs + social icons right; accepts `isDark`, `onViewWork`

## Components / UI

- `Button` — Polymorphic primary/outline button; `as` prop switches between `<button>` and `<a>`
- `ThemeToggle` — Dark/light toggle button; `showLabel` prop controls whether mode label is shown
- `TerminalWindow` — macOS-style terminal chrome (dots, title bar, dark wrapper); children-based
- `SocialIcon` — SVG icon renderer keyed by `SocialLink['icon']` name
- `SocialIconLink` — Themed anchor wrapping `SocialIcon`; accepts full `SocialLink` shape

## Hooks

- `useActiveSection` — Watches section hrefs via `IntersectionObserver`; returns the currently active href string

## Data

- `navData.ts` — Navigation menu items (`label`, `href`)
- `socialData.ts` — Social links (`label`, `href`, `icon`) for hero and footer

## Lib

- `motion.ts` — Shared animation variants: `fadeIn`, `fadeInUp`, `staggerContainer`, `slideInLeft`, `slideInRight`, `scaleIn`, `overlayVariants`, `sidebarVariants`, `sidebarStagger`, `sidebarItemVariants`
- `utils.ts` — `cn()` helper for merging Tailwind class strings
