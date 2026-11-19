# DIRECTION B+ REVIEW

> Phase 04 — high-fidelity finalisation of **Direction B+ (Editorial Brutalism)**.
> Prototype: `repo/experiments/art-direction/direction-b-plus/` · Screenshots: `_shots/` · Tokens: `DESIGN-TOKENS-DRAFT.md`.

---

## 1. What B+ is

B+ = **Direction B (Editorial Contrast)** as the structural spine, with **20% of A's typographic brutalism** (oversized display, thick rules, grain) and **10% of C's kinetic restraint** (reveal, subtle motion). Composition target **70 / 20 / 10** — a guide to emphasis, not literal area.

The goal: keep B's *readability and work-showcase strength* while giving it A's *visual conviction* in the hero and C's *life* in motion — without becoming a brutalist poster.

---

## 2. Hero — internal iteration (3 layouts → 1 kept)

Three hero compositions were built in `_hero-lab.html` and rendered at 1440 (see `_shots/…` / lab render) before choosing.

| # | Layout | Idea | Verdict |
|---|---|---|---|
| **V1 — Stacked Offset** ✅ **CHOSEN** | `Designing` (Fraunces serif) → `IN SYSTEMS` (Archivo 800, `SYSTEMS` outlined, right-aligned) → `& Type` (Fraunces italic, terracotta) | Clean editorial contrast; the serif/grotesque collision reads instantly; asymmetry from the right-shifted sans line; accent only on one word. | **Best balance of bold + readable + original.** |
| V2 — Collision | giant outlined "FORM" ghost behind offset `Form / FOLLOWS / Feeling.` + vertical side label | Very graphic, memorable | Ghost overlaps the front line awkwardly; less legible; can feel like a poster. Not chosen. |
| V3 — Editorial Split | left index column (Selected/Expertise/Contact) + big `Editorial / BRUTAL / Expression.` crossing the gutter | Strong editorial grid logic | Busier first impression; the index column competes with the title on first load. Not chosen. |

**Chosen hero composition (V1)**
- Line 1 serif `Designing` (contemplative) → Line 2 Archivo 800 `IN SYSTEMS` with **outline** on "SYSTEMS" (brutalist shout) → Line 3 serif italic `& Type` with terracotta accent (editorial wink).
- Reading order preserved top→bottom; title breaks the 12-col grid intentionally (line 2 bleeds right) but never breaks reading order.
- At least contains: identity (wordmark `YourName`), discipline (`UI/UX & Product Designer`), main title, short positioning (hero lede), project entry (`View selected work ↓`), auxiliary info (Focus / Based / Status meta).
- Terracotta appears exactly twice in the hero (the `&` accent + CTA hover) — controlled.

> Note: V3 initially broke because a layout class `.split` collided with the JS text-splitting selector; renamed to `.hero-split`. Recorded for transparency.

---

## 3. Design DNA mapping

| Ingredient | How it shows |
|---|---|
| **Editorial (70%)** | Fraunces hierarchy, hairline rules, section markers `NN ·`, captions, reading column, restrained palette, drop caps, pull-quote. |
| **Brutalist (20%)** | Oversized hero display + Archivo 800, `2px` ink section rules, outlined word, full-bleed rules, subtle grain overlay (3.5%), sharp 0-radius surfaces. |
| **Kinetic (10%)** | Hero line reveal, word-split lede, scroll reveal, image hover scale, underline draw, page fade+rise, ticker marquee. One effect per surface. |

---

## 4. Pages built

### Home — `index.html`
01 Navigation (HOME/WORKS/ABOUT/CONTACT) · 02 Hero · 03 Selected Works (CINIS full-weight with real screenshot; PES/MOVA text placeholders) · 04 Design Philosophy & Expertise (editorial 3-col, no progress bars) · 05 Contact CTA · 06 Footer. Plus a kinetic ticker between hero and works.

### Works — `works.html`
Asymmetric grid: CINIS `8-col`, PES `4-col` (portrait), MOVA `12-col` wide — deliberately unequal. Filter (All / UI-UX / Product) works live. Hover image scale + title→accent. Cards navigate (CINIS → case study).

### CINIS Case Study — `cinis.html` (12 sections)
01 Cover · 02 Overview (+ meta) · 03 Background & Problem · 04 Three-Mode Mechanism (real traveler/knight/abyss art) · 05 Soulflame Growth System (growth-scene + badges) · 06 Information Architecture (4-tab diagram) · 07 User Flow (linear flow with 3 failure branches) · 08 Interaction Logic (real behaviours from the prototype) · 09 UI Design System (real Figma tokens + mode themes) · 10 High-Fidelity Screens (featured large + detail zoom + varied ratios + captions) · 11 Prototype (phone-frame **iframe** of the live site + external link) · 12 Reflection.

### About — `about.html`
Long-form editorial: sticky "At a glance" factbox + Introduction / Design Philosophy / Professional Direction / Skills & Method / Experience timeline. Unknowns explicitly `TODO`.

### Contact — `contact.html`
Minimal, memorable: big serif statement + ruled contact rows (Email / Resume / Behance / Dribbble / LinkedIn) all marked `TODO` (no invented links).

---

## 5. Motion inventory (vs. brief)

| Requirement | Implemented |
|---|---|
| Split Text | ✅ hero lede word-split reveal |
| Line Reveal | ✅ hero lines `heroRise` stagger |
| Italic emphasis transition | ✅ hero italic accent + hover color shifts on titles/links |
| Image Reveal / Subtle Scale | ✅ project image `scale(1.05)` on hover (`--dur-5`) |
| Clip-path transition | ◑ partially — reveal via translate/opacity (a `clip-path` variant is a TODO refinement) |
| Underline Draw | ✅ nav + link `::after` |
| Active Indicator | ✅ nav active underline + accent dot |
| Hover Scale / Tilt (optional) | ✅ hover scale; tilt intentionally omitted (avoid stacking) |
| Caption Reveal | ✅ captions tied to card hover / persistent editorial captions |
| Page Fade + Rise / Route Transition | ✅ `pageIn` + fade-out on internal nav |
| Scroll Reveal | ✅ IntersectionObserver |
| No `transition: all` | ✅ verified by grep |
| `prefers-reduced-motion` | ✅ all motion collapsed; content forced visible |
| No meaningless particles | ✅ none |
| Content never hidden on animation failure | ✅ `.js` gating + 2.6s force-reveal safety |

---

## 6. Responsive approach (1440 / 768 / 390)

- Fluid `clamp()` type; gutters 48→32→20.
- 12-col → single column; asymmetric spans collapse to full width.
- Works: 8/4/12 → stacked.
- Case study: 820px reading column → full width; IA 4-col → 2 → 1; screens grid → full-width.
- Nav: full links → condensed (16px gaps) on mobile.
- Hero: right-shifted sans line resets to left on mobile; sizes step down.
- Touch: targets ≥ ~44px; hover-dependent effects have non-hover equivalents (links remain visible; captions persist).
- No horizontal overflow (verified visually at 768 & 390; `overflow-x:hidden` guard).

---

## 7. Deviations & honesty notes

- **Identity** is a placeholder (`YourName`, "TODO — city", status TODO). No real name/bio/contact invented.
- **PES / MOVA** use real project descriptors + designed placeholder blocks — **no fabricated renders/UI**.
- **CINIS copy** is drew from the prototype/screens/`content.ts`/tokens; outcome metrics + user-testing are `TODO`, not invented.
- **About experience**: project entries are real; education/employment are `TODO` (not fabricated).
- **Prototype iframe**: tested — the live `cinis.netlify.app` loads in the phone frame in a normal browser. Some hosts block cross-origin frames; an external demo link is always provided. Mobile users should open the demo directly.
- **CJK display face**: Fraunces has no CJK glyphs; system CJK fallback used. A dedicated CJK display face is a TODO.
