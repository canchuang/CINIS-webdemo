# CHINESE TYPOGRAPHY SPEC — Chinese-First, Sans-only (Direction B · Modern Editorial)

> **Current (Phase 05).** Serif is fully banned. Chinese-first, bilingual-ready, sans-serif only. Implemented in `experiments/art-direction/direction-b-modern-editorial/`. Specimen: `_type-specimen.html`.

---

## 1. Principle
Chinese is the primary reading language; Latin is auxiliary. Chinese gets its own scale, tracking, leading and line-breaking. Modern sans-serif only. Bold but restrained; professional for a UI/UX portfolio.

## 2. Families
| Role | Family | Stack role |
|---|---|---|
| **Chinese (primary)** | **MiSans** | `"MiSans VF","MiSans","HarmonyOS Sans SC","Noto Sans SC","Source Han Sans SC",-apple-system,"PingFang SC","Microsoft YaHei",sans-serif` |
| Latin display | **Space Grotesk** | leads heading stack; Chinese falls through to MiSans |
| Latin body / UI | **Inter** | leads body stack |
| Mono / numbers | **IBM Plex Mono** | numbers, captions, metadata |

Mechanism: heading/body stacks lead with Latin (no CJK glyphs) → Chinese auto-falls to MiSans via Unicode coverage → **never a serif**.

## 3. Weight strategy (no global bolding)
Hero **700** · section headings **600** · sub-heads **500–600** · body **400** · auxiliary **400–500**. MiSans VF supports 150–700 (no 800 in subset — use 700 max, or supply a Heavy file).

## 4. Chinese type scale
Hero 76–112 / H1 56–76 / H2 36–48 / H3 24–30 / Body 16–18 / Caption 12–14 (desktop).
Mobile: Hero 42–64 / H1 36–48 / H2 28–36 / H3 20–24 / Body 15–16 / Caption 11–13. Fluid via `clamp()`.

## 5. Tracking & leading
- Chinese display letter-spacing **−0.02em…0**; body **0…0.02em**; heading line-height **1.12–1.25**; body **1.7–1.9**.
- English display **−0.04…−0.02em**; metadata tracking **0.08–0.14em**; body line-height **1.5–1.7**.
- No wide English-style tracking on Chinese; natural baseline in mixed lines; no faux-italic on Chinese.

## 6. Bilingual rules
Chinese MiSans first · Latin Space Grotesk/Inter · numbers `tabular-nums` (project numbers in IBM Plex Mono) · normal Chinese punctuation · don't mirror every block bilingually (English = auxiliary label).

## 7. Color interaction
Single accent = **electric blue `#315EFB`** (links, active, key words, incl. hero 「清晰」). No terracotta. Soft accent `#E3EAFE` for cover bands. See `DESIGN-TOKENS-DRAFT.md`.

## 8. Loading (WOFF2 / performance)
- **MiSans:** `https://cdn.jsdelivr.net/npm/misans@5.0.0/lib/Normal/MiSansVF.min.css` — variable + **unicode-range subsetted**: only used-character subset files download; `font-display:swap`.
- **Noto Sans SC** (Google) as CJK fallback; Space Grotesk / Inter / IBM Plex Mono (Latin, small).
- **Production:** self-host pyftsubset WOFF2 covering used glyphs + GB2312/GB18030 safety set (2–3 unicode-range slices); preload Latin + first CJK slice; `size-adjust` matched fallback to bound CLS; first CJK slice target < ~120KB.

## 9. Licensing / attribution
- **MiSans** — Xiaomi MiSans license, free commercial; **do not redistribute the standalone font package**; Web embedding allowed with attribution. `misans` npm = Apache-2.0 subset wrapper.
- HarmonyOS Sans — Huawei, free commercial, redistribution limits; used only in local specimen (not shipped).
- Source Han / Noto Sans SC, Space Grotesk, Inter, IBM Plex Mono — **SIL OFL 1.1**.

**Ship this attribution:**
> 本站中文使用 MiSans 字体（© Xiaomi，依据 MiSans 授权免费商用；不单独再分发字体文件）。

## 10. Verified (1440 / 1024 / 768 / 390)
No horizontal overflow; semantic hero line breaks (not auto-wrap); mixed 中英 width ok; full-width punctuation retained; weights render distinctly; no serif fallback observed. Specimen: `_shots/ME-specimen-desktop.png`, `_shots/SPEC-desktop.png`.
