# DESIGN TOKENS — FINAL (Direction B+)

> **Status: FINAL for Phase 04** — locked Direction **B+ (Editorial Brutalism)**. Contrast values measured (WCAG). Implemented in `repo/experiments/art-direction/direction-b-plus/style.css` as CSS custom properties.

---

## 1. Color — locked palette

| Token | Hex | Use | Measured contrast |
|---|---|---|---|
| `--base` | `#F6F1E8` | page background (warm paper) | — |
| `--surface` | `#EFE8DC` | raised surfaces, image beds, ticker | — |
| `--text` | `#1A1712` | primary text (ink) | **15.88:1** on base — AAA |
| `--text2` | `#6B6357` | secondary text, captions, meta | **5.26:1** on base · **4.86:1** on surface — AA ✅ |
| `--accent` | `#A8442A` | key-word emphasis, links, active, small marks | **5.29:1** on base · **4.89:1** on surface — AA ✅ |
| `--line` | `#D9CFC0` | hairlines, dividers | decorative |

**Rule:** terracotta is an *accent*, never a large background fill. Used for: emphasised words, link hover/active, nav active dot, key marks, primary CTA button.

**Per-project accent (optional, inside case study only):** CINIS keeps its own product palette (see §7); PES/MOVA may each take one accent later — not used on the global shell.

---

## 2. Typography — locked

| Role | Family | Weights | Notes |
|---|---|---|---|
| Display / Heading | **Fraunces** (variable serif) | 400 / 600 + italic | editorial voice, italic for emphasis |
| Bold-sans conflict (hero) | **Archivo** | 800 | the "brutalist" counterweight in the hero |
| Body / UI | **Inter** | 300/400/500/600/700 | reading text |
| Mono | **IBM Plex Mono** | 400/500 | labels, folios, captions-meta |

- All four are **open-source (SIL OFL)** — free for commercial use. **Chinese fallback:** `'PingFang SC','Microsoft YaHei',sans-serif` is stacked after Inter for CJK; Fraunces has no CJK glyphs, so CJK display text falls back to the serif's system CJK pair — **TODO: confirm a preferred CJK display face** (e.g., Noto Serif SC / Source Han Serif) if CJK display type is needed.

### Type scale (fluid)
| Token | clamp / value | Use |
|---|---|---|
| hero l1 (serif) | `clamp(48px, 8.6vw, 124px)` | hero line 1 |
| hero l2 (Archivo 800) | `clamp(56px, 11vw, 168px)` | hero line 2 (outline option) |
| hero l3 (serif italic) | `clamp(44px, 7.4vw, 108px)` | hero line 3 |
| h1 page | `clamp(56px, 11vw, 140px)` | Works / About / Contact |
| h2 section | `clamp(30px, 4vw, 58px)` | section heads |
| lead | `clamp(20px, 2.4vw, 28px)` | standfirst |
| body | `17px` (16–17.5) | reading |
| small | `13–14px` | captions |
| mono | `11–12px`, tracking `.12–.2em`, uppercase | labels |

Line-height: hero `.84–.92`, headings `1.0–1.1`, body `1.65–1.8`.

---

## 3. Spacing & layout

- Wrap `--wrap: 1320px`; gutter `48px` desktop → `32px` tablet → `20px` mobile.
- Vertical section rhythm: `88px` desktop, `56px` mobile.
- Reading measure: case-study body `820px`; prose `64ch`.
- **Grid:** 12-col (`repeat(12,1fr)`, gap `26px`); asymmetric spans (8/4, 7/5, 12-wide). Works uses 8/4 and a 12-wide band — deliberately unequal cards.

## 4. Radii / borders
- Editorial default radius **0** (sharp). Images / cards `2px`. Phones `34px`. Chips/pills `999px`.
- Rules: section top rules `2px solid --ink`; hairlines `1px --line`.

---

## 5. Motion tokens (locked)

| Token | Value |
|---|---|
| `--dur-1` | 120ms (micro: color, underline) |
| `--dur-2` | 200ms (link/button state, page-leave) |
| `--dur-3` | 320ms (card lift, padding shift) |
| `--dur-4` | 480ms (line reveal) |
| `--dur-5` | 700ms (section/hero entrance, image zoom) |
| `--ease-std` | `cubic-bezier(.2,0,0,1)` |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` |

**Implemented patterns**
- **Hero line reveal:** `heroRise` keyframes, staggered .05/.18/.30s (pure CSS; visible fallback).
- **Text split:** word-level `.split` → `.w > span` translateY(105%)→0 on `.in`.
- **Scroll reveal:** IntersectionObserver adds `.in` (`opacity 0→1`, `translateY 28px→0`, `--dur-5`).
- **Image reveal / subtle scale:** project image `scale(1.05)` on hover (`--dur-5`).
- **Underline draw:** nav/link `::after` width 0→100% (`--dur-2`); active persists + accent dot.
- **Card hover:** lift / padding-shift; caption color → accent.
- **Page transition:** fade + 16px rise (`pageIn`), fade-out on internal nav.
- **Reduced-motion:** all animations/transitions collapsed to ~0ms; `.rv`/`.split` forced visible; ticker/hero animation off.
- **No `transition: all`** (verified by grep). One signature effect per surface.

---

## 6. Component tokens
- Primary button: mono uppercase 12px, `--accent` fill, white text, hover darken + gap grow.
- Ghost button: 1.5px ink border, hover → ink fill / paper text.
- Nav: sticky, blurred paper bg, mono links, active underline+dot.
- Section marker: mono `NN ·` in `--text2`.
- Pull-quote: Fraunces italic, `--accent`, 2px left rule.

---

## 7. CINIS product palette (inside case study — real, from Figma spec)

| Token | Hex |
|---|---|
| Bg | `#F5F7FB` |
| Surface | `#FFFFFF` |
| Ink | `#16181D` |
| Ink2 | `#5F6773` |
| Primary | `#FF7A1A` |
| Line | `#E4E7EC` |
| Mode · Traveler | card `#15211C` · text `#EFEAE1` · accent `#287D68` |
| Mode · Knight | card `#19233A` · text `#F2F5FA` · accent `#E0B45C` |
| Mode · Abyss | card `#1B1230` · text `#F2EBFF` · accent `#7C3AED` |

Typeface OPPO Sans 4.0 (product) · radius 9/16/35/999 · canvas 390×844.

---

## 8. Confirm before production
1. CJK display face for Fraunces fallback (Noto Serif SC / Source Han Serif?). *(TODO)*
2. `--text2` passes AA at 5.26 — keep as-is (verified).
3. Per-project accents for PES/MOVA. *(TODO)*
4. Final personal identity / contact to replace placeholders.
