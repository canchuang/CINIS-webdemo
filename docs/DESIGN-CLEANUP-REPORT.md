# DESIGN CLEANUP REPORT — B+ → Direction B · Modern Editorial

> Phase 05 · Removes all conflicts with the user's final direction: **Direction B · Modern Editorial**, Hero **Bold**, Background **Cool**, Typography **Sans-serif only**, **Chinese-first / Bilingual-ready**.
> B+ (warm-paper / serif / terracotta) is retained **only as historical record**, never as the current name or spec.

---

## 1. Conflicts found (before)

| File | Conflict |
|---|---|
| `experiments/art-direction/direction-b-plus/` (folder name) | "B+" name used for the active design |
| `style.css` | `--serif` alias (Fraunces); 35 `var(--serif)` refs; warm palette hex `#F6F1E8 #EFE8DC #A8442A #D9CFC0 #6B6357 #1A1712 #2D6BFF #8f3823 #2c261d #2e2a22 #3a362f`; warm rgba tints (`rgba(246,241,232)`, `rgba(26,23,18,…)`); header comment "DIRECTION B+ — EDITORIAL BRUTALISM" |
| `app.js` | header comment "DIRECTION B+ — motion system" |
| `docs/DESIGN-DIRECTION.md` | Fraunces/serif, warm paper, terracotta as current; B+ "final" section |
| `docs/DESIGN-TOKENS-DRAFT.md` | Fraunces/Archivo, warm palette, no cool tokens |
| `docs/CHINESE-TYPOGRAPHY-SPEC.md` | terracotta accent + "electric blue hero-only" wording |
| `_hero-lab.html` | stale internal hero lab (double-encoded) |
| page footers | "编辑式粗野主义 · B+" / "Direction B · Editorial Brutalism" labels |
| `_type-specimen.html` | warm inline text color `#2e2a22` |

## 2. Fixes applied

1. **Renamed** the active prototype → `experiments/art-direction/direction-b-modern-editorial/` (B+ archived as history).
2. **style.css** — retired `--serif` entirely (`var(--serif)` → `var(--font-heading)`; `.serif` rule removed); replaced the warm/terracotta palette with the **cool semantic tokens** (§3); removed warm rgba tints; header now "DIRECTION B — MODERN EDITORIAL"; disciplined font weights (section heads 600).
3. **app.js** — comment de-B+-ified.
4. **Docs rewritten**: `DESIGN-DIRECTION.md` (current spec + historical archive note), `DESIGN-TOKENS-DRAFT.md` (cool tokens + measured contrast), `CHINESE-TYPOGRAPHY-SPEC.md` (blue accent, sans-only).
5. **Footers** now read "Direction B · Modern Editorial".
6. Deleted stale `_hero-lab.html`; fixed `_type-specimen.html` warm inline color → `#2b333d`.
7. Fixed accent-on-surface small text (code chips) to `--color-text` on `--color-accent-soft` to keep AA.

## 3. New semantic color tokens (single source of truth)

```
--color-bg:#F2F4F7; --color-surface:#E8ECF1; --color-text:#11151B;
--color-text-secondary:#5E6773; --color-border:#CCD3DC;
--color-accent:#315EFB; --color-accent-soft:#E3EAFE;
```
Aliases (kept for legacy rule names): `--base→bg, --surface, --text→text, --text2→secondary, --accent→accent, --line→border, --ink→text`.

## 4. Verification (after)

| Check | Result |
|---|---|
| `#F6F1E8 / #EFE8DC / #A8442A / #D9CFC0 / #6B6357 / #1A1712` in `style.css` | **0** |
| `Fraunces / Georgia / Times New Roman` in active html/css/js | **0** |
| `B+ / Brutalism / direction-b-plus` in active html/css/js | **0** |
| Real serif **font families** used | **0** (only the word "serif" appears in `sans-serif` and clarifying comments) |
| Cool token hex present | ✅ `#F2F4F7 #E8ECF1 #11151B #5E6773 #CCD3DC #315EFB #E3EAFE` |
| CINIS project palette (`#FF7A1A`, mode themes) | **preserved** inside case study (not overridden) |

## 5. Preserved / untouched

- `assets/source/CINIS-webdemo` backups and all original CINIS assets/screens — untouched.
- CINIS's own product colors remain in the case study.
- Production branch / `main` / `gh-pages` / `cinis.netlify.app` — untouched.
