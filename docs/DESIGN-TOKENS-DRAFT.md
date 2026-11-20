# DESIGN TOKENS — FINAL (Direction B · Modern Editorial)

> **Current (Phase 05).** Cool, sans-serif-only, Chinese-first. Supersedes the warm-paper/serif/terracotta spec. Implemented in `experiments/art-direction/direction-b-modern-editorial/style.css`.
> All color comes from **semantic tokens**; no hard-coded palette in rules.

---

## 1. Color — semantic tokens

| Token | Hex | Use | Contrast (measured) |
|---|---|---|---|
| `--color-bg` | `#F2F4F7` | page background (cool) | — |
| `--color-surface` | `#E8ECF1` | raised surfaces, image beds | — |
| `--color-text` | `#11151B` | primary text | **16.62:1** on bg · 15.43 on surface — AAA |
| `--color-text-secondary` | `#5E6773` | secondary text / captions | **5.20:1** on bg · 4.83 on surface — AA ✅ |
| `--color-border` | `#CCD3DC` | hairlines, borders | decorative |
| `--color-accent` | `#315EFB` | emphasis, links, active, key words | **4.62:1** on bg — AA ✅ (large text ≥3 on surface 4.29) |
| `--color-accent-soft` | `#E3EAFE` | soft accent fills (cover band) | — |

**Rules:** single accent = electric blue `#315EFB`. Terracotta/warm paper **removed**. For small accent text sitting on `surface`, use `--color-text` (or a darker accent) to keep AA — implemented on code chips.
**Preserved:** CINIS's own product palette (orange `#FF7A1A` + mode themes) stays **inside the case study** — not overridden by the portfolio theme.

---

## 2. Typography — Chinese-first, sans only

| Role | Family | Weights |
|---|---|---|
| Chinese (primary) | **MiSans** (→ HarmonyOS Sans SC → Source Han / Noto Sans SC) | 400 / 500 / 600 / 700 (VF 150–700) |
| Latin display | **Space Grotesk** | 400–700 |
| Latin body / UI | **Inter** | 300–700 |
| Mono / numbers | **IBM Plex Mono** | 400/500 |

Stacks (Latin leads → Chinese falls to MiSans by coverage; never serif):
```
--font-zh:     "MiSans VF","MiSans","HarmonyOS Sans SC","Noto Sans SC","Source Han Sans SC",-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;
--font-heading:"Space Grotesk","MiSans VF","MiSans","Noto Sans SC",sans-serif;
--font-body:   "Inter","MiSans VF","MiSans","Noto Sans SC",sans-serif;
--font-mono:   "IBM Plex Mono","MiSans VF",ui-monospace,monospace;
```

### Weight strategy (no global bolding)
| Usage | Weight |
|---|---|
| Hero | **700** |
| Section headings | **600** |
| Sub-heads | 500–600 |
| Body | 400 |
| Auxiliary / labels | 400–500 |

### Chinese type scale
| Token | Desktop | Mobile |
|---|---|---|
| Hero | 76–112px | 42–64px |
| H1 | 56–76px | 36–48px |
| H2 | 36–48px | 28–36px |
| H3 | 24–30px | 20–24px |
| Body | 16–18px | 15–16px |
| Caption | 12–14px | 11–13px |

### Tracking & leading
| | Chinese | English |
|---|---|---|
| Display letter-spacing | −0.02em … 0 | −0.04…−0.02em |
| Body letter-spacing | 0 … 0.02em | 0 |
| Heading line-height | 1.12–1.25 | 1.05–1.2 |
| Body line-height | 1.7–1.9 (site 1.8–1.85) | 1.5–1.7 |

Numbers `font-variant-numeric: tabular-nums`; project numbers in IBM Plex Mono. No faux-italic on Chinese.

---

## 3. Spacing & layout
- Wrap `1320px`; gutter `48 → 32 → 20`.
- Section rhythm `88px` desktop / `56px` mobile.
- 12-col invisible grid; asymmetric spans (e.g., feature 1.62 / 0.38). Reading measure `~38ch` for ledes.
- Radii: 0 default (sharp), `8px` image cards, `34px` phone.

## 4. Motion tokens (unchanged)
| Token | Value |
|---|---|
| `--dur-1` | 120ms |
| `--dur-2` | 200ms |
| `--dur-3` | 320ms |
| `--dur-4` | 480ms |
| `--dur-5` | 700ms |
| `--ease-std` | `cubic-bezier(.2,0,0,1)` |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` |

Applied only to: Hero Text Reveal · Project Image Reveal · Hover Feedback · Nav Active Indicator · Scroll Section Reveal. `prefers-reduced-motion` collapses all. No `transition: all`.

## 5. Component tokens
- Button solid: accent fill, white text; hover darken `#2749C9`.
- Link / keyword: accent `#315EFB`.
- Section marker: mono `NN ·`, secondary.
- Tags/chips: 1px border `--color-border`, mono uppercase, secondary text.
- Cover band: `--color-accent-soft` bg with real UI phones.

## 6. Confirm / TODO
1. Hero copy 「设计，让复杂变得清晰。」 pending your confirmation.
2. MiSans 800/Heavy & HarmonyOS full weights (optional).
3. Real identity / contact / PES-MOVA assets.
