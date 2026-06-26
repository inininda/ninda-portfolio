# Portfolio — Module Summary

_Last updated: 2026-06-26 — added ContactSection and Footer_

## Components / Layout

- `Navbar` — Orchestrator: owns scroll/sidebar state, syncs `useActiveSection` to App, composes all nav children
- `Container` — Responsive centered wrapper (`max-w-7xl`, horizontal padding); required around all page content
- `Footer` — Minimal mission-control sign-off: logo+tagline left, nav links+socials right on desktop; stacked on mobile; copyright bar; `fadeIn` whileInView
- `NavLinks` — Desktop nav links with animated underline; accepts `activeHref`, `isDark`, `onNavClick`
- `HamburgerButton` — Three-bar mobile menu trigger; accepts `isDark`, `onClick`
- `NavSidebar` — Mobile sidebar: overlay + slide-in panel + header + nav links + theme toggle; accepts `isOpen`, `isDark`, `activeHref`, `onClose`, `onNavClick`, `onToggleTheme`
- `SidebarNavLinks` — Stagger-animated nav links rendered inside `NavSidebar`

## Components / Sections

- `HeroSection` — Two-column hero: mixed-typography name left, terminal + CTAs + social icons right; accepts `isDark`, `onViewWork`
- `AboutSection` — Two-column about: heading → mission log left, skills grid + metrics right; accepts `isDark`
- `JourneyLog` — Stagger-animated timeline container; accepts `JourneyEntry[]` and `isDark`
- `JourneyEntry` — Single mission log entry with vertical spine, mono year+code, title, and description
- `AboutSkills` — Tech stack grid grouped by `SkillGroup` (fullstack / web3 / devops); accepts `Skill[]` and `isDark`; uses `Badge`
- `AboutMetrics` — Stagger-animated metric row; accepts `Metric[]` and `isDark`; uses `StatCard` with `animated` counter
- `SkillsSection` — Single-column skills section with CSS grid texture; heading → 2×2 group grid; accepts `isDark`
- `SkillGroup` — One category block: `[ LABEL ] ───` header + list of `SkillBar`; accepts group, skills, isDark
- `SkillBar` — Single skill diagnostic row: mono name + segmented animated bar + count-up %; goes in `ui/`
- `ProjectsSection` — Full-width diagonal cascade project grid with HUD wrapper, filter tabs, and project modal; accepts `isDark`
- `PlaneGrid` — HUD wrapper (titlebar, scanlines, border glow) with a fixed-height scroll container (`screenRef`). Inside: a sticky perspective viewport (`perspective: 2000px; perspectiveOrigin: 65% 5%`) containing a `preserve-3d` planes container. All cards are absolutely positioned; each `PlaneCard` sub-component derives its 3D position (`x, y, z, rotateY`) via `useTransform(smoothProgress, …)` where `smoothProgress` is a spring over scroll-linked progress (0→numCards-1). Scrolling through creates a diagonal depth cascade (far = upper-right, near = lower-left). Mobile falls back to a flat vertical list.
- `ProjectPlane` — Pure visual component: 320×384 portrait card with `bg-neutral-900/90` dark panel, index label, status dot, image or oversized mono initials. No click handler or motion wrapper — those live on the `PlaneCard` ancestor. Hover label (`group-hover`) appears to the right via `left-full` absolute positioning, relying on `group` from `PlaneCard`.
- `ProjectModal` — Full detail modal: name, status badge, description, tech stack pills, asset gallery, demo/repo links; uses `Modal` shell
- `ExperienceSection` — Mission-log work history: themed heading + vertical timeline; accepts `isDark`
- `ContactSection` — "Open comms channel" contact section: centered heading, email link, social links row; accepts `isDark`
- `ExperienceTimeline` — Animated spine (`scaleY` on scroll) + stagger-mapped entries; routes to `SearchingEntry` or `ExperienceItem` per entry
- `ExperienceItem` — Completed mission card: role, `@company` link, location, `Badge` stack pills, `>` prefixed responsibilities
- `SearchingEntry` — Active signal card: dashed border, blinking cursor, pulsing dot, broadcasting message, open-to-work responsibilities

## Components / UI

- `Modal` — Accessible dialog shell: animated backdrop + scale/fade panel, focus trap, Escape close
- `StatusBadge` — `live` / `in-progress` / `archived` pill with pulsing/blinking/static dot
- `FilterTabs` — Reusable tab bar with spring-animated sliding indicator via `layoutId`
- `Button` — Polymorphic primary/outline button; `as` prop switches between `<button>` and `<a>`
- `ThemeToggle` — Dark/light toggle button; `showLabel` prop controls whether mode label is shown
- `TerminalWindow` — macOS-style terminal chrome (dots, title bar, dark wrapper); children-based
- `SocialIcon` — SVG icon renderer keyed by `SocialLink['icon']` name
- `SocialIconLink` — Themed anchor wrapping `SocialIcon`; accepts full `SocialLink` shape
- `SocialLinks` — Row of `SocialIconLink` items; accepts `SocialLink[]`, `isDark`; reused in ContactSection and Footer
- `StatCard` — Stat display with large value + label; optional `animated` prop triggers count-up on scroll enter via `useInView`
- `Badge` — Pill label for tags/skills; accepts `label`, `isDark`
- `SkillBar` — Skill diagnostic row: mono name, segmented neon bar (repeating-linear-gradient), count-up %; group-keyed colors; `animated` via `useInView`

## Hooks

- `useActiveSection` — Watches section hrefs via `IntersectionObserver`; returns the currently active href string

## Data

- `navData.ts` — Navigation menu items (`label`, `href`)
- `socialData.ts` — Social links (`label`, `href`, `icon`) for hero and footer
- `aboutData.ts` — Journey entries (`JourneyEntry[]`), metrics (`Metric[]`), and tech stack skills (`Skill[]`) for the About section
- `skillsData.ts` — Skill entries (`Skill[]` from `types/skills`) with proficiency values for the Skills section
- `projectsData.ts` — 9 project entries (`Project[]`) with id, name, description, category, techStack, status, optional urls and assets
- `experienceData.ts` — 5 work experience entries (`Experience[]`) ordered newest first; first entry is the "searching" signal
- `contactData.ts` — `contactInfo: ContactInfo` with email, availability note, and socials array (sourced from `socialData`)

## Lib

- `motion.ts` — Shared animation variants: `fadeIn`, `fadeInUp`, `staggerContainer`, `slideInLeft`, `slideInRight`, `scaleIn` (with exit), `overlayVariants`, `modalPanelVariants`, `sidebarVariants`, `sidebarStagger`, `sidebarItemVariants`
- `utils.ts` — `cn()` helper for merging Tailwind class strings
