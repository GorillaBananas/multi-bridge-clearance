# Design System — Bridge Clearance Calculator

## Product Context
- **What this is:** A safety tool that calculates when it's safe to pass under bridges based on real-time tide data
- **Who it's for:** Recreational boaters, yacht owners, kayakers — anyone navigating under low bridges
- **Space/industry:** Maritime safety / navigation tools. Peers: Orca, Savvy Navvy, Navionics, Windy
- **Project type:** Mobile-first web application (pure HTML/CSS/JS, no framework). Not a native app — accessed via mobile browsers on the water.

## Aesthetic Direction
- **Direction:** Industrial/Utilitarian + Organic warmth
- **Decoration level:** Intentional — subtle depth through layered surfaces (box-shadow elevation, not glassmorphism blur). The data is the decoration.
- **Mood:** A well-made nautical instrument, not a SaaS dashboard. The confidence of a Garmin chartplotter, the warmth of Tripsy. Trustworthy, competent, approachable.
- **Anti-patterns:** No glassmorphism (`backdrop-filter: blur()`). No floating emoji animations. No gradient text. No decorative animations. If it looks like every AI-generated site, it fails.
- **Reference sites:** [Orca](https://getorca.com/), [Savvy Navvy](https://www.savvy-navvy.com/), [Tripsy](https://tripsy.app/)

## Typography
- **Display/Hero:** Satoshi (via [Fontshare](https://www.fontshare.com/fonts/satoshi)) — Geometric sans with warm ball terminals on a/g/s. Gives the app visual identity that system fonts can't. Weights: 700, 900.
- **Body:** DM Sans (via [Google Fonts](https://fonts.google.com/specimen/DM+Sans)) — Excellent small-size readability, geometric warmth. Weights: 400, 500, 600, 700.
- **UI/Labels:** DM Sans 600 uppercase with letter-spacing
- **Data/Tables:** DM Sans with `font-variant-numeric: tabular-nums` — numbers align in columns. Critical for tide heights and clearance values.
- **Code/Mono:** JetBrains Mono (via Google Fonts) — for station IDs and technical labels only.
- **Loading:**
  - Satoshi: `<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet">`
  - DM Sans + JetBrains Mono: `<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">`
- **Scale (modular 1.25 ratio):**

| Token     | Size | Usage                              |
|-----------|------|------------------------------------|
| `--text-2xs` | 11px | Micro labels (interpolation method, timestamps) |
| `--text-xs`  | 13px | Secondary labels, hints, captions  |
| `--text-sm`  | 14px | Buttons, alert text, form labels   |
| `--text-base`| 16px | Body text, form inputs             |
| `--text-lg`  | 20px | Card titles, section headers       |
| `--text-xl`  | 25px | Feature headings                   |
| `--text-2xl` | 31px | Result status, clearance values    |
| `--text-3xl` | 39px | Hero display (app title only)      |

## Color
- **Approach:** Balanced — maritime palette with warm accent. Not blue-on-blue-on-blue.
- **Primary:** `#4A9EC5` — Calm blue. Less saturated than typical maritime apps. Used for interactive elements, selected states, links.
- **Accent:** `#E8A838` — Warm amber. References brass nautical instruments. Used for primary CTAs (Find Times button), highlights. Replaces generic yellow.
- **Semantic:**
  - Safe: `#3B9B5A` — Deep green. Maritime signal green. Not minty.
  - Warning: `#D4883A` — Amber orange. International maritime warning color.
  - Danger: `#C94444` — Signal red. Deep, authoritative, not playful.
  - Info: `#4A9EC5` — Same as primary.
- **Semantic backgrounds** (for alerts, info panels):
  - Safe bg: `rgba(59, 155, 90, 0.15)`
  - Warning bg: `rgba(212, 136, 58, 0.15)`
  - Danger bg: `rgba(201, 68, 68, 0.15)`
  - Info bg: `rgba(74, 158, 197, 0.15)`
- **Neutrals (cool grays):**

| Token          | Hex       | Usage (dark mode)      | Usage (light mode)     |
|----------------|-----------|------------------------|------------------------|
| `--neutral-950`| `#0D1B2A` | Base background        | Heading text           |
| `--neutral-900`| `#1B2D44` | Card background        | Body text              |
| `--neutral-800`| `#243B55` | Card hover, elevated   | —                      |
| `--neutral-700`| `#2A3F5F` | —                      | —                      |
| `--neutral-600`| `#415A77` | —                      | Secondary text         |
| `--neutral-500`| `#778DA9` | Tertiary text          | Tertiary text          |
| `--neutral-400`| `#A2B5CD` | Secondary text         | —                      |
| `--neutral-300`| `#D1DCE8` | —                      | Borders                |
| `--neutral-200`| `#E8EDF2` | —                      | Card hover             |
| `--neutral-100`| `#F0F4F8` | Primary text           | Base background        |
| `--neutral-50` | `#F8FAFB` | —                      | —                      |
| `--neutral-0`  | `#FFFFFF` | —                      | Card background        |

- **Dark mode surfaces:** `#0D1B2A` (base), `#1B2D44` (card), `#243B55` (hover/elevated)
- **Light mode surfaces:** `#F0F4F8` (base), `#FFFFFF` (card), `#E8EDF2` (hover)
- **Dark mode strategy:** Default theme. Reduced saturation on semantic colors is already built into the palette. Borders use `rgba(255, 255, 255, 0.1)` default, `rgba(255, 255, 255, 0.18)` strong.
- **Light mode strategy:** Swap surface and text tokens via `[data-theme="light"]` CSS. Borders become `rgba(0, 0, 0, 0.08)` default, `rgba(0, 0, 0, 0.12)` strong. Semantic colors stay the same.

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable — tighter than Tripsy (spacious) because maritime data needs density, but not cramped
- **Scale:**

| Token         | Value | Usage                                      |
|---------------|-------|-------------------------------------------|
| `--space-2xs` | 2px   | Micro gaps (between label and sublabel)    |
| `--space-xs`  | 4px   | Inline gaps, icon margins                  |
| `--space-sm`  | 8px   | Tight component padding, list gaps         |
| `--space-md`  | 12px  | Standard component padding, form gaps      |
| `--space-lg`  | 16px  | Card padding, section margins              |
| `--space-xl`  | 24px  | Card internal spacing, major gaps          |
| `--space-2xl` | 32px  | Section separation                         |
| `--space-3xl` | 48px  | Page-level separation                      |

## Layout
- **Approach:** Grid-disciplined — single column on mobile (primary viewport for boaters), max 800px on desktop. Cards stack vertically.
- **Grid:** Single column. No sidebar. No multi-column complexity. Form rows may use 2-column grid on desktop (`grid-template-columns: 1fr 1fr`), stack to 1-column on mobile.
- **Max content width:** 800px
- **Mobile-first:** This is a mobile website, not a desktop app. Design for phone screens first, then expand for tablet/desktop. Breakpoints: 600px (phone → tablet), 900px (tablet → desktop).
- **Border radius:**

| Token        | Value | Usage                                    |
|--------------|-------|------------------------------------------|
| `--radius-sm`| 6px   | Inputs, chips, buttons, small elements   |
| `--radius-md`| 12px  | Cards, panels, bridge list items         |
| `--radius-lg`| 16px  | Result cards, modals, large containers   |

## Motion
- **Approach:** Minimal-functional — transitions only where they aid comprehension
- **No decorative animations.** No floating elements, no drifting backgrounds, no pulsing effects. The app earns trust through stillness and competence.
- **Easing:**
  - Enter: `cubic-bezier(0.0, 0.0, 0.2, 1)` (ease-out)
  - Exit: `cubic-bezier(0.4, 0.0, 1, 1)` (ease-in)
  - Move: `cubic-bezier(0.4, 0.0, 0.2, 1)` (ease-in-out)
- **Duration:**
  - Micro (hover, focus): 150ms
  - Standard (card reveal, tab switch): 250ms
  - Emphasis (result status card): 400ms
- **`prefers-reduced-motion`:** All animations and transitions become instant (duration: 0.01ms). This is mandatory, not optional.

## Component Patterns

### Cards
- Solid background (`--surface-card`), not glassmorphism
- 1px border (`--border-default`)
- Box shadow for depth (`--shadow-card`)
- Header pattern: 40px icon (tinted bg) + title + subtitle
- Border radius: `--radius-md` (12px)

### Buttons
- Primary: `--color-accent` bg, `--neutral-950` text (amber CTA)
- Secondary: Transparent bg, border, `--text-primary` text
- Ghost: Transparent, `--color-primary` text, no border
- Danger: `--color-danger` bg, white text
- Minimum height: 44px (touch target)
- Border radius: `--radius-sm` (6px)
- Font: DM Sans 600, `--text-sm`

### Inputs
- Background: `--surface-base`
- Border: 1px solid `--border-strong`
- Focus: border-color `--color-primary`, box-shadow `0 0 0 3px var(--color-info-bg)`
- Minimum height: 44px (touch target)
- Border radius: `--radius-sm` (6px)
- Labels: DM Sans 600, `--text-xs`, uppercase, 0.5px letter-spacing

### Alerts / Info Panels
- Semantic background color (15% opacity)
- 1px border (25% opacity of semantic color)
- Border radius: `--radius-sm` (6px)
- Icon + text inline

### Result Cards
- Border radius: `--radius-lg` (16px)
- Hero section: solid semantic color bg (safe/warning/danger), white text
- Body: `--surface-card` bg with data rows
- Clearance box: semantic bg, large Satoshi 900 number

### Boat Profile Chips
- Horizontal row of pills above height input
- Border: 1px solid `--border-strong`
- Selected: `--color-info-bg` bg, `--color-primary` border and text
- Add chip: Dashed border, tertiary text
- Min height: 36px

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-18 | Initial design system created | Created by /design-consultation based on competitive research (Orca, Savvy Navvy, Tripsy) and product context |
| 2026-03-18 | Satoshi + DM Sans chosen | Satoshi gives visual identity no maritime app has. DM Sans is readable, warm, free. |
| 2026-03-18 | Amber accent (#E8A838) over yellow | References brass nautical instruments. Warmer than AI-default yellow. Differentiates from blue-on-blue competitors. |
| 2026-03-18 | No glassmorphism | Solid surfaces with shadow depth. Faster, more readable, better mobile browser compat, less AI-template. |
| 2026-03-18 | Minimal-functional motion | Safety tool earns trust through stillness. Kill decorative animations. |
| 2026-03-18 | 3-tier border radius (6/12/16) | Consolidates 9 ad-hoc values into intentional hierarchy. |
| 2026-03-18 | Mobile website confirmed | Not a native app. Design for mobile browsers first. Font loading via CDN acceptable. |
