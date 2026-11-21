# PHASE 22 REPORT — CINIS 案例页内容与素材对应复核

> Branch: `portfolio-redesign` · 开始前 HEAD `75dbe1f`，工作树 clean。**仅改 CINIS 案例页与相关文档；未改 About/首页/作品列表/Contact/生产分支；未合并/推送/部署。**

## 1. 内容—证据对照（按现有章节）
| 章节 | 关键陈述 | 真实来源 | 分类 |
|---|---|---|---|
| 01 项目概述 | 三模式/魂火/结算/失败回归闭环 | 真实截图 + `content.ts`/README | **A/B** |
| 02 背景与问题 | 「连续打卡+中断清零」问题 | 无研究；仅**设计出发点** | **C（假设）** |
| 03 设计目标 | 有后果/有梯度/有成长 | 机制推演 | **B（目标非成果）** |
| 04 研究依据 | 无访谈/测试 | —— | **C（缺失）** |
| 05 三模式 | 无门槛/誓约/契约；后果差异；不收回 | `content.ts`（settle/rekindle/comeback/achievements）+ 角色图 | **A**（失败分支截图待补） |
| 06 信息架构 | 四 Tab | `routes.ts`/`tabs.ts` | **A** |
| 07 核心流程 | 角色→今日→完成方式→专注→反馈→结算→失败分支 | 截图 today/focus + README | **A/B**（多状态截图待补） |
| 08 关键交互·魂火 | 换肤/计时/勾选/导航/魂火→称号 | 代码 + growth/achievements/badges | **A/B**（成长场景仅骑士示例） |
| 09 视觉系统 | 色板/三模式主题/字号圆角 | `tokens.ts`/`global.css` | **A** |
| 10 最终界面 | 8 个界面状态 | 真实截图 780×1688@2× | **A**（角色立绘偏低清，待确认高清） |
| 原型演示 | GH Pages / Netlify | 实测均 **200** | **A** |
| 11 反思 | 闭环总结 | 设计总结 | **B**（角色/周期/研究/指标无记录） |

> 分类：A 有素材可支撑 · B 可据现有原型准确说明 · C 缺少依据需待补。完整表已写入 `docs/CINIS-CASE-STUDY-OUTLINE.md`（Phase 22 段）。

## 2. 本轮实际小修正（仅 CINIS）
1. **封面移除可见 TODO**：删除「角色 待补充（TODO）/ 时间 待补充（TODO）」两行，保留交付物/工具（不编造角色与年份；缺口记入 OPEN-QUESTIONS）。
2. **研究依据表述**：「（未提供，TODO）」→「（暂无相关材料）」。
3. **最终界面计数精确化**：「本页展示 8 屏」→「**全页共展示 8 个界面状态（下方含『今日』细节放大）**」，避免把细节放大当作额外第 8 屏的歧义。
4. **反思说明去 TODO**：改为「个人角色、项目周期、用户研究、可用性测试与量化成效**暂无记录，故不作结论**；原始设计文件（Figma）如提供将补充」。
5. **细节放大裁切**：`.cs-cinis .zoom img` 上移（top −20%→−26%）聚焦魂火卡，减少标题被截断的观感。
- **未改**：章节结构、文案事实、视觉系统、其他页面、原始素材。

## 3. 素材与页面表现核对
- 截图与真实页面一致（today/focus/growth/characterFile/achievements/goals/history/me）；比例 390×844@2×，`contain` 不放大裁切；图注与段落对应（已核对 8 图）。
- **清晰度提示（待确认，不擅自替换）**：**更正（Phase 23）**：角色立绘实为 324/568/336px（清晰），此前“56–80px”为误判；Desktop 的 paladin 为不同骑士造型、深渊 chibi 与现有一致但现有尺寸足够 → 不替换。
- 图片替代文本：全部图片均有描述性 alt（角色、界面、徽章）；无装饰性冗余朗读。

## 4. 入口与演示
- 作品列表 → CINIS：`href="cinis.html"` 有效（真实 `<a>`，Phase 18 已键盘可用）。
- 原型链接：GitHub Pages `https://canchuang.github.io/CINIS-webdemo/` 与 Netlify `https://cinis.netlify.app/` 实测 **HTTP 200**；页面以外部按钮呈现，不依赖 iframe；**无 Figma 链接则不生成假链接**（TODO 记于文档）。
- 手机端阅读顺序：与 DOM 顺序一致（封面→概览→背景→目标→研究→三模式→IA→流程→交互→视觉→最终界面→原型→反思→返回作品），无横向溢出。

## 5. 截图（内容高度）
- 桌面 1440：`_shots/P22-cinis-desktop.png`（h=12009）
- 手机 390：`_shots/P22-cinis-mobile.png`（h=16181）
- 链接/图片校验（6 页）通过；桌面/手机无横向溢出。

## 6. 改动文件
- `cinis.html`（4 处文案/元信息修正）
- `style.css`（`.cs-cinis .zoom img` 裁切微调）
- `docs/CINIS-CASE-STUDY-OUTLINE.md`（Phase 22 内容—证据对照表）
- `docs/OPEN-QUESTIONS.md`（Phase 22：角色立绘清晰度待确认）
- `docs/PHASE-22-REPORT.md`（本文件）
- 截图：`_shots/P22-cinis-{desktop,mobile}.png`

## 7. 仍需待补 / 需你提供
- 用户研究 / 可用性测试 / 量化成效；个人角色与项目周期。
- CINIS **Figma 链接**；缺失状态截图（roles/onboarding、taskDone、stage/settle、terminal/rekindle）。
- **骑士/深渊高清立绘**的模式/阶段归属确认（确认后可替换高清版，原件只读不改）。

## 8. Git
- 提交见本轮（`docs(cinis): Phase 22 content-evidence audit + small copy fixes`），仅 `portfolio-redesign`；未推送。
