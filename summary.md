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
- `AboutSection` — Single-column about: heading → mission log → work history → skills grid → metrics row; accepts `isDark`
- `JourneyLog` — Stagger-animated timeline container; accepts `JourneyEntry[]` and `isDark`
- `JourneyEntry` — Single mission log entry with vertical spine, mono year+code, title, and description
- `WorkHistory` — Stagger-animated work experience list with `// work.history` mono header; accepts `WorkExperience[]` and `isDark`
- `WorkExperienceCard` — Single work entry: period + location mono, role title, company in sky-400, `↳` highlight bullets
- `AboutSkills` — Tech stack grid grouped by `SkillGroup` (fullstack / web3 / devops); accepts `Skill[]` and `isDark`; uses `Badge`
- `AboutMetrics` — Stagger-animated metric row; accepts `Metric[]` and `isDark`; uses `StatCard` with `animated` counter

## Components / UI

- `Button` — Polymorphic primary/outline button; `as` prop switches between `<button>` and `<a>`
- `ThemeToggle` — Dark/light toggle button; `showLabel` prop controls whether mode label is shown
- `TerminalWindow` — macOS-style terminal chrome (dots, title bar, dark wrapper); children-based
- `SocialIcon` — SVG icon renderer keyed by `SocialLink['icon']` name
- `SocialIconLink` — Themed anchor wrapping `SocialIcon`; accepts full `SocialLink` shape
- `StatCard` — Stat display with large value + label; optional `animated` prop triggers count-up on scroll enter via `useInView`
- `Badge` — Pill label for tags/skills; accepts `label`, `isDark`

## Hooks

- `useActiveSection` — Watches section hrefs via `IntersectionObserver`; returns the currently active href string

## Data

- `navData.ts` — Navigation menu items (`label`, `href`)
- `socialData.ts` — Social links (`label`, `href`, `icon`) for hero and footer
- `aboutData.ts` — Journey entries (`JourneyEntry[]`), work experience (`WorkExperience[]`), metrics (`Metric[]`), and tech stack skills (`Skill[]`) for the About section

## Lib

- `motion.ts` — Shared animation variants: `fadeIn`, `fadeInUp`, `staggerContainer`, `slideInLeft`, `slideInRight`, `scaleIn`, `overlayVariants`, `sidebarVariants`, `sidebarStagger`, `sidebarItemVariants`
- `utils.ts` — `cn()` helper for merging Tailwind class strings
