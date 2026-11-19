# VISUAL EXPLORATION

> **Phase 03 — Visual Exploration & Art Direction.** Three independent visual directions, each built as a runnable prototype (Home / Works / CINIS Case Study), validated on desktop & mobile.
> Scope: exploration prototypes only — **not** the production site. No production branch touched, no deploy.

---

## 00. Environment confirmation (this phase)

| Check | Result |
|---|---|
| Git repository | `repo/` = clone of `canchuang/CINIS-webdemo` |
| Current branch | **`portfolio-redesign`** ✅ |
| HEAD | `cb91106` = `origin/main` HEAD (branch derived from production) |
| Working tree | Clean except new `experiments/` (untracked, expected) — **no tracked file modified** |
| Production `main` / `gh-pages` | **Untouched** |
| CINIS backup | `assets/source/CINIS-webdemo` — **66 files / 4,855,835 bytes, SHA256 all verified OK** (`assets/source/cinis-assets-hashes.csv`) |
| Source vs working files | Source = `assets/source/**` (read-only); working outputs = `repo/experiments/**` — separated |
| Headless browser | Chrome available → used to capture real screenshots |

**Prototype location:** `repo/experiments/art-direction/direction-{a,b,c}/`
**Open locally:** double-click `index.html` in each folder (nav → Works ⇄ CINIS works via relative links).
**Screenshots:** `repo/experiments/art-direction/_shots/` (desktop + mobile per direction).

---

## 01. Method

- **Same content across all three directions** so the comparison is about *design language*, not content differences.
- **Real CINIS material**: 8 real UI screens captured from the live prototype + original character/illustration assets (character-traveler / knight / abyss, growth-scene, achievement badges).
- **PES & MOVA**: real textual descriptors + deliberately *designed placeholder structures* — **no fabricated renders** are passed off as real work.
- **Identity**: clearly a placeholder ("YOUR NAME", `TODO` for bio/contact) — no invented bio, credentials, awards, metrics, or user-test data.
- **Tech**: plain HTML + CSS + a little vanilla JS per direction. No build step, no new dependencies (per brief: avoid unnecessary deps in exploration). Production stack stays React + Vite on the branch.

---

## 02. Direction A — Typographic Brutalism

**Strategy** — the site *is* a typographic statement. Monochrome ink-on-paper, oversized Archivo Black, hard 2px rules, exposed grid, film-grain overlay. Editorial brutalism: content laid bare, whitespace used as a weapon.

| Token | Value |
|---|---|
| Display | `Archivo Black` (heavy grotesque) |
| Body | `Space Grotesk` |
| Mono | `IBM Plex Mono` (folios / labels) |
| Base | `#E9E5DC` (paper) |
| Text | `#0B0B0B` (ink) |
| Secondary | `#6E6A60` |
| Accent | `#FF3B00` (signal vermilion, used sparingly) |
| Border | `#0B0B0B` (2px hard rules) |
| Grid | 12-col with deliberate offsets; full-bleed bands; oversized display breaking the measure |

**Page behaviour**
- **Home** — hero headline "DESIGN AS A STATEMENT" at ~12vw with an outlined-word contrast; marquee band; projects as an index list (01/02/03) that **inverts to black on hover**; expertise in a bordered 3-cell table; oversized contact statement.
- **Works** — filter tabs (All / UI-UX / Product) that live-filter cards; asymmetric card grid (7/5 then 5) with hard borders and an 8px offset "print" shadow on hover.
- **CINIS Case Study** — full-black cover with 300px "CINIS"; 01–07 numbered sections; three modes as bordered columns with real character art; growth system full-bleed; UI screens in bordered phone frames; prototype CTA; reflection.

**Interaction** — project-row hover invert + translate; works filter; card offset-shadow hover; nav underline draw.
**Mobile** — single column, oversized type preserved, marquee + index list stack cleanly (captured at 520px, no clipping).

**Screenshots:** [home](repo/experiments/art-direction/_shots/A-home-desktop.png) · [works](repo/experiments/art-direction/_shots/A-works-desktop.png) · [CINIS](repo/experiments/art-direction/_shots/A-cinis-desktop.png) · [mobile](repo/experiments/art-direction/_shots/A-home-mobile.png)

---

## 03. Direction B — Editorial Contrast

**Strategy** — magazine-grade editorial. Serif-first (Fraunces, variable), warm paper, a single terracotta accent, hairline rules, drop caps, caption discipline. Art direction where *proportion* between image, headline and caption carries the rhythm.

| Token | Value |
|---|---|
| Display | `Fraunces` (variable serif, roman + italic) |
| Body | `Inter` |
| Mono | `IBM Plex Mono` |
| Base | `#F6F1E8` (warm paper) |
| Surface | `#EFE8DC` |
| Text | `#1A1712` |
| Secondary | `#7C7468` |
| Accent | `#A8442A` (terracotta) |
| Border | `#D9CFC0` (1px hairlines) |
| Grid | 12-col editorial; narrow measure for reading; asymmetric image/text splits |

**Page behaviour**
- **Home** — serif hero with italic accent words; a byline column; projects as slim editorial rows with a small thumbnail that **zooms on hover**; expertise as ruled columns; centred serif CTA.
- **Works** — two-column editorial grid with **ruled captions** and image zoom; the "magazine spread" rhythm.
- **CINIS Case Study** — centred 760px reading column; **drop cap**; ruled section markers; modes as three columns with italic Chinese labels; full-width growth scene with caption; a **pull-quote**; 3-col gallery of real screens; prototype box; reflection.

**Interaction** — thumbnail/image hover zoom; animated link underlines; hover color shift on titles.
**Mobile** — single column, serif scale reduced, captions preserved.

**Screenshots:** [home](repo/experiments/art-direction/_shots/B-home-desktop.png) · [works](repo/experiments/art-direction/_shots/B-works-desktop.png) · [CINIS](repo/experiments/art-direction/_shots/B-cinis-desktop.png) · [mobile](repo/experiments/art-direction/_shots/B-home-mobile.png)

---

## 04. Direction C — Kinetic Experimental

**Strategy** — motion as narrative. Dark stage, animated gradient blobs, masked grid, kinetic type rising letter-by-letter, ticker, scroll-reveal, cursor glow. Restrained but memorable: motion clarifies hierarchy, never decorates randomly.

| Token | Value |
|---|---|
| Display | `Bricolage Grotesque` (variable) |
| Body | `Inter` |
| Mono | `IBM Plex Mono` |
| Base | `#0A0A0F` |
| Surface | `#14141C` |
| Text | `#EDEDF2` |
| Secondary | `#8A8A9A` |
| Accent | `#7C5CFF` (violet) · `#00E0B8` (mint) |
| Border | `rgba(255,255,255,.10)` |
| Grid | 12-col with glowing cards; scroll-driven section rhythm |

**Page behaviour**
- **Home** — kinetic hero "TYPE THAT / MOVES" (per-letter rise), animated background + grid, ticker, project cards with **cursor-follow glow**, scroll-reveal sections.
- **Works** — filter pills (active = mint), glowing asymmetric cards.
- **CINIS Case Study** — gradient "CINIS" title, glowing mode cards, growth band, 4-col device grid of real screens, glowing prototype box, scroll-reveal throughout.

**Interaction** — kinetic letter reveal, cursor-follow glow, IntersectionObserver scroll reveal, works filter, card hover lift/glow. Full `prefers-reduced-motion` fallback (motion disabled, all content visible).
**Mobile** — single column; heavy blurs reduced; content fully visible (captured 520px).
**Note:** a `?static=1` query param disables animation for reliable screenshots/QA.

**Screenshots:** [home](repo/experiments/art-direction/_shots/C-home-desktop.png) · [works](repo/experiments/art-direction/_shots/C-works-desktop.png) · [CINIS](repo/experiments/art-direction/_shots/C-cinis-desktop.png) · [mobile](repo/experiments/art-direction/_shots/C-home-mobile.png)

---

## 05. What each direction proves

| Aspect | A · Brutalism | B · Editorial | C · Kinetic |
|---|---|---|---|
| First impression | Loud, confident, ownable | Considered, tasteful, professional | Modern, alive, technical |
| Where the eye goes | The type | The headline + image proportion | The motion + color |
| How case-study work reads | Raw, gallery-like | Magazine feature | Immersive, cinematic |
| Risk | Can feel harsh / low warmth | Can feel "safe" / less experimental | Can distract / heavier to build |

> Full scoring in [`DESIGN-COMPARISON.md`](DESIGN-COMPARISON.md). Recommended token set in [`DESIGN-TOKENS-DRAFT.md`](DESIGN-TOKENS-DRAFT.md).

---

## 06. Honesty & asset notes

- Real CINIS screens used: today, growth, characterFile, achievements, goals, focus, history, me (captured from `cinis.netlify.app`).
- Real CINIS art used: traveler / knight / abyss, growth-scene, badges 1–3.
- **PES / MOVA**: text is the real project descriptor; imagery is a *designed placeholder* ("visual pending assets") — never a fake render.
- Personal identity: placeholder only. All `TODO`s are explicit.
