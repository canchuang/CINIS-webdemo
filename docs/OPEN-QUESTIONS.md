# OPEN QUESTIONS

> Consolidated blockers and decisions needed from the user. Grouped by priority.
> **Round 2 update (2026-11-19): Q1 and Q2 are now RESOLVED** (Netlify site confirmed bound to `CINIS-webdemo`, production `main`). See closed items below.
> **记录说明（Phase 29）**：本文保留各阶段历史记录；其中“PES 无素材 / 不建案例页”“MOVA 无页面”等已被后续阶段取代。**以文末「PHASE 29 — 当前状态摘要」为准。**

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

---

## PHASE 19 更新（键盘核实 + About/Contact 内容）

**键盘核实结论**：筛选按钮（button）Enter 与 Space 均可触发；卡片链接（a）Enter 触发、Space 不激活（页面滚动）；无自定义按键逻辑；PES 卡为非链接（不可聚焦）。Phase 18 报告已据此更正。

**About / Contact 现仅使用可确认信息**（姓名、角色定位、设计方法、三个真实项目）；已移除编造年份与页面 TODO 占位。

**需你补充（目前页面不展示这些项，避免出现「待配置」堆叠或失效链接）**
1. 所在城市 / 是否开放合作；
2. 教育经历（学校、学位、时间）与任何工作/实习经历（公司、职位、时间）；
3. 更个性化的简介（可选，用于替换当前通用介绍）；
4. Gmail 邮箱地址（提供后可生成 mailto）；
5. 社交链接（Behance / Dribbble / LinkedIn）；6. 简历链接。

---

## PHASE 20 更新（顺序统一 + About 身份校准）

**已确认并写入 About**：颜夕和 · 浙江科技大学产品设计专业大三 · 方向 UI/UX 与交互设计。
**已统一**：三项目顺序 = CINIS(01) → 便携式储能(02) → MOVA(03)（首页/作品/About 一致）；About 已移除编号。

**仍需你补充（当前页面不展示占位）**
1. 所在城市 / 是否开放合作；
2. 工作或实习经历（如有：公司、职位、时间）；
3. Gmail 邮箱地址（提供后可生成 mailto）；
4. 社交链接（Behance / Dribbble / LinkedIn）；5. 简历链接。

**备注**：首页「作品集 — 2026」「03 projects — 2024–2026」为既有展示性时间标注，非项目具体年份；如需精确年份请提供。

---

## PHASE 22 更新（CINIS 内容—证据复核）

**页面小修正**：移除封面「角色/时间 TODO」可见文案；研究/反思区把「TODO」改为「暂无记录」的诚实表述；最终界面计数改为「全页 8 个界面状态（含今日细节放大）」。

**素材清晰度更正（Phase 23）**：角色立绘实为 324/568/336px（清晰）——此前“56–80px 偏低清”为误判，已更正；Desktop 的 paladin 为不同骑士造型、深渊 chibi 与现有一致但现有尺寸足够，故不替换。

**沿用待补**：用户研究/可用性测试/量化成效；个人角色与项目周期；CINIS Figma 链接；缺失状态截图（roles/onboarding、taskDone、stage/settle、terminal/rekindle）。


---

## PHASE 23 更新（CINIS 真实状态补抓）
- 已从**真实运行原型**（`#route` 深链，390×844@2×）补抓：角色选择、引导、完成方式弹层、任务完成反馈、阶段进度、阶段结算、终止、重燃、回归；合计新增 9 张（780×1688），已接入案例页。
- 计数更新：原型 23 屏 / 已抓取 18 屏（+弹层）/ 本页展示 17 个界面状态。
- 仍待补：taskDetail、goalEdit、reminderSettings、privacy、trialConfirm、newGoal、editor、modalBgEditor；用户研究/测试/指标/角色/周期；CINIS Figma 链接。


---

## PHASE 27 更新（PES 案例页建立）
- **PES 素材已找到**：`Desktop/学习资料/大学作业记录/大二下/目标产品设计导向/` 下的真实课程展板（300dpi.jpg 7442×5264 / 版面2 / 竞赛版面1）与配套调研报告.pdf。
- 已建立 `pes.html`，并以派生图（assets/pes）呈现产品渲染、结构爆炸图、接口、流程、场景；works/index 第 02 项目已改为真实入口。
- **仍待补/需确认**：工程验证数据（结构/散热/重量/续航/成本）、个人角色、项目周期、获奖/参赛结果、团队分工；《调研报告.pdf》是否可引用其研究结论；对外参数需测试/验收依据。

---

## PHASE 28 — 发布前资料清单（按优先级）

### A. 发布前必须补充
| 项 | 当前页面处理 | 不补充能否继续展示 |
|---|---|---|
| 有效联系方式（Gmail） | Contact 显示「联系方式正在整理」，无假邮箱 / mailto | 可以，但访客无法联系 |
| 简历 / 社交链接的去留 | Contact 未建链接，仅说明整理中 | 可以（保留说明） |
| PES 个人职责与项目周期（若页面展示） | PES 页不展示角色/周期，仅文末说明标注待补 | 可以，作为项目案例展示（不列职责/周期） |

### B. 可选完善
| 项 | 当前页面处理 | 不补充能否继续展示 |
|---|---|---|
| CINIS Figma 链接 | 页面无链接，文档标注待补 | 可以 |
| MOVA 影院页面 / 最终浅色规范 | 页面标注待补 | 可以（缺该章节） |
| MOVA 原型公开权限 | 标注「访问权限待确认」 | 可以（外链兜底） |
| CINIS 次要状态截图 | 标注待补 | 可以（已含 17 个真实状态） |
| PES 参赛 / 获奖信息 | 页面未展示 | 可以 |
| 《调研报告.pdf》是否可引用其结论 | 未引用（当前无 PDF 文本提取工具） | 可以（仅用展板） |


---

## PHASE 29 — 当前状态摘要（以此为准）

| 项目 / 页面 | 当前状态 | 仍缺（真实缺口） |
|---|---|---|
| CINIS 案例 `cinis.html` | **已建页**；展示 17 个真实界面状态（原型 23 屏，已抓取 18 屏 + 完成方式弹层）；三模式/流程/失败分支/魂火/视觉/展板截图齐备 | 次要状态截图（taskDetail/goalEdit/reminderSettings/privacy/trialConfirm/newGoal/editor/modalBgEditor）；Figma 源文件；研究/测试/角色/周期 |
| MOVA 案例 `mova.html` | **已建页**；15 屏真实界面 + 三模式对照/流程/原型外链 | 完整影院列表/详情页；最终浅色 Design System；原型公开访问权限；研究为课程报告 n=1 初步 |
| PES 案例 `pes.html` | **已建页**（Phase 27）；真实展板 300dpi 7442×5264 + 版面2 + 竞赛版面1；渲染/爆炸图/接口/流程/场景 | 工程测试数据（结构/散热/重量/续航/成本）；个人职责、项目周期、参赛/获奖；《调研报告.pdf》可否引用 |
| 首页 / 作品 / About / Contact | 七页均可展示；导航/图片/链接/无横向溢出 | 联系方式（Gmail）、简历/社交链接；About 城市/可用状态、工作或实习经历（如有） |

**早期记录状态**
- PES“无素材 / 不建案例页”（Phase 16）→ **已被 Phase 27 取代**。
- MOVA“无页面”（Phase 08 前）→ **已建页**。
- CINIS“仅 10 屏”（Phase 22）→ **已抓取 18 屏 / 展示 17 状态**（Phase 23）。

**发布前必须补充**：有效 Gmail；简历/社交链接去留；PES 个人职责与项目周期（若页面需展示）。
**可选完善**：CINIS Figma 链接；MOVA 影院页/浅色规范/原型权限；CINIS 次要状态截图；PES 参赛/获奖；《调研报告.pdf》引用授权。
