# CLAUDE.md

This file is the source of truth for how Claude should behave when working on this codebase.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 |
| Animation | Motion.dev (`motion/react`) |
| State | Zustand |
| Routing | React Router v6 |
| Linting | ESLint + Prettier |

---

## Project Structure

```
qrite/
├── public/                  # Static assets (favicons, og images, fonts)
├── src/
│   ├── assets/              # Images, SVGs, icons used in components
│   ├── components/
│   │   ├── ui/              # Primitive components (Button, Input, Badge, Modal...)
│   │   ├── sections/        # Page sections (HeroSection, FeaturesSection...)
│   │   └── layout/          # Wrappers (Container, Navbar, Footer, PageLayout)
│   ├── data/                # Static/mock data (*.ts files, no JSON unless needed)
│   ├── hooks/               # Custom React hooks (useScroll, useMediaQuery...)
│   ├── lib/
│   │   └── motion.ts        # Shared Motion.dev animation variants
│   ├── pages/               # Route-level components (lazy-loaded)
│   ├── store/               # Zustand stores (one file per domain)
│   ├── types/               # Shared TypeScript interfaces and types
│   └── main.tsx
├── CLAUDE.md
└── summary.md               # Auto-updated model/module summary (see below)
```

---

## Styling Rules

### Tailwind
- Use Tailwind utility classes as the **primary** styling method. No inline `style={{}}` unless for dynamic values Tailwind can't handle (e.g. JS-computed pixel values).
- Follow **mobile-first** responsive design: `base → sm → md → lg → xl`.
- Responsive breakpoints to always support:
  - Mobile: `< 640px`
  - Tablet: `640px – 1024px`
  - Desktop: `> 1024px`
- All pages and major sections must be wrapped in a `<Container>` component (see below).

### Container
Every page content must be wrapped in the shared `Container` component:

```tsx
// src/components/layout/Container.tsx
// Responsive centered wrapper with horizontal padding
const Container = ({ children, className }: ContainerProps) => (
  <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
    {children}
  </div>
);
```

Do not hardcode `max-w` or `px` values outside of this component.

---

## Animation Rules (Motion.dev)

- Use `motion/react` — **not** `framer-motion`.
- Define **reusable animation variants** in `src/lib/motion.ts`. Do not scatter `initial/animate/transition` props inline across components — import from `motion.ts` instead.
- Common variants to define in `motion.ts`: `fadeIn`, `fadeInUp`, `staggerContainer`, `slideInLeft`, `slideInRight`, `scaleIn`.
- **Page scroll effects**: use `whileInView` with `viewport={{ once: true, margin: "-100px" }}` for scroll-triggered animations.
- **Always** respect reduced motion:

```tsx
import { useReducedMotion } from "motion/react";

const shouldReduce = useReducedMotion();
const variant = shouldReduce ? {} : fadeInUp;
```

- Keep animations subtle and purposeful. Avoid animating everything — reserve motion for: hero entrance, section reveals on scroll, interactive hover/tap states.

---

## State Management (Zustand)

- One store file per domain, placed in `src/store/`. Example: `useAuthStore.ts`, `useUIStore.ts`, `useCartStore.ts`.
- Store shape must be fully typed using TypeScript interfaces in `src/types/`.
- Export stores as named hooks: `export const useAuthStore = create<AuthState>(...)`.
- Keep stores **flat** where possible. Avoid deeply nested state.
- Side effects (API calls) go inside store actions, not components.

```ts
// src/store/useUIStore.ts
// Controls global UI state: modal visibility, theme, sidebar
interface UIState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
```

---

## Data

- All static and mock data lives in `src/data/` as `.ts` files (typed exports).
- Do **not** fetch or hardcode data directly inside components. Import from `src/data/` or fetch via store actions.
- Name data files descriptively: `faqData.ts`, `pricingData.ts`, `teamData.ts`.

```ts
// src/data/faqData.ts
// Static FAQ content for the FAQ section
export const faqData: FAQItem[] = [
  { question: "...", answer: "..." },
];
```

---

## Assets

- **Public assets** (favicons, OG images, robots.txt, downloadable files): place in `/public/`.
- **Component assets** (images, SVGs used inside components): place in `src/assets/`.
- Import assets using the `@/assets/` alias, not relative paths.

---

## Routing

- Use React Router v6 with `createBrowserRouter`.
- All page components must be **lazy-loaded**:

```tsx
const HomePage = lazy(() => import("@/pages/HomePage"));
```

- Wrap router with `<Suspense fallback={<PageLoader />}>`.

---

## TypeScript

- **Strict mode enabled** — no implicit `any`, no untyped props.
- All component props must have an explicit interface or type.
- Shared types go in `src/types/`. Co-locate component-specific types inside the component file if only used there.
- Use `type` for unions/primitives, `interface` for object shapes.

---

## Component Rules

### Naming
- **Components**: PascalCase (`HeroSection.tsx`, `PricingCard.tsx`)
- **Hooks**: camelCase prefixed with `use` (`useScrollPosition.ts`)
- **Stores**: camelCase prefixed with `use`, suffixed with `Store` (`useUIStore.ts`)
- **Data files**: camelCase suffixed with `Data` (`pricingData.ts`)
- **Non-component files**: kebab-case (`motion-variants.ts`) or camelCase

### Structure (per file)
Order within a component file:
1. Imports
2. Types/interfaces
3. Constants (animation variants, static config)
4. Component function
5. Export

### Reusability

**Default to reusable.** Before creating a new component, ask: "Could this be used somewhere else with different props?" If yes, build it generic first.

**`src/components/ui/` is the reusability layer.** Primitives here must be:
- Prop-driven, not data-coupled (accept `label`, `onClick`, `variant` — not hardcoded text or logic)
- Stylistically composable via `className` prop (always merge with `cn()`)
- Free of business logic and store dependencies

```tsx
// ✅ Reusable — driven entirely by props
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

// ❌ Not reusable — hardcoded text and coupled to a store
const SubmitButton = () => {
  const { submit } = useFormStore();
  return <button onClick={submit}>Submit Form</button>;
};
```

**Composition over duplication.** If two section components share a visual pattern (e.g. a titled card, a stat block, an icon+text row), extract it to `ui/` and compose from there. Never copy-paste markup between components.

**Props API design:**
- Use `children` for flexible inner content instead of `content` or `text` props where appropriate
- Use `variant` for visual alternatives (not separate components per variant)
- Use `as` prop (polymorphic) when a component's HTML tag should be configurable:

```tsx
// Can render as <section>, <div>, <article>, etc.
interface SectionWrapperProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}
const SectionWrapper = ({ as: Tag = "section", children, className }: SectionWrapperProps) => (
  <Tag className={cn("py-16 md:py-24", className)}>{children}</Tag>
);
```

**`cn()` is required** for any component that accepts a `className` prop — never concatenate strings manually.

**Extract when you see it twice.** If the same markup pattern appears in two places, extract it immediately. Three instances with no extraction is a bug.

### Component Decomposition

**Split large components into smaller child components.** A component that does more than one visual job should be broken down. If you find yourself scrolling past 150 lines inside a single component function, that is a signal to decompose.

**The rule:** One component = one responsibility. A `HeroSection` should orchestrate layout — not contain all the markup for a rotating circle, a button group, and a social links row inline. Each of those is a child component.

```
// ✅ Decomposed — each child has one job
HeroSection.tsx
├── HeroEyebrow.tsx        → eyebrow label
├── HeroName.tsx           → mixed-typography name block
├── HeroTagline.tsx        → tagline text
├── RotatingCircle.tsx     → spinning circular text (reusable in other sections)
├── SocialLinks.tsx        → icon row (reusable in Footer too)
└── (Button from ui/)      → CTA buttons

// ❌ Monolith — one file doing everything
HeroSection.tsx            → 300+ lines, all markup inline
```

**Where to place child components:**
- If the child is **specific to one component** and won't be used elsewhere → co-locate it inside a folder named after the parent component. The parent becomes `index.tsx` inside that folder:

```
src/components/layout/
└── Navbar/
    ├── index.tsx           # main Navbar component (orchestrator)
    ├── NavLinks.tsx        # desktop nav links
    ├── HamburgerButton.tsx
    └── NavSidebar.tsx

src/components/sections/
└── HeroSection/
    ├── index.tsx           # main HeroSection component
    ├── HeroName.tsx
    └── HeroTagline.tsx
```

- If the child **could be reused** across sections or pages → move it to `src/components/ui/`

**Ask before writing markup inline:**
1. Is this block more than ~20 lines of JSX? → extract it
2. Does it have its own internal state or animation logic? → extract it
3. Could another section use this with different props? → extract to `ui/`

### Comments
- Add comments **only when necessary** — complex logic, non-obvious decisions, workarounds.
- Use `//` for single-line, `/* */` for multi-line.
- Every **store file** must have a top-comment describing what it manages.
- Every **data file** must have a top-comment describing what it contains.
- Avoid comments that just restate what the code does (`// increment counter`).

---

## Path Aliases

Use `@/` as alias for `src/`. Never use relative `../../` paths beyond one level.

```ts
// vite.config.ts
resolve: {
  alias: { "@": path.resolve(__dirname, "./src") }
}
```

---

## Environment Variables

- All env vars must be prefixed with `VITE_`.
- Access via `import.meta.env.VITE_*`.
- Document all required env vars in `.env.example`.

---

## Accessibility

- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`).
- Interactive elements must be keyboard-navigable.
- Images must have descriptive `alt` text. Decorative images: `alt=""`.
- Modals must trap focus and be closable with `Escape`.
- Respect `prefers-reduced-motion` in all animations (see Motion Rules).

---

## Error Handling

- Wrap major page sections with `<ErrorBoundary>` components.
- Show user-friendly fallback UI — never expose raw error messages.

---

## summary.md

Claude must keep `summary.md` (in the project root) **up to date** whenever a new component, store, hook, or page is created or significantly changed.

Format:

```md
# Qrite — Module Summary

_Last updated: YYYY-MM-DD_

## Pages
- `HomePage` — Landing page with hero, features, pricing, FAQ sections
- `AboutPage` — Team and company story

## Components / Sections
- `HeroSection` — Animated hero with CTA, uses fadeInUp from motion.ts
- `PricingCard` — Displays a single pricing tier, accepts `PricingTier` prop

## Stores
- `useUIStore` — Modal open/close state, theme toggle
- `useAuthStore` — User session, login/logout actions

## Hooks
- `useScrollPosition` — Returns current Y scroll position

## Data
- `pricingData.ts` — Static pricing tier definitions
- `faqData.ts` — FAQ question/answer pairs
```
