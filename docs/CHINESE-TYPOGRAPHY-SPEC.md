# CHINESE TYPOGRAPHY SPEC — Chinese-First Bilingual Editorial

> Phase 05. Replaces the previous serif-led spec. **All serif families (Fraunces, Georgia, Times New Roman, serif) are banned.** The site now uses a Chinese-first, bilingual-ready modern sans system.
> Applies to `repo/experiments/art-direction/direction-b-plus/` (pages + `style.css`). Specimen: `_type-specimen.html`.

---

## 1. Principle

- **Chinese-first, bilingual-ready.** Chinese is the primary reading language; Latin is auxiliary, not the default shell.
- Modern sans-serif only. Chinese and Latin each get appropriate letterforms, sizes, tracking and leading — neither is a fallback for the other.
- Chinese needs its **own** type scale, letter-spacing, line-height and line-breaking rules, independent of English.
- Visual weight is unified across 中/英 on the same line.
- Bold but restrained; professional for a UI/UX portfolio.

---

## 2. Font families

| Role | Family | Stack |
|---|---|---|
| **Chinese (primary)** | **MiSans** | `"MiSans VF","MiSans","HarmonyOS Sans SC","Noto Sans SC","Source Han Sans SC",-apple-system,"PingFang SC","Microsoft YaHei",sans-serif` |
| Latin display | Space Grotesk | `"Space Grotesk","MiSans VF",sans-serif` |
| Latin body / UI | Inter | `"Inter","MiSans VF","MiSans","Noto Sans SC",sans-serif` |
| Metadata / numbers | IBM Plex Mono | `"IBM Plex Mono","MiSans VF",ui-monospace,monospace` |

**Key mechanism:** heading/body stacks lead with the Latin family (Space Grotesk / Inter). Those fonts have **no CJK glyphs**, so Chinese characters automatically fall through to **MiSans** via Unicode coverage — English renders Latin, Chinese renders MiSans, on the same baseline, from one `font-family` rule. No element ever falls back to a serif.

```css
--font-zh:"MiSans VF","MiSans","HarmonyOS Sans SC","Noto Sans SC","Source Han Sans SC",-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;
--font-heading:"Space Grotesk","MiSans VF","MiSans","Noto Sans SC",sans-serif;
--font-body:"Inter","MiSans VF","MiSans","Noto Sans SC",sans-serif;
--font-mono:"IBM Plex Mono","MiSans VF",ui-monospace,monospace;
```

### Weights
- MiSans: **Regular 400 / Medium 500 / Semibold 600 / Bold 700** (the embedded subset is a **variable font, 150–700**; **800/Heavy is not present in this subset** — use 700 as max, or supply an 800 file if needed).
- HarmonyOS / Source Han: weights per installed file (see §3).

---

## 3. Actual glyph comparison (real rendering, not name-based)

Rendered in `_type-specimen.html` §00 with the machine's real font files (screenshot: `SPEC-desktop.png`). Installed: `MiSans-Regular` + `MiSans VF` (CDN) · `HarmonyOS_Sans_SC_Bold` (Bold only on this machine) · `NotoSansSC-VF`.

| Family | Observed at specimen size | Weight coverage here | Verdict |
|---|---|---|---|
| **MiSans** | Clean geometric skeleton, tight counters, strong at display sizes; slightly condensed, editorial. Latin-friendly. | 400–700 (variable) | **Primary** — best display clarity + cleanly embeddable (Apache subset). |
| **HarmonyOS Sans SC** | Rounder terminals, marginally softer/wider; reads a touch heavier at same weight. | **Bold only installed** → other weights synthesised; cannot be fully compared. | Strong alternate; needs full weight files to evaluate properly. |
| **Source Han Sans SC / Noto Sans SC** | Neutral, humanist, very comfortable at long body lengths; slightly wider. | 400/500/700 (variable) | Best for very long body copy; recommended as body fallback. |

**Recommendation:** **MiSans as the site's primary Chinese face** (matches the preferred order and shows the strongest display/UI clarity at size), with **Source Han Sans / Noto Sans SC as the body fallback**. HarmonyOS remains an alternate pending full weight files. **Final selection must be confirmed on your screen** — the specimen is built for exactly that comparison.

---

## 4. Chinese type scale (independent tokens)

| Token | Desktop | Mobile | clamp |
|---|---|---|---|
| Hero | 76–112px | 42–64px | `clamp(42px, 8vw, 112px)` (line 2) |
| H1 | 56–76px | 36–48px | `clamp(36px, 6vw, 76px)` |
| H2 | 36–48px | 28–36px | `clamp(28px, 4vw, 48px)` |
| H3 | 24–30px | 20–24px | `clamp(20px, 2.6vw, 30px)` |
| Body | 16–18px | 15–16px | `clamp(16px, 1.5vw, 18px)` |
| Caption | 12–14px | 11–13px | `12–14px` |

Implemented: hero uses `clamp()` per line; section h2 `clamp(28px,4vw,50px)`; body 17px; captions 13–14px. These are the initial values — tune against page screenshots.

---

## 5. Letter-spacing & line-height (中 vs 英)

| | Chinese | English |
|---|---|---|
| Display letter-spacing | **−0.02em … 0** | −0.04em … −0.02em |
| Body letter-spacing | **0 … 0.02em** | 0 |
| Heading line-height | **1.12–1.25** | 1.05–1.2 |
| Body line-height | **1.7–1.9** (site: 1.8–1.85) | 1.5–1.7 |
| Metadata tracking | — | 0.08–0.14em |

Rules: never over-compress Chinese headings; never apply wide English-style tracking to Chinese body; keep mixed lines on a natural shared baseline; no faux-italic on Chinese (oblique synthesis looks wrong — `font-style:normal` on Chinese display).

---

## 6. Bilingual rules

1. Chinese → MiSans first; Latin → Space Grotesk / Inter.
2. Numbers use stable, tabular figures (`font-variant-numeric: tabular-nums`) — project numbers in IBM Plex Mono.
3. Chinese punctuation follows normal Chinese typography (full-width ，。：；).
4. Do **not** force English-style wide letter-spacing on Chinese.
5. On a mixed line, adjust weight/optical size so Latin and Chinese feel the same visual weight and sit on one baseline.
6. Avoid repeating every block bilingually — English is an auxiliary label (small mono caps), not a mirror translation.

---

## 7. Page-level application

- **Home:** Chinese hero title + small English auxiliary (`DESIGN · CLARITY`), Chinese lede, Chinese section heads with mono English caps.
- **Works:** Chinese project titles primary; English category as auxiliary (`Portable Energy Storage`, `Movie Ticketing`).
- **Case study:** Chinese section headings for reading + English mono labels (`Overview`, `User Flow`…) for editorial order.
- **About:** Chinese long-form reading (body 17px / line-height 1.85).
- **Contact:** Chinese primary action copy; email/social/resume labels in mono.
- **Electric blue** (`#2D6BFF`) is a **hero keyword accent only**; all other emphasis uses terracotta `#A8442A`.

---

## 8. Loading strategy (WOFF2 / performance)

- **MiSans:** loaded from `https://cdn.jsdelivr.net/npm/misans@5.0.0/lib/Normal/MiSansVF.min.css` — a **variable, unicode-range-subsetted** build: the browser downloads **only the subset files whose characters are used**, not the whole CJK font. `font-display:swap`.
- **Fallback:** Google Fonts **Noto Sans SC** (subset by Google) as a CJK fallback if MiSans CDN is unavailable; `Space Grotesk`, `Inter`, `IBM Plex Mono` from Google Fonts (Latin, small).
- **Production recommendation:** self-host a **pyftsubset**-generated WOFF2 of MiSans covering (a) used glyphs in the actual copy + (b) a common-GB2312/GB18030 safety set, split into 2–3 unicode-range slices; `preload` the Latin slice + first CJK slice; keep `font-display:swap` with a matched `size-adjust` fallback to minimise CLS. Target: first CJK slice < ~120KB.
- Verified: `font-display:swap` in the MiSans CSS avoids invisible text; layout-shift risk is bounded by swap + matched fallback metrics (recommend measuring CLS on the real build).

---

## 9. Font licensing / attribution (must keep)

| Font | License | Notes |
|---|---|---|
| **MiSans** | Xiaomi **MiSans License** — free for personal & commercial use. | **Do not redistribute the standalone font package.** Embedding for web display is permitted; include the attribution note below. The `misans` npm build is an **Apache-2.0 subset** wrapper. |
| **HarmonyOS Sans SC** | Huawei HarmonyOS Sans — free for commercial use; redistribution limits. | Used **only for local specimen comparison**, not shipped in the site. |
| **Source Han Sans / Noto Sans SC** | **SIL Open Font License 1.1**. | Redistributable; safe fallback. |
| Space Grotesk / Inter / IBM Plex Mono | SIL OFL 1.1 | Redistributable. |

**Attribution to ship (footer / about / legal):**
> 本站中文使用 MiSans 字体（© Xiaomi，依据 MiSans 授权免费商用；不单独再分发字体文件）。

(In English: *Chinese type uses MiSans, © Xiaomi, used under the MiSans license for free commercial use; font files are not redistributed as a standalone package.*)

---

## 10. Responsive testing (Chinese line-breaking)

Verified widths **1440 / 1024 / 768 / 390** (`_shots/BP2-home-*.png`):

| Width | Result |
|---|---|
| 1440 | Hero 3-line asymmetric breaks hold; no overflow; SC body comfortable. |
| 1024 | Hero line 2 resets left (media ≤1024); no overflow; works grid stacks. |
| 768 | Single column; headings wrap on semantic breaks; no overflow. |
| 390 | Mobile hero 3 short lines (42–64px); no overflow; nav condensed. |

Checks covered: 中文标题意外断行 (semantic line breaks used in hero instead of auto-wrap), 中英文混排宽度, 标点挤压 (full-width punctuation retained), 字重变化 (400/500/700 render distinctly), 字体加载前后布局偏移 (swap + fallback), 移动端标题溢出 (none).

---

## 11. Deliverables map

- Specimen: `_type-specimen.html` → screenshots `_shots/SPEC-desktop.png`, `_shots/SPEC-mobile.png`.
- Updated pages: `_shots/BP2-*.png` (home 1440/1024/768/390, works, about, contact, cinis desktop+mobile).
- Tokens: `DESIGN-TOKENS-DRAFT.md` §2 (updated).
- Direction note: `DESIGN-DIRECTION.md` §11 (updated).
