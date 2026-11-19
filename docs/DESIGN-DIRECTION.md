# DESIGN DIRECTION

> Phase 05 deliverable — visual direction, reference analysis and motion system for the personal design portfolio.
> Keywords: **Experimental Art Direction · Editorial Design · Typography-driven · Creative Interaction · Motion · Asymmetric Grid.**
> Everything is a *direction / proposal*; unconfirmed specifics are marked **TODO**.

---

## 0. North star

The site must read as **a designed object, not a résumé page**. Editorial typography leads; motion serves narrative; asymmetry is structural, not decorative. Restraint over spectacle: every animation must earn its place by clarifying hierarchy or state.

---

## 1. Visual keywords (primary → supporting)

1. **Editorial** — magazine-grade type scale, large display headings, generous negative space, captions & folios.
2. **Asymmetric** — offset grids, intentional imbalance, overlapping planes, full-bleed accents against a strict baseline.
3. **Typographic** — type *is* the image. Oversized variable type, tight leading on display, wide tracking on labels.
4. **Kinetic** — motion tied to reading order and scroll, not ambient noise.
5. **Tactile** — subtle grain/noise, ink-black + paper-white base, one signal accent.
6. **Systematic** — a real token system (color/type/space/motion) underneath the experimental surface.

---

## 2. Reference analysis

### 2.1 ReactBits (`https://www.reactbits.dev/`)

- Offers 250+ animated components, installed **as source you own** (JS or TS, plain CSS or Tailwind), via copy or CLI. GitHub: `github.com/DavidHDev/react-bits`. Free tier + **Pro** (some components pro-only). **License must be checked per component before use** → OPEN-QUESTION.
- Categories present: Text Animations, Animations, Components, Backgrounds, Micro Interactions.

**Curated shortlist (only components that fit *this* brief — no indiscriminate animation):**

| Purpose in portfolio | Candidate ReactBits component | Why it fits | Risk / note |
|---|---|---|---|
| Hero background | **`Soft Aurora`** / **`Grainient`** / **`Iridescence`** | Calm, editorial-safe, subtle; grain aligns with "tactile" keyword | WebGL; gate behind reduced-motion & low-power fallback |
| Hero headline reveal | **`Split Text`** or **`Blur Text`** | Restrained stagger; supports typographic-first hierarchy | Prefer Split over flashy options |
| Section headline scroll | **`Scroll Reveal`** / **`Scroll Float`** | Ties type entrance to scroll, low-noise | Must respect `prefers-reduced-motion` |
| Project cover interaction | **`Tilted Card`** (reuse CINIS `TiltCard` pattern) | Pointer-tilt on covers = "creative interaction"; already validated in CINIS | Cap tilt angle, spring damping |
| Project cover hover | **`Glare Hover`** / **`Spotlight Card`** | Directional light feedback that reads editorial, not gimmicky | Use one, not both |
| Gallery / works grid | **`Masonry`** or **`Scroll Stack`** | Supports asymmetric editorial grid + stacked narrative | Verify layout control; avoid fighting custom grid |
| Text accent / label | **`Shiny Text`** or **`Gradient Text`** | Micro-highlight for folios/labels | Use sparingly for accent only |
| Cursor personality | **`Target Cursor`** / **`Crosshair`** | Editorial "measuring" feel on a design portfolio | Optional; disable on touch |
| Page-grain overlay | **`Noise`** | Film-grain texture across pages | Very subtle; performance-cheap |

**Explicitly rejected for this build:** `Glitch Text`, `ASCII Text`, `CRT Warp`, `Hyperspeed`, `Balatro`, `Splash Cursor`, particle-text effects — too loud / off-brand for an editorial portfolio; would fight typography. (Revisit only if user wants a bolder direction.)

**Adoption rules:** pin exact versions, copy source (no runtime CDN dependency), verify license (free vs Pro), provide a CSS-only static fallback, and wrap all pointer/scroll effects behind `prefers-reduced-motion`.

### 2.2 Transitions.dev (`https://transitions.dev/`)

- "UI transitions for AI agents" — a library of **43+ crafted transitions** in **HTML/CSS/React**, plus a builder & MCP. Free "Essential" tier; **several marked Pro-only** (e.g., Confetti burst, Gooey plus menu, Card stack hover, Organic shimmer, Drag & drop with physics).
- Named transitions relevant here: **Texts reveal** (two lines rise, offset stagger), **Text states swap** (blur swap), **Pill indicator follows active tab**, **Menu dropdown origin-aware open/close**, **Tooltip delayed in / instant out**, **Input clear with per-word dissolve**, **Success check with blur+rotate**, **Page side-by-side forward/back page transition**, **Card resize**, **3D tilt with cursor glare**, **Skeleton → content cross-fade**, **Accordion grid-rows height + chevron morph**.

**What we take:** *principles and timings*, not a wholesale copy of paid implementations. We will implement our own equivalents in the chosen stack, using Transitions.dev's semantics (origin-aware open/close, delayed-in/instant-out tooltips, offset-stagger text reveal) as behavioral references.

---

## 3. Motion system (unified)

All values are **proposals** to be tuned in build (TODO: confirm against real content density).

### 3.1 Duration scale

| Token | Value | Use |
|---|---|---|
| `dur-1` | 120 ms | Micro: hover color, icon state |
| `dur-2` | 200 ms | UI: tooltip in, button press, link underline |
| `dur-3` | 320 ms | Component: card lift, tab indicator, dropdown |
| `dur-4` | 480 ms | Emphasis: text reveal per line, page element |
| `dur-5` | 700 ms | Hero entrance, section stagger container |
| `dur-page` | 520 ms | Route/page transition |

### 3.2 Easing

| Token | Cubic-bezier | Character |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | default UI |
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | entrances, reveals |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | transforms that return |
| `ease-spring-soft` | spring (stiffness ~180, damping ~22) | card/tilt settle |

### 3.3 Stagger / delay

- Text line reveal: **60–90 ms** per line (max 4 lines).
- Grid item reveal: **40–70 ms** stagger (max 8 items, then cut).
- Never postpone content > **~250 ms** after it enters viewport.

### 3.4 State model (per interactive element)

| State | Enter | Exit | Hover | Focus |
|---|---|---|---|---|
| Card | fade + 12px rise + 0.98→1 scale (`dur-4`, `ease-out-expo`) | fade out `dur-2` | tilt ≤6°, glare follows pointer, shadow lift | **visible 2px focus ring**, same lift, no tilt on keyboard |
| Nav link | — | — | underline draws L→R `dur-2` | focus ring; underline persists |
| Project cover | image scale 1→1.04 over `dur-5` on reveal | reset `dur-3` | glare/spotlight + optional parallax ≤8px | focus ring, caption revealed |
| Page transition | content fade+translateY 16px in (`dur-page`) | fade out | — | focus moves to page h1 |

### 3.5 Rules (non-negotiable)

- **No `transition: all`.** Animate explicit properties only (`transform`, `opacity`, `filter`, `clip-path`, `color`, `border-color`). Never animate layout-thrashing props (`width/height/top/left`) except where `grid-template-rows` morph is intentional (accordion).
- **Prefer `transform` + `opacity`** (GPU). Target 60fps.
- **`prefers-reduced-motion: reduce`**: disable parallax, tilt, auto-plays, background shaders; keep only instant fades ≤120 ms; no stagger delays; no scroll hijack.
- **Hover ≠ Focus.** Keyboard users get equivalent feedback without pointer-only effects.
- Motion must be **interruptible** and never block input.
- One signature effect per surface (don't stack tilt + glare + parallax + shader on the same card).

---

## 4. Typography direction

- **Display:** a high-contrast, editorial serif or an expressive grotesk for oversized headlines. Candidates (to license/confirm → TODO): e.g., *PP Editorial New / Fragment / Söhne Breit / Instrument Serif / GT Alpina*. Must have a real web license.
- **Body/UI:** a neutral, highly legible grotesk (e.g., *Inter / Söhne / ABC Diatype* — TODO pick + license).
- **Mono/labels:** a functional mono for folios, captions, tags (e.g., *JetBrains Mono / IBM Plex Mono*).
- Scale: modular, viewport-fluid `clamp()`; display can exceed 8–12vw in hero. Tight leading on display (−0.02 to −0.04em), wide tracking on small caps labels (+0.08em).
- **TODO:** confirm final typefaces + licensing budget.

---

## 5. Color exploration direction

- Base: **ink near-black** on **paper off-white** (editorial), with a subtle warm/cool temperature choice (TODO).
- One **signal accent** (electric / acid / vermilion — TODO pick) used sparingly for state & emphasis.
- Project-specific accent per case study (CINIS could pull a cool blue from its palette; PES a technical graphite; MOVA a cinema deep-red) — used *only inside* each case study, never globally.
- Texture: very light film grain overlay (ReactBits `Noise`) at low opacity.
- **TODO:** full palette with AA/AAA contrast verification.

---

## 6. Grid direction

- **12-column asymmetric editorial grid** on desktop; deliberate offsets (content occupying cols 3–9, images bleeding to edge).
- Baseline grid for vertical rhythm; full-bleed bands between sections to reset the eye.
- Mobile: single column with intentional full-bleed images and over-sized type; consistent with desktop hierarchy (no layout that "collapses" arbitrarily).
- **TODO:** lock exact gutter/margin tokens in build.

---

## 7. Motion / interaction directions by page

| Page | Direction |
|---|---|
| Home hero | Calm shader/grain bg + split-text headline reveal; oversized type; asymmetric intro block |
| Featured projects | Tilt/glare cards in an asymmetric editorial grid; staggered scroll reveal |
| Works listing | Filter pills with sliding indicator (Transitions.dev "pill indicator"); masonry or stacked cards |
| Case study | Scroll-driven section reveal (texts reveal, skeleton→content), image parallax capped, sticky section labels |
| About | Editorial long-read typography; restrained link/micro interactions |
| Contact | Minimal; emphasis on email + social; subtle hover states |
| Global | Route transition (fade+rise), nav underline draw, delayed-in tooltips |

---

## 8. Page style exploration (moodboard plan — TODO)

- Explore 2–3 hero directions: (a) type-dominant B&W with grain; (b) duotone accent + oversized serif; (c) monochrome with a single animated gradient band.
- Produce static mockups before committing to shaders, to avoid motion-driven design.
- **TODO:** generate visual moodboards in Phase 04 planning before build.

---

## 9. Open design decisions (see OPEN-QUESTIONS.md)

1. Final typefaces + licensing.  
2. Accent color + base temperature.  
3. How experimental the hero should be (calm vs bold).  
4. Whether to embed live CINIS prototype via iframe or link out.  
5. Whether to use ReactBits directly (license/Pro confirmation) or re-implement equivalents.

---

## 10. FINAL LOCKED DIRECTION — Direction B+ (Phase 04)

> The exploration (Sections 1–9) is historical. **The final locked direction is Direction B+ — Editorial Brutalism.**

**Composition:** 70% Editorial Contrast · 20% Typographic Brutalism · 10% Kinetic Experimental (guidance of emphasis, not literal area).

**Locked decisions**
- **Background** `#F6F1E8` · **Surface** `#EFE8DC` · **Primary text** `#1A1712` · **Secondary** `#6B6357` (AA verified 5.26:1) · **Accent terracotta** `#A8442A` (accent only, never large fill).
- **Type:** Fraunces (display/heading) · Inter (body) · IBM Plex Mono (labels) · Archivo 800 (hero bold-sans contrast) — all open-source. CJK fallback stacked.
- **Hero:** "Designing / IN SYSTEMS (outline) / & Type" — serif italic + heavy grotesque outline + italic accent; bold but not a full-page brutalist poster.
- **Nav:** HOME · WORKS · ABOUT · CONTACT (CINIS is a case-study route, not top-level).
- **Motion:** split/line reveal, image reveal/scale, underline draw, hover lift, page fade+rise, scroll reveal; reduced-motion honoured; no `transition: all`.

**Where it lives:** `repo/experiments/art-direction/direction-b-plus/` (home, works, cinis, about, contact).
**Tokens:** see `DESIGN-TOKENS-DRAFT.md` (FINAL). **Review:** see `DIRECTION-B-PLUS-REVIEW.md`. **Report:** see `PHASE-04-REPORT.md`.

---

## 11. TYPOGRAPHY REVISION (Phase 05) — Chinese-first, serif banned

> Supersedes the serif direction in §4. **All serif families are removed** (Fraunces / Georgia / Times / generic `serif`).

- **System:** Chinese-first, bilingual-ready modern sans. Chinese gets its own scale, tracking, leading and line-breaking; English is auxiliary.
- **Chinese:** **MiSans** (primary) → HarmonyOS Sans SC → Source Han Sans SC / Noto Sans SC.
- **Latin:** Space Grotesk (display) · Inter (body) · IBM Plex Mono (metadata / numbers).
- **Mechanism:** heading/body stacks lead with Latin (no CJK glyphs) so Chinese auto-falls to MiSans via Unicode coverage — never to a serif.
- **Hero reworked to Chinese:** 「设计，让复杂变得清晰。」 — 3 asymmetric lines, weight contrast, keyword 「清晰」 in **electric blue `#2D6BFF`** (hero-only accent), small English auxiliary `DESIGN · CLARITY`. Example copy is a **placeholder pending your confirmation** (not asserted as your personal statement).
- **Accent discipline:** electric blue = hero keyword only; everything else uses terracotta `#A8442A`.
- **All pages** converted Chinese-first (nav 首页/作品/关于/联系; section heads Chinese + English mono labels; case-study 12 sections in Chinese).
- Full spec: `CHINESE-TYPOGRAPHY-SPEC.md`. Specimen: `direction-b-plus/_type-specimen.html` (`_shots/SPEC-desktop.png`, `SPEC-mobile.png`).
