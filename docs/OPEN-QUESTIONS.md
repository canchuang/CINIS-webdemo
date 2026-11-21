# OPEN QUESTIONS

> Consolidated blockers and decisions needed from the user. Grouped by priority.
> **Round 2 update (2026-11-19): Q1 and Q2 are now RESOLVED** (Netlify site confirmed bound to `CINIS-webdemo`, production `main`). See closed items below.

---

## ✅ RESOLVED in Round 2

### Q1 — Repository  → **CLOSED**
- **Answer:** The portfolio is built **on `canchuang/CINIS-webdemo`** (Rule A). There is no separate portfolio repo. Dev branch `portfolio-redesign` to be created from `main`.
- **Residual:** pushing the branch needs repo **write access** (see Q2b).

### Q2 — Netlify  → **CLOSED (binding confirmed)**
- **Answer:** Site `cinis` = `https://cinis.netlify.app`, bound to `CINIS-webdemo`, production branch `main`, deploy `cb91106`, context `production`, state `ready`. No custom domain.
- **Residual (Q2b):** build command / publish dir / env vars not exposed by public API → confirm in Netlify UI (Settings → Build & deploy). Inferred: `pnpm build` → `dist/`.

---

## BLOCKERS (still open)

### Q2b — Repo write access + build settings
- **分支部分 ✅ 已解决（Round 3）**：用户已手动从 `main` 创建 `portfolio-redesign`（远程验证指向 `cb91106`）。
- **仍需要：** 若要让 agent 直接把提交 push 到该分支 → 放入 `canchuang` 账号的 token 到 `.secrets/github_token.txt`；否则由 agent 产出 patch/bundle，用户自行 push。
- **仍需要：** Netlify 后台确认 build command / publish dir / env vars（公共 API 未暴露）。
- **Impact：** 不 push 也能本地开发与出预览包；只影响"自动推送到远程"。

### Q3 — Portable Energy Storage assets
- No assets found. Provide: research/personas, function analysis, modular/structural diagrams, form renders, final hero image (drop folder into `assets/projects/portable-energy-storage/` or `assets/source/` or share a link).
- **Needed:** source files or a Drive/Figma/Behance link + usage permission.

### Q4 — MOVA assets
- No assets found. Provide: Figma link, exported screens, prototype URL, positioning/competitor docs.
- **Needed:** design source + prototype link + permission.

---

## IMPORTANT (answer during Phase 04 planning)

### Q5 — CINIS design source
- Figma file link for the original CINIS design (root node `1299:5713` seen in `assets.json`). Needed to reuse exact specs/imagery.
- Also: may we **author** the CINIS product-positioning / three-mode / IA / user-flow write-ups from the prototype & `content.ts`, or will you supply copy?
- **NEEDED vs TODO:** If no copy is supplied, these narrative sections stay **TODO** (we will not fabricate outcomes/metrics).

### Q6 — Personal information
- Bio / introduction, design philosophy text.
- Contact: **email**, social links (Behance/Dribbble/LinkedIn/X?), **resume link** (the brief marks resume as "待确认" — TODO).
- **Do not** invent awards, metrics, user-test data, or employment history. Any such content must come from you, else stays TODO.

### Q7 — Typography & licensing budget
- Approve final typefaces and confirm whether paid licenses (e.g., Editorial New / Söhne / PP) are acceptable, or restrict to open-source only.

### Q8 — ReactBits / Transitions.dev adoption
- Confirm licensing for the shortlisted ReactBits components (free vs Pro) and that copying their source into the repo is acceptable. Transitions.dev Pro items must be avoided or re-implemented.

### Q9 — Hosting & deployment preference
- Target host for the portfolio build: same Netlify team? custom domain? confirm branch → deploy strategy (Production = main; dev = `portfolio-redesign` preview).

### Q10 — Language(s)
- Site copy language: Chinese, English, or bilingual? Affects IA, type choices, and copy workload.

---

## NICE-TO-HAVE
- Analytics preference (privacy-friendly? e.g., Plausible/Umami) — affects privacy notes.
- Accessibility target level (WCAG 2.2 AA assumed unless told otherwise).
- Any brand/logo/monogram for the site identity.

---

## Decisions the agent made autonomously (reversible, stated for transparency)
- **Rule A applied** (Round 2): repo `CINIS-webdemo` ↔ Netlify `cinis.netlify.app`, production `main`; redesign to happen on `portfolio-redesign` only. → see TECH-AUDIT §3.
- Cloned the repo locally for a **read-only backup** (`assets/source/CINIS-webdemo`); **did not modify `main` / `gh-pages`**, did not push, did not deploy.
- Excluded Smart Home Icon System entirely (per mandate).
- Kept project list to exactly 3 (CINIS, PES, MOVA); did not add a fourth.


---

## PHASE 07 更新（2026-11-20）

- **身份已提供**：中文姓名 **颜夕和**（已全站替换：导航 / About / Footer / SEO Title / Open Graph / 配置文件）。**英文名 TODO**（不擅自使用拼音、英文昵称）。
- **联系方式**：确定使用 Gmail，但完整地址未提供 → 全站联系入口显示「待配置」，**不编造邮箱、不使用 hello@example.com 可点击链接**；获得地址后再生成 mailto。
- **MOVA 素材已收到**：15 张高保真界面（已备份 + SHA256 + 审计 → `docs/MOVA-ASSET-REPORT.md`、`docs/MOVA-CASE-STUDY-OUTLINE.md`）。仍缺：**交互原型链接、影院 Tab 截图、项目定位/研究/竞品、原始视觉规范（Figma/色值）**。
- **CINIS 原型入口**：主用 GitHub Pages `https://canchuang.github.io/CINIS-webdemo/`（Netlify `cinis.netlify.app` 作镜像备用，不作为唯一依赖）。
- 仍需：真实简介/城市/可用状态、简历链接、社交链接、CINIS 原始 Figma 链接、**PES 素材**。


### PHASE 09 更新
- MOVA：研究/竞品要点已按课程研究报告接入（探索性访谈 n=1 初步）；Figma 原型入口已加（权限待确认）；影院仅导航状态、完整影院页待补；最终浅色 Design System 待补。


---

## PHASE 15 更新（跨页面一致性与待补收束）

**已修复（仅文案/一致性，不改结构）**
- 作品 / MOVA / 关于 / 联系 页脚旧标签「编辑式粗野主义」→ **「Modern Editorial」**（与首页统一）。
- 品牌名尾随空格清理（首页/作品/关于/联系）。
- 作品页 **MOVA 简介**移除过时的「图像待补充」，改为已实现的购票流程描述。

**资产更新**
- 新增 **旅者 Lv1–Lv3 阶段图**（1472×1472 透明 PNG，已用于 CINIS 案例页；原件只读、未覆盖）。
- **待确认（未接入）**：深渊 `chibi_knight2/3/4`、骑士 `paladin_knight`、`soulfire_*` —— 阶段/用途对应无法从命名与说明可靠确认。

**仍缺（影响页面 · 当前诚实呈现）**
| 缺项 | 影响页面 | 当前呈现 | 需要你提供 |
|---|---|---|---|
| **Portable Energy Storage 项目过程 + 产品渲染/成品图** | 首页第 02 卡、作品列表 PES 卡 | 显示「案例素材待补充」占位；**未建 PES 案例页**（不虚构） | 研究/结构/爆炸图、外观渲染、最终成品图 |
| **个人简介** | About | 正文与时间线为 TODO 占位 | 简介、城市、可用状态、教育/经历 |
| **联系方式** | Contact / 全站联系入口 | 显示「待配置」（不编造邮箱/链接） | Gmail 地址、简历、社交链接 |
| CINIS 原始 Figma 链接 | CINIS 案例页「视觉系统/原型」 | 标 TODO | Figma 链接/权限 |
| CINIS 缺失状态截图（roles/onboarding、taskDone、stage/settle、terminal/rekindle） | CINIS 核心流程/最终界面 | 就地「待补」标记 | 需要补抓或提供 |

---

## PHASE 16 更新（PES 素材复核 · MOVA 作品卡修整）

**PES 素材复核结论**
- 全盘搜索（Desktop + 工作区；关键词：储能/电源/户外/便携/PES/energy/storage/救援/应急/电池）→ **0 命中**；`assets/projects/portable-energy-storage/` 为空。
- 通用课程文件夹（`大二下/概念产品设计`、`目标产品设计导向`、`设计调研`）存在，但**无法确认含 PES**，未引用。
- “PES 全部缺失”**仅指当前仓库/工作区未发现**（不排除你有素材），保持待补，不建空壳页。

**PES 最少需你提供（用于卡片封面 + 未来案例页）**
1. 外观渲染 / 成品图（正面 3/4 视角 + 细节，≥2000px 长边）—— 至少 1 张作封面；
2. 结构图 / 爆炸图 / 模块拆分；
3. 场景与用户研究（使用场景照片或说明、目标用户）；
4. 过程展板 / 设计推导；5. 关键参数与项目定位（可公开部分）。

**已修复**
- works 的 **MOVA 卡片**：由“单张截图被拉伸放大且裁掉关键界面”改为 **16/9 三屏组合**（电影首页 / 选座 / 电子票），按原比例、不放大不裁切，手机端 3 屏并排亦清晰。

---

## PHASE 17 更新（作品列表 CINIS 封面 + PES 占位减重）

**已改**
- works 的 **CINIS 封面**：由“单张截图放大裁切”改为 **三屏组合** `screen-today / screen-growth / screen-characterFile`（原生 780×1688 @2×），按原比例 contain、约 23% 卡宽，不放大不裁切；仅作品列表预览，未改 CINIS 案例页正文/原始素材。
- works 的 **PES 占位**：桌面框比例由 4/5 收紧为 **3/2**、减弱斜纹对比，占位高度与视觉重量低于 CINIS 主卡；仍明确「案例素材待补充」。手机端保持 16/10、信息清楚。

**仍缺（PES，当前仓库/工作区未发现 ≠ 用户没有）**
- 外观渲染/成品图（3/4 视角 + 细节，长边 ≥2000px，至少 1 张作封面）；
- 结构图 / 爆炸图 / 模块拆分；场景与用户研究；过程展板；关键参数与项目定位。
- 说明：PES 仍不建空壳案例页、不生成替代渲染；其素材请放入 `assets/source/portable-energy-storage/` 或给公开链接。

---

## PHASE 18 更新（作品列表交互与可访问性）

**已修复**
- 筛选：`role="group" aria-label`、按钮 `type="button"` + `aria-pressed`；新增 `role="status" aria-live="polite"` 播报「已显示 N 个项目：…」；脚本重写（初始 all、数量与名称同步）。
- 卡片：CINIS / MOVA 由 `article+onclick` 改为真实 `<a href>`（可键盘聚焦、带 aria-label）；PES 保持非链接、`cursor:default`、不暗示可点。
- 新增 `.visually-hidden` 与 `.wcard:focus-visible`；reduced-motion 下筛选仍可用（已实测）。

**本轮无需你补充即可运行；以下仍为未完成/待你提供**
- PES 真实素材（外观渲染/成品图、结构/爆炸图、场景研究、过程展板、参数）；
- 个人简介 / 城市 / 经历；Gmail 地址 / 简历 / 社交链接；
- CINIS：Figma 链接、缺失状态截图、深渊/骑士阶段素材对应确认。
