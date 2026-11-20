# DESIGN DIRECTION — Direction B · Modern Editorial

> **Status: CURRENT (Phase 05).** This supersedes all earlier directions — the Type-Brutalism (A) / Kinetic (C) exploration, and the interim **"B+"** warm-paper/serif/terracotta version. B+ is retained only as a **historical record** and is **not** the current design name.

## Locked decisions (user-confirmed)

| Axis | Decision |
|---|---|
| Direction | **Direction B — Modern Editorial** |
| Hero | **Bold — Version A（左侧锚定·紧凑）· 已锁定** |
| Background | **Cool** (cool light gray, not warm paper) |
| Typography | **Sans-serif only** (no serif, ever) |
| Language | **Chinese-first / bilingual-ready** |
| Accent | **Modern Iris** 冷调鸢尾紫（single accent） |

**Banned / retired:** Fraunces, Georgia, Times, any serif; warm paper (`#F6F1E8`) as global background; terracotta (`#A8442A`) as global accent; any unconfirmed "hybrid B+" spec.

## Color — semantic tokens (single source of truth)

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#F2F4F7` | page background (cool) |
| `--color-surface` | `#E8ECF1` | raised surfaces, image beds |
| `--color-text` | `#11151B` | primary text |
| `--color-text-secondary` | `#5E6773` | secondary text, captions |
| `--color-border` | `#CCD3DC` | hairlines, borders |
| `--color-accent` | `#6552D6` | Modern Iris — emphasis, links, active, key words |
| `--color-accent-hover` | `#5946C8` | accent hover/active |
| `--color-accent-soft` | `#EAE6FF` | soft accent fills (e.g., cover band) |
| `--color-on-accent` | `#FFFFFF` | text on accent fill |

All components read from these semantic tokens — no hard-coded palette in rules.

## Typography — Chinese-first, sans-only

- **Chinese:** MiSans (primary) → HarmonyOS Sans SC → Source Han Sans / Noto Sans SC.
- **Latin:** Space Grotesk (display) · Inter (body) · IBM Plex Mono (numbers / aux labels).
- **Weights (disciplined, no global bolding):** Hero **700** · section headings **600** · sub-heads **500–600** · body **400** · auxiliary **400–500**.
- Natural Chinese tracking (display −0.02em…0; body 0…0.02em); semantic line breaks, never rely on auto-wrap for the hero.
- Full spec: [`CHINESE-TYPOGRAPHY-SPEC.md`](CHINESE-TYPOGRAPHY-SPEC.md).

## Grid & composition

- 12-col invisible grid; asymmetric but aligned; content spans and offsets are deliberate.
- Hero: "staggered but tight" — asymmetric structure that still follows the grid; bold without clutter.
- Selected Works: **the work is the protagonist** — a large CINIS feature (real UI), secondary pieces editorial.
- Generous whitespace; hairline rules; cool, low-chroma surfaces.

## Motion principles

Only refine: Hero Text Reveal · Project Image Reveal · Hover Feedback · Navigation Active Indicator · Scroll Section Reveal.
Each: reasonable duration, one unified easing, interruptible, `prefers-reduced-motion` fallback, mobile-safe. No particle/full-screen effects. Reference principles from ReactBits / Transitions.dev.

## Honesty & preservation

- Identity / bio / contact remain **placeholder + TODO**; no fabricated facts, metrics, or renders.
- **CINIS's own product palette is preserved** inside the case study (its orange `#FF7A1A`, mode themes) — portfolio rebrand does not alter the original project's visuals.

## Historical (archived, superseded)

- Direction **A** — Typographic Brutalism · Direction **C** — Kinetic Experimental (`experiments/art-direction/direction-a|c`).
- **"B+"** — interim warm-paper / Fraunces-serif / terracotta version (`docs/DIRECTION-B-PLUS-REVIEW.md`, `docs/PHASE-04-REPORT.md`). Historical only; do not use as current name or spec.
