# ASSET INVENTORY

> Phase 02 deliverable — **revised Round 2 (2026-11-19)**. Inventories the three retained portfolio projects only: **CINIS**, **Portable Energy Storage**, **MOVA**.
> Smart Home Icon System is **excluded** by project mandate and is not inventoried here.
> Status legend: **READY** = usable as-is · **NEEDS-PROCESSING** = crop/layout/clean needed · **MISSING** = not provided.
> Original artwork is never modified; this file only records paths and judgments.

---

## 0. Backup status — ✅ CINIS fully backed up (Round 2)

| Item | Value |
|---|---|
| Source | `https://github.com/canchuang/CINIS-webdemo` @ commit `cb91106220f0dcf7a0d063b21262207a4a96a96d` (`main`) |
| Live sites | **Netlify:** `https://cinis.netlify.app` (production, bound to repo) · **GitHub Pages:** `https://canchuang.github.io/CINIS-webdemo/` |
| Local read-only backup | `assets/source/CINIS-webdemo/` (full clone) |
| Assets backed up | **66 files / 4,855,835 bytes** in `public/assets` (+ full `src/`, configs) |
| Checksums | `assets/source/cinis-assets-hashes.csv` · manifest: [`ASSET-BACKUP-MANIFEST.md`](ASSET-BACKUP-MANIFEST.md) |
| Duplicates | 66 files contain **45 unique contents** (several PNG names share identical SHA256 — e.g. `character-knight.png` == `image-cc22…png`). Dedup when producing web assets. |
| Processed-output target | `assets/projects/cinis/{characters,screens,illustrations,icons,growth-system,interaction,content}/` (skeleton created; **never overwrite source**) |

---

## Summary table

| Project | Category | Source availability | Overall status |
|---|---|---|---|
| 01 — CINIS | UI/UX · Product | **Rich** — Figma-exported assets + runnable React prototype + **2 live sites (Netlify + GH Pages)** + **local backup** | Mostly **READY**; some assets **NEEDS-PROCESSING** (2× PNGs to be re-cropped for web); narrative assets **MISSING** (process/research docs) |
| 02 — Portable Energy Storage | Product · Industrial | **None found** — no repo, no assets, no workspace files | Almost entirely **MISSING** |
| 03 — MOVA | UI/UX | **Rich (screens)** — 15 real hi-fi screens received (Phase 07) + backup + hash | **READY** for hi-fi/flow; prototype + research **MISSING** |

> CINIS is fully available (repo + 2 live deployments + local backup). PES and MOVA have **no discoverable source** until the user provides files or links.

---

## Project 01 — CINIS

**Source of truth:** `https://github.com/canchuang/CINIS-webdemo` (branch `main`, public; commit `cb91106`).
**Live prototype (2 deployments):** `https://cinis.netlify.app/` (Netlify production — **primary**) and `https://canchuang.github.io/CINIS-webdemo/` (GitHub Pages — backup).
**Local backup:** `assets/source/CINIS-webdemo/` (read-only).
**Asset manifest:** `public/assets/assets.json` (Figma export, 45 entries — 17 images + 28 vectors; 66 files on disk incl. duplicate names).
**Design origin:** a Figma file owned by the user (root node `1299:5713`). Figma link → **TODO**.

### A. Character / illustration assets (images) — READY

All are 2×-optimized transparent PNGs exported from Figma. Previewed and confirmed high quality (chibi game art).

| File (`public/assets/…`) | Size (px) | Approx source | Intended use |
|---|---|---|---|
| `character-traveler.png` (`image-ec2d…`) | 324×324 | traveler (旅者) portrait | Case-study mode showcase |
| `character-knight.png` (`image-cc22…`) | 568×568 | knight (骑士) portrait — **confirmed excellent** | Hero / mode section |
| `character-abyss.png` (`image-2c0c…`, `chibi_knight2_transparent`) | 336×336 | abyss (深渊) character | Mode section |
| `image-5ff41…png` (`chibi_knight4_transparent`) | 124×124 | knight alt pose (transparent) | Accents |
| `image-d60f3…png` (提灯跃动的精灵冒险家) | 402×402 | lantern adventurer | Settle screen art |
| `settle-traveler / settle-knight / settle-abyss.png` | various | settle-screen characters | Phase-settle section |
| `rest-traveler / rest-knight / rest-abyss.png` | various | resting-pose characters | Failure/reflection branch |
| `image-145 / 144 / 143` (knight/abyss terminal art) | 414–609 px | terminal/fail illustrations | Failure-branch narrative |
| `growth-scene.png` (`image-c72f…`) | 684×298 | **growth path scene with milestone stones — confirmed excellent** | "魂火成长体系" hero visual |
| `badge-1 / 2 / 3.png` (`image-130/131/132`) | 90×90 | 3 achievement badges | Achievements section |
| `abyss-restart.png`, `knight-fail.png`, `knight-sleep.png`, `look-*.png` | small | misc UI art | Detail shots |

**Status: READY.** Language/credentials note: images are design output of the user's own project; safe to use. Confirm licensing/permission → OPEN-QUESTION (assumed user-owned).

### B. Vector assets (SVG) — READY (icons/nav), NEEDS-PROCESSING (page-render vectors)

| Group | Files | Status |
|---|---|---|
| Nav icons & indicator (`nav*.svg`, `nav-indicator.svg`, `tab-icon*.svg`) | ~9 SVGs | **READY** — reusable as small icons |
| Per-screen decorative vectors (`p11*.svg`, `p15*.svg`, `p29*.svg`, `p30*.svg`, `p31*.svg`, `p37*.svg`) | ~19 SVGs | **NEEDS-PROCESSING** — these are partial screen vectors; prefer full-page renders (see C) |

### C. Rendered screen captures — **READY (10 captured) / NEEDS-PROCESSING (remaining routes)**  *(updated Phase 12)*

已用真实原型在 390×844 @2× **抓取 10 屏**（存 `experiments/art-direction/_screens/`；原型包另存 `experiments/art-direction/direction-b-modern-editorial/assets/screen-*.png`）：

`splash · today · goals · goalDetail · growth · characterFile · achievements · focus · history · me`

- 已用于 CINIS 案例页（8）：`today / growth / characterFile / achievements / goals / focus / history / me`（路径见 `direction-b-modern-editorial/assets/`）。
- **作品列表 CINIS 封面（Phase 17）**：使用 `screen-today / screen-growth / screen-characterFile`（原生 780×1688 @2×）三屏组合，按原比例 `contain` 展示、约 23% 卡宽，**不放大、不裁切**。
- **仍未抓取**：`roles · onboarding · taskDone · stage · settle · terminal · rekindle · reminderSettings · privacy · stageProgress · comeback · trialConfirm · newGoal · editor · modalBgEditor` + `chooseMode` 底部弹层 → **NEEDS-PROCESSING（待补抓）**。
- 源：`https://canchuang.github.io/CINIS-webdemo/#<route>` 或 `https://cinis.netlify.app/#<route>`（均 200，见 Phase 12 探测）。
- 说明：本节此前标为“未抓取”，Phase 12 核对**仓库现状已变化**——10 屏已存在并可用；其余路由仍缺。

### D. Code / prototype resources — READY (as reference & embed)

| Item | Status | Use |
|---|---|---|
| Runnable React prototype (23 screens + bottom sheet) | **READY** | Link out to live demo; optionally embed in an iframe within a phone frame |
| `src/data/content.ts` (22 KB Figma-sourced copy) | **READY** | Ground truth for case-study copy (mode names, flow labels) |
| `TiltCard.tsx`, `Screen.tsx`, `BottomNav.tsx` | **READY** (pattern) | Reusable interaction/layout patterns |
| Design tokens (`tokens.ts`, `global.css` vars) | **READY** (reference) | Token reference, not to be copied as-is |

### E. Narrative / process assets — **MISSING**

The brief asks CINIS's case study to show **product positioning, three-mode mechanism, IA, user flow, interaction logic, soul-flame growth system, UI design system, hi-fi UI, prototype demo**. Only "hi-fi UI + prototype + growth system art" is covered by assets. Missing:

- Product positioning write-up → **MISSING** (TODO)
- Three-mode mechanism explanation / diagram → **MISSING** (TODO; can be authored from `content.ts`)
- Information architecture map → **MISSING** (can be derived; needs authoring)
- User-flow diagram → **MISSING** (needs authoring)
- Interaction-logic write-up → **MISSING** (can be derived from code)
- UI design-system sheet (color/type/spacing/components) → **MISSING as a sheet** (extractable from `tokens.ts` + CSS — NEEDS-PROCESSING)
- Original Figma design link → **MISSING** (TODO)

---

### F. 角色阶段素材（新增 · Phase 14/15）— READY / 待确认

| 文件（案例页） | 源文件（只读） | 尺寸 | 透明 | 模式 · 阶段 | 状态 |
|---|---|---|---|---:|---|
| `assets/stage-traveler-lv1.png` | `Desktop/…/CINIS/Characters/Traveler/traveler_lv1_base.png` | 1472×1472 | 是 | 旅者 · Lv1 初火 | **READY（已用于案例页）** |
| `assets/stage-traveler-lv2.png` | `…/traveler_lv2_soulfire.png` | 1472×1472 | 是 | 旅者 · Lv2 燃魂 | **READY（已用）** |
| `assets/stage-traveler-lv3.png` | `…/traveler_lv3_veteran.png` | 1472×1472 | 是 | 旅者 · Lv3 历战 | **READY（已用）** |

- 来源：用户自有项目源图；原件**只读未覆盖**；案例页使用新文件 `assets/stage-traveler-*.png`。
- **待确认（未接入）**：深渊 `chibi_knight2/3/4_transparent`（阶段对应不明确）、骑士 `paladin_knight_transparent`（单张，无阶段序列），以及 `soulfire_*` 特效——仅凭命名/画面无法可靠确定阶段或用途 → 保持待确认，不接入页面。

---

## Project 02 — Portable Energy Storage

**Category:** Product · Industrial Design.

**Source availability:** No repository, no files, no assets found in the workspace or among the user's public GitHub repos. → **Not started / not provided.**

| Asset type | Status | Notes |
|---|---|---|
| User & scenario research (interview notes, personas, scenarios) | **MISSING** | TODO |
| Product function analysis | **MISSING** | TODO |
| Modular design diagrams | **MISSING** | TODO |
| Product structure / exploded views | **MISSING** | TODO |
| Appearance / form-design renders (3D or photos) | **MISSING** | TODO — highest priority for the cover |
| Final presentation / hero render | **MISSING** | TODO — needed for project card |
| Any prototype or model files | **MISSING** | TODO |

**Everything for PES is MISSING.** Requires the user to drop the source folder (renders, process boards, research docs) into e.g. `assets/source/portable-energy-storage/`, or provide a link (Drive/Figma/Behance). → OPEN-QUESTION Q3.

> **PHASE 16 复核（2026-11-21）**：对 `Desktop` 与工作区按关键词（储能 / 电源 / 户外 / 便携 / PES / energy / storage / 救援 / 应急 / 电池）全盘搜索 → **0 命中**；目标目录 `assets/projects/portable-energy-storage/` 为空。仅存在通用课程文件夹（`大二下/概念产品设计`、`目标产品设计导向`、`设计调研`），但**无法确认其中含 PES 素材**，不擅自引用。→ 结论：**“PES 全部缺失”仅表示当前仓库/工作区未发现**（不代表用户从未有素材）；保持待补，不建空壳页面。

---

## Project 03 — MOVA

**Category:** UI/UX (movie ticket & viewing experience product).

**Source availability:** ✅ **15 hi-fi screens received (Phase 07)** → backed up read-only at `assets/source/mova-original/`, hashed in `assets/source/mova-assets-hashes.csv`, details in `docs/MOVA-ASSET-REPORT.md`.

Brief expects: product positioning, competitor analysis, IA, ticketing flow, seat-selection interaction, hi-fi UI, prototype demo.

| Asset type | Status | Notes |
|---|---|---|
| Hi-fi UI screens (15) | **READY** | Splash · Movie(out/in) · Movie About ×2 · Sessions(time/cinema) · Seat overview · Seat select · Selected seat · Checkout · Payment ×2 · Success · Mine |
| Ticketing flow (observed) | **READY** | Splash→Home→Detail→Sessions→Seat→Checkout→Payment→Success→Mine |
| Seat-selection interaction | **READY (visual)** | seat map, legend 可选/已告/最佳位置, 推荐; written spec to be authored |
| Information architecture | **NEEDS-PROCESSING** | inferable from screens (3 tabs); needs authoring |
| Product positioning | **NEEDS-PROCESSING** | inferable; formal statement TODO |
| Competitor analysis / research | **MISSING** | TODO — not provided |
| Prototype (Figma/live) | **MISSING** | TODO — no interactive link |
| Source files (Figma) / visual spec | **MISSING** | TODO — colors near orange-red, exact values pending |

**Screens ready; prototype & research MISSING.** Outline: `docs/MOVA-CASE-STUDY-OUTLINE.md`. → OPEN-QUESTION Q4 (prototype link, 影院 Tab, research).

---

## Consolidated MISSING list (to request from user)

1. **Portable Energy Storage** — full asset set (research, structure, form renders, final hero).  
2. **MOVA** — screens received ✅; still need **交互原型链接**, **影院 Tab 截图**, **项目定位/研究/竞品**, 原始视觉规范.  
3. **CINIS** — Figma file link (original design), product-positioning/three-mode/IA/user-flow write-ups or permission to author them from the prototype.  
4. **Global** — personal bio, contact links (email/social/resume), any confirmed metrics/testimonials (else remain TODO; must not be fabricated).
