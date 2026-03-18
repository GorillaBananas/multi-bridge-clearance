# TODOS

Deferred work from CEO plan review (2026-03-18).
Branch: `claude/install-gstack-setup-eFbqx`

---

## P1 — High Priority

### Design tokens: typography + spacing scale
**What:** Define CSS custom properties for a 6-step type scale (xs/sm/base/lg/xl/2xl), 8-step spacing scale (2/4/8/12/16/20/24/32px), and 3 border-radius sizes (sm/md/lg). Refactor all existing CSS to reference tokens instead of ad-hoc values.
**Why:** Currently 15 different font sizes and 15+ spacing values with no pattern. Every new component is a guessing game ("is a label 12px or 13px?"). The 5 new features from CEO review will compound this inconsistency. Required before light/dark mode (theme toggle swaps token values).
**Effort:** S (human: ~1 day) / CC: S (~15 min)
**Priority:** P1
**Depends on:** Nothing
**Blocks:** Light/dark mode toggle
**Context:** Decision 8A from /plan-design-review (2026-03-18).
**Files:** `css/styles.css` (refactor all rules to use tokens)

### Add test framework + core unit tests
**What:** Set up a lightweight test framework (Vitest or Node test runner) with unit tests for `interpolateTideHeight()`, LINZ CSV parsing, NZ DST calculation, NOAA response normalization, and `findBestTimes()` window grouping.
**Why:** Safety-critical math with no verification. The Rule of Twelfths interpolation directly determines whether a boat can safely pass under a bridge. A bug here has real-world consequences.
**Effort:** M (human: ~2 days) / CC: S (~15 min)
**Priority:** P1
**Depends on:** Nothing
**Files:** `js/tides.js`, `js/bridges.js`

---

## P2 — Medium Priority

### Add additional tide data providers (UK, Australia, Europe)
**What:** Add tide providers for UK (Admiralty API), Australia (BOM), and at least one European source. The `TideProviders` abstraction in `js/tides.js` already supports this — each new provider is a self-contained object with `findStation()` and `getTidePredictions()`.
**Why:** The app claims "worldwide" coverage but only has data for US coasts (NOAA) and New Zealand (LINZ). Users outside these regions get NOAA data from the nearest US station (thousands of km away), giving wildly incorrect tides.
**Effort:** L (human: ~2 weeks) / CC: M (~1 hour per provider)
**Priority:** P2
**Depends on:** NOAA station caching (establishes the caching pattern)
**Files:** `js/tides.js` (add new provider objects), `getTideProvider()` routing logic

### Vendor Leaflet.js locally
**What:** Download `leaflet.js` and `leaflet.css` into the repo (e.g., `vendor/leaflet/`), update `index.html` to reference local files instead of unpkg.com CDN.
**Why:** Eliminates CDN as a single point of failure. If unpkg.com goes down, the entire map component breaks and users can't find or select bridges.
**Effort:** S (human: ~30 min) / CC: S (~5 min)
**Priority:** P2
**Depends on:** Nothing
**Files:** `index.html` (script/link tags), new `vendor/leaflet/` directory

### PWA support with offline tide data caching
**What:** Add a service worker that caches the app shell and previously-loaded tide data. Show an "offline" indicator when serving cached data. Allow force-refresh to re-fetch.
**Why:** Target users (boat skippers) frequently have poor or no connectivity when they need this tool most — on the water, approaching a bridge.
**Effort:** M (human: ~1 week) / CC: S (~30 min)
**Priority:** P2
**Depends on:** Core app stable, NOAA station localStorage caching
**Files:** New `sw.js`, `index.html` (register service worker), `js/tides.js` (cache layer)

---

## P3 — Future

### Multi-bridge route planner
**What:** Select 2+ bridges in sequence, enter travel time between them, find the optimal departure time where all bridges have safe clearance. UI: ordered bridge list with drag-to-reorder, travel time inputs between each pair, single "Find Best Departure" button.
**Why:** Real-world use case for ICW (Intracoastal Waterway), canal systems, and harbor transits with multiple low bridges in sequence.
**Effort:** XL (human: ~3 weeks) / CC: L (~2-3 hours)
**Priority:** P3
**Depends on:** Core clearance engine, boat profiles, multiple tide provider support
**Architecture note:** The current `findBestTimes()` function operates on a single bridge. The route planner would need to compose multiple single-bridge windows with time-offset constraints. Design the bridge selection UI to support ordered lists (not just single selection).
**Files:** New `js/route-planner.js`, updates to `index.html` UI, `js/bridges.js` (multi-select support)
