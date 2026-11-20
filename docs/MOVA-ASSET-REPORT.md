# MOVA ASSET RECEIPT REPORT

> Phase 07 · Source: `C:\Users\35335\Desktop\MOVA\` · Backed up read-only to `assets/source/mova-original/` · Hash list: `assets/source/mova-assets-hashes.csv`.
> **15 files · 2.42 MB · all phone screens 393×852 (04/05 taller 393×1683).** Files carry `.png` extension but are **WebP** encoded.

---

## 1. Received files (with SHA256)

| # | File | Bytes | SHA256 (short) | Screen |
|---|---|---:|---|---|
| 01 | `01 · Splash.png` | 71,368 | `4ceb5ce9…` | Splash / logo |
| 02 | `02 · Movie/Logged Out.png` | 307,126 | `cef79469…` | Home · logged out |
| 03 | `02 · Movie/Logged In.png` | 360,590 | | Home · logged in |
| 04 | `04 · Movie About/Top.png` | 517,932 | | Movie detail (long 393×1683) |
| 05 | `05 · Movie About/Top.png` | 547,635 | | Movie detail — alt state |
| 06 | `06 · Sessions/By Time.png` | 52,121 | `4a1196ae…` | Sessions · 按时段 |
| 07 | `07 · Sessions/By Cinema.png` | 47,923 | | Sessions · 按影院 |
| 08 | `08 · Seat Overview.png` | 28,261 | | Seat map overview |
| 09 | `09 · Seat Select/Zoomed.png` | 37,683 | `2b4c7d2b…` | Seat select (zoomed) |
| 10 | `10 · Selected Seat.png` | 69,939 | | Selected seat state |
| 11 | `11 · Checkout.png` | 64,206 | `0b423a17…` | Order confirm / checkout |
| 12 | `12 · Payment.png` | 39,424 | | Payment |
| 12b | `12.2.0 · Payment.png` | 39,424 | | Payment (variant) |
| 13 | `13 · Payment Success.png` | 264,909 | `0f55ab34…` | Success + e-ticket |
| 14 | `14 · Mine.png` | 87,449 | `775acd1d…` | Profile / orders |

*(Full 64-char SHA256 for every file is in `assets/source/mova-assets-hashes.csv`.)*

## 2. Classification

| Category | Files | Status |
|---|---|---|
| **High-fidelity UI screens** | all 15 | **READY** |
| **Prototype (interactive)** | — | **MISSING** — only static screens; no clickable prototype/Figma link provided |
| **Design process** (research, competitor, wireframes, IA) | — | **MISSING / TODO** — not provided |
| **Visual resources** (logos, icons, poster art) | embedded in screens | PARTIAL — logo & posters visible; source vectors not provided |
| **Source files** (Figma/AI) | — | **MISSING / TODO** |

## 3. Screen inventory vs. brief

| Brief asks | Provided | Notes |
|---|---|---|
| 项目封面 | ✅ Splash (01) + Movie home (02/03) | strong MOVA wordmark on splash |
| 首页与电影详情 | ✅ 02/03/04/05 | 热映 / 即将上映 + detail w/ showtime CTA |
| 影院及场次选择 | ✅ 06/07 | by time / by cinema, format & price |
| 座位选择 | ✅ 08/09/10 | seat map, 可选/已告/最佳位置, recommendation |
| 支付流程 | ✅ 11/12/12b | checkout (coupon, total) → payment |
| 购票完成 | ✅ 13 | success + barcode e-ticket |
| 个人中心 | ✅ 14 | profile, want/seen, orders, coupon, settings |
| 关键交互说明 | ⚠️ inferable from states | no written interaction spec → to be authored from screens (marked as inferred) |

## 4. Observations (from the actual screens)
- **Brand:** MOVA wordmark + orange-red primary action color; light neutral surfaces; rounded cards; dark poster cards. (MOVA's own palette — will be **preserved**, not restyled to the portfolio purple.)
- **Flow observed:** Splash → Movie home → Movie detail → Sessions (time/cinema) → Seat select → Checkout → Payment → Success → Mine.
- **Distinct interactions:** format/price/distance filters; seat map with best-seat recommendation + legend; coupon applied reducing total (¥91 → ¥81 → 支付 ¥81); barcode e-ticket; "看完/想看" collections.

## 5. Gaps / TODO (do not fabricate)
- No interactive prototype URL, no Figma/source files.
- No research / competitor analysis / IA / wireframes / metrics.
- Seat "关键交互" written spec to be authored from screens (attributed as inferred, not as user research).

## 6. Integrity
Originals are read-only in `assets/source/mova-original/` (never edited). Any processed/thumbnail copies go under `assets/projects/mova/` (to be created when the case-study page is built).
