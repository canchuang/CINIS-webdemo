# CINIS CASE STUDY — OUTLINE & ASSET MAP

> Phase 12 · 内容结构与素材映射（**暂不开始大规模页面开发**）。
> 沿用作品集 **Modern Editorial** 外壳；CINIS 自身蓝色/游戏视觉保留在项目内容内。
> 状态图例：**READY** 可直接用 · **NEEDS-PROCESSING** 需整理/派生/抓取 · **MISSING** 未提供（TODO）。
> 素材路径约定：`P/` = `experiments/art-direction/direction-b-modern-editorial/assets/`；`S/` = `assets/source/CINIS-webdemo/public/assets/`；`SC/` = `experiments/art-direction/_screens/`。

---

## 0. 素材盘点摘要（Phase 12 实测）
- 源备份：`assets/source/CINIS-webdemo`（166 文件；`public/assets` 66 文件；`src/pages` 31 个 tsx）。
- 设计清单：`S/assets.json`（Figma 导出，45 项 = 17 图 + 28 矢量；含重复名共 66 文件）。
- **真实截图**：已抓取 10 屏 `SC/*.png`（splash, today, goals, goalDetail, growth, characterFile, achievements, focus, history, me）；已复制到 `P/screen-*.png`。
- **角色/插画**：`P/char-traveler.png`、`P/char-knight.png`、`P/char-abyss.png`、`P/growth-scene.png`、`P/badge-1..3.png`、`P/settle-{traveler,knight,abyss}.png`。
- **代码/文案**：`assets/source/CINIS-webdemo/src/data/content.ts`（文案）、`routes.ts` / `tabs.ts`（结构）、`styles/tokens.ts`+`global.css`（设计令牌）。
- **原型**：`https://canchuang.github.io/CINIS-webdemo/`（GitHub Pages，Phase 12 探测 **200**）；`https://cinis.netlify.app/`（Netlify 镜像，探测 **200**）。iframe 可用性需在页面构建时复测。
- **Figma**：**MISSING**（未提供 CINIS 原始 Figma 链接）→ TODO；不声称可用。

---

## 页面章节顺序（Cover + 11 段）

### 0) Cover — 项目封面
- 目的：一眼传达「游戏化自律 · 三模式」。
- 内容：CINIS 标题、一句定位（游戏化自律产品）、元信息（角色/工具/时间均 **TODO**）、主视觉。
- 素材：`P/char-knight.png` / `P/growth-scene.png` / `P/screen-today.png`（**READY**）。
- TODO：真实角色/周期。

### 1) 项目概述 — Overview
- 目的：产品是什么、覆盖什么。
- 内容：游戏化自律应用；三模式 + 魂火 + 23 屏原型的概览。
- 素材：`P/screen-today.png`（**READY**）；文案可据 `content.ts`/README（**READY**）。
- TODO：可量化的规模/成果（不写）。

### 2) 背景与问题 — Background & Problem
- 目的：为什么做；主流自律 App 的「连续打卡 + 羞耻」问题。
- 内容：问题陈述（设计推演，非用户研究结论）。
- 素材：无专用图（**READY 文案可写**）；研究证据 **MISSING**。
- TODO：真实背景资料/引用（如有则补）。

### 3) 设计目标 — Design Goals
- 目的：从问题到目标（目标表述，不是被验证的成果）。
- 内容：三条目标（如：用叙事化后果替代羞耻惩罚 / 三档强度适配不同承受力 / 成长可视化）。
- 素材：**NEEDS-PROCESSING**（需据原型逻辑撰写；**不得写成已验证效果**）。
- TODO：目标若需与真实项目目标对齐，待确认。

### 4) 研究依据 — Research Basis
- 目的：证据与推断分开。
- 内容：**MISSING** —— 无 CINIS 用户研究/测试材料；此处仅能标注「无公开研究资料」，不编造样本/比例/结论。
- 素材：**MISSING**。
- TODO：用户研究、可用性测试、访谈（若有再补）。

### 5) 产品策略 — Product Strategy（含三模式机制）
- 目的：讲清三模式（旅者/骑士/深渊）如何用「难度—后果」服务长期自律。
- 内容：每档定位、失败分支（旅者无损失/骑士誓约可追回 REKINDE/深渊契约已断重开）、切换即全局换肤。
- 素材：`P/char-traveler.png`、`P/char-knight.png`、`P/char-abyss.png`（**READY**）；机制逻辑见 README/`content.ts`（**READY**）。
- 差距：三套失败分支的**结算/终止/重燃页面截图未抓取** → `settle/terminal/rekindle` **NEEDS-PROCESSING（待抓）**。

### 6) 信息架构 — Information Architecture
- 目的：四 Tab（今日/目标/成长/我的）与各子树。
- 内容：结构图（可据 `routes.ts`/`tabs.ts` 派生）。
- 素材：**NEEDS-PROCESSING**（需据代码整理为图）；截图 `today/goals/growth/me`（**READY**）。
- TODO：无。

### 7) 核心流程 — Core Flow（立誓与专注主流程 重点）
- 目的：引导 → 今日 → 完成方式 → 专注计时 → 反馈 → 阶段结算（+ 失败分支）。
- 内容：主链路与关键状态；真实倒计时/暂停继续。
- 素材：`P/screen-today.png`、`P/screen-focus.png`（**READY**）；`taskDone/stage/settle` 截图 **MISSING（待抓）**；流程可据 README（**READY**）。
- 重点：**立誓（角色/模式确立）与专注**——`roles`/`onboarding` 截图未抓取 → **NEEDS-PROCESSING**。

### 8) 关键交互 — Key Interactions（含魂火成长反馈 重点）
- 目的：说明关键交互逻辑与反馈。
- 内容：换模式全局联动、专注倒计时、任务勾选与进度、完成方式底部弹层、导航指示块 380ms transform、页面淡入 220ms；**魂火成长反馈**（魂火累积→阶段推进→徽章/成就）。
- 素材：`P/screen-growth.png`、`P/growth-scene.png`、`P/badge-1..3.png`（**READY**）；交互逻辑见代码（**READY**）。
- 差距：`taskDone` 等状态截图 **MISSING**。

### 9) 视觉系统 — Visual System
- 目的：真实设计令牌（非估测）。
- 内容：核心色板（Bg #F5F7FB / Ink #16181D / Primary #FF7A1A…）、三模式深色主题（Traveler/Knight/Abyss 的真实 card/text/accent）、圆角 9/16/35/999、字号 10–28、画布 390×844。
- 素材：`src/styles/tokens.ts` + `global.css`（**READY**）；`S/assets.json`（**READY**）。
- 差距：成体系的「设计系统展示板」需整理 → **NEEDS-PROCESSING**。

### 10) 最终界面 — Final UI（高保真集合）
- 目的：以真实截图呈现成品界面，大小图交替、非机械网格。
- 素材（**READY，10 屏**）：`P/screen-{splash,today,goals,goalDetail,growth,characterFile,achievements,focus,history,me}.png`。
- 差距（**待抓**）：`roles, onboarding, taskDone, stage, settle, terminal, rekindle, reminderSettings, privacy, stageProgress, comeback, trialConfirm, newGoal, editor, modalBgEditor, chooseMode` → **NEEDS-PROCESSING/MISSING**。

### 11) 反思 — Reflection
- 目的：设计思考与边界。
- 内容：产品逻辑层面的总结（可据原型）。
- 素材：**NEEDS-PROCESSING（文案可写）**；成果指标/测试结论 **MISSING → TODO**。
- TODO：真实成果/角色/周期（无证据不写）。

---

## 三个「最能体现设计能力」的重点（优先组织）
| 重点 | 说明 | 素材状态 |
|---|---|---|
| **A. 三模式机制（旅者/骑士/深渊）** | 难度—后果设计，切换即全局换肤，三套独立失败分支 | 角色图 **READY**（3）；机制逻辑 **READY**；失败分支截图 **NEEDS-PROCESSING（settle/terminal/rekindle 待抓）** |
| **B. 立誓与专注主流程** | 从角色/模式确立到今日任务、完成方式、专注计时、反馈 | today/focus 截图 **READY**；roles/onboarding/taskDone **MISSING（待抓）**；流程 **READY**（README/代码） |
| **C. 魂火成长反馈** | 魂火累积→阶段推进→徽章/成就的可视化反馈 | growth 截图 + growth-scene + badges **READY** |

---

## 原型 / Figma（只记录真实链接与访问状态）
| 资源 | 链接 | 访问状态（Phase 12 探测） |
|---|---|---|
| GitHub Pages 原型 | `https://canchuang.github.io/CINIS-webdemo/` | **HTTP 200**（可用；页面内 iframe 需构建时复测） |
| Netlify 镜像 | `https://cinis.netlify.app/` | **HTTP 200**（镜像备用） |
| Figma 原始文件 | — | **MISSING**（未提供，待补；不声称可访问） |

---

## 开始高保真开发前仍需确认
1. **CINIS 原始 Figma 链接/权限**（用于精确规范；当前仅能从 `tokens.ts` 与截图还原）。
2. **补齐关键路由截图**：roles/onboarding、taskDone、stage/settle、terminal/rekindle（三模式失败分支）、以及 reminderSettings/privacy 等（按叙事取舍）。
3. **用户研究/测试/成果指标/角色/周期**：均无证据 → TODO，需你提供或明确「不写」。
4. **命名口径**：三模式中英文标签、失败分支文案以 `content.ts` 为准，还是另行提供？
5. **原型嵌入方式**：GitHub Pages 是否允许 iframe（构建时复测）+ 外链兜底。

> 本轮仅盘点与结构，不生成缺失素材、不把缺失章节伪装为已完成。

---

## PHASE 22 — 内容与证据对照（页面现有章节）

> 分类：A=有素材可支撑 · B=可根据现有原型准确说明 · C=缺少依据需待补。

| 页面章节 | 关键陈述 | 真实来源 | 分类 | 待补/说明 |
|---|---|---|---|---|
| 01 项目概述 | 三模式 / 魂火 / 阶段结算 / 失败回归闭环 | 真实截图 + content.ts / README 路由 | A/B | 计数 23 屏 / 已抓 10 / 全页展示 8 |
| 02 背景与问题 | 「连续打卡+中断清零」的问题 | **无用户研究**，仅为设计出发点 | C | 明确标「待验证假设」，不作结论 |
| 03 设计目标 | 有后果 / 有梯度 / 有成长 | 依据三模式机制的推演 | B | 目标表述，非成果 |
| 04 研究依据 | 无访谈/测试材料 | —— | C | 明确标注缺失 |
| 05 产品策略·三模式 | 无门槛/誓约/契约；后果差异；不收回 | content.ts（settle/rekindle/comeback/achievements 文案）+ 角色图 | A | 失败分支页截图（settle/terminal/rekindle）待补；深渊/骑士阶段图待确认 |
| 06 信息架构 | 今日/目标/成长/我的 四 Tab | routes.ts / tabs.ts | A | —— |
| 07 核心流程 | 角色→今日→完成方式→专注→反馈→结算→失败分支 | 截图 today/focus + README | A/B | roles/onboarding、taskDone、stage/settle、terminal/rekindle 截图待补 |
| 08 关键交互·魂火 | 换肤联动/真实计时/任务勾选/导航/魂火累积→称号 | 代码实现 + growth/achievements 截图 + badges | A/B | 成长场景图仅「骑士」示例；实现参数为次级注释 |
| 09 视觉系统 | 核心色板 / 三模式深色主题 / 字体圆角画布 | tokens.ts / global.css（真实令牌） | A | —— |
| 10 最终界面 | 8 个界面状态（今日含细节放大） | 真实截图（780×1688 @2×） | A | 角色立绘 56–80px 偏低清；Desktop 高清原件映射待确认后再替换 |
| 原型演示 | GitHub Pages 主入口 / Netlify 镜像 | 实测 2026-11-21 均 HTTP 200 | A | 不依赖 iframe；Figma 原始链接仍缺 |
| 11 反思 | 三模式/主流程/魂火闭环总结 | 依据原型的设计总结 | B | 角色/周期/研究/测试/指标无记录，不作结论 |

**Phase 22 页面小修正**：移除封面「角色/时间 TODO」展示；研究/反思的 TODO 字样改为「暂无记录」表述；10 最终界面计数表述更精确（全页 8 个界面状态，含今日细节放大）；细节放大裁切上移聚焦魂火卡。

**整体待补**：用户研究/可用性测试/量化成效、个人角色与项目周期、CINIS Figma 链接、缺失状态截图（roles/onboarding、taskDone、stage/settle、terminal/rekindle）、骑士/深渊高清立绘的归属确认。
