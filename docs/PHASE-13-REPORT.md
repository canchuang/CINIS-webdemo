# PHASE 13 REPORT — CINIS 案例页高保真初版

> Branch: `portfolio-redesign` · 开始前 HEAD `cecf777`，工作树 clean。沿用 **Modern Editorial** 外壳；CINIS 自身蓝色/橙色/游戏视觉保留在项目内容内。**未改 main/gh-pages/生产，未合并/部署；未重做首页/MOVA/全局视觉。**

## 1. 本轮做了什么
- 将 `cinis.html` 由旧 13 段**重写为 Phase 12 大纲的 Cover + 11 段**（+ 原型体验 10b），加入目录（TOC）、章节编号与图注。
- 从首页/作品列表接入（原链接已指向 `cinis.html`，无需改动）；页尾「← 返回作品」到 `works.html`。
- 仅在 `style.css` 增加 CINIS 专属轻量样式：封面三模式角色三图布局、竖屏截图最大宽度约束（控制页面长度）。**未改全局设计系统。**

## 2. 章节结构（Cover + 11 + 原型）
0 Cover（三模式角色主视觉 + 目录）→ 01 项目概述 → 02 背景与问题（**设计出发点/待验证假设**）→ 03 设计目标 → 04 研究依据（**待补**）→ 05 产品策略 · 三模式（重点）→ 06 信息架构 → 07 核心流程（重点）→ 08 关键交互 · 魂火成长（重点）→ 09 视觉系统 → 10 最终界面 → 10b 原型体验 → 11 反思。TOC 锚点与 11 个 section id 一一对应。

## 3. 素材映射与计数口径（诚实）
- **原型总屏数 23**；**本地已抓取 10 屏**；**本页展示 8 屏关键状态**（today/growth/characterFile/achievements/goals/focus/history/me）。页面明写该口径，未把 10 写成 23。
- 使用素材（均在 `direction-b-modern-editorial/assets/`）：`char-{traveler,knight,abyss}.png`、`growth-scene.png`、`badge-1..3.png`、`screen-*.png`。状态 **READY**。
- **未抓取状态**：roles/onboarding、taskDone、stage、settle、terminal、rekindle 等 → 页面就地标「待补」，**未用相似页面替代或伪造**（见 §07/§10 说明与 §04 研究待补）。
- **工作区新增角色源图核对**：`Desktop/学习资料/…/图形界面设计/CINIS/Characters`（traveler_lv1~3、深渊 chibi_knight 变体、paladin_knight 等）确为**用户自有项目源图**；本轮**未使用、未覆盖原始备份**（可作为后续「阶段演进 / 立绘」素材，需先优化再接入）。

## 4. 三个设计能力重点
1. **三模式（旅者/骑士/深渊）**：真实角色图 + 强度/后果差异（旅者「本轮无损失」、骑士「誓约·可追回 REKINDLE」、深渊「契约已断·魂火从零重开」），据 `content.ts` 真实文案整理，并有「设计逻辑」块。
2. **核心流程（立誓与专注）**：模式/角色确立 → 今日 → 完成方式 → 专注 → 反馈 → 阶段结算 → 失败分支/回归；展示 today、focus 真实截图。
3. **魂火成长反馈**：growth 截图 + growth-scene + badges + 成就墙；说明魂火累积→阶段→经验/称号（永久成长不收回）。

## 5. 内容边界
- 背景「连续打卡 + 羞耻惩罚」明确标为**设计出发点 / 待验证假设**，非已验证行业/用户结论。
- 研究/可用性测试/效果指标/个人角色/周期：无证据 → **TODO**（页面明写，不编造）。
- 原型链接仅记录真实地址与探测状态，不声称未验证的 Figma 可访问（CINIS 暂无 Figma 链接，标 TODO）。

## 6. 原型入口（不依赖 iframe）
- GitHub Pages `https://canchuang.github.io/CINIS-webdemo/`（Phase 13 探测 **HTTP 200**，主入口）
- Netlify `https://cinis.netlify.app/`（**HTTP 200**，镜像备用）
- 以**外链按钮**呈现，页面无需 iframe 即可理解；iframe 可用性未在此声明为已保证。

## 7. 检查结果（仅本轮改动）
| 项 | 结果 |
|---|---|
| 链接 / 图片校验（6 页静态） | ✅ 全部本地 href/src 解析（`qa.mjs`） |
| 桌面 1440 整页 + 关键章节 | ✅ `_shots/P13-cinis-desktop.png`、`P13-desktop-{top,strategy,flow,interact,ui}.png` |
| 手机 390 整页 + 关键章节 | ✅ `_shots/P13-cinis-mobile.png`、`P13-mobile-{strategy,flow,interact,ui}.png`；单栏、无横向溢出 |
| 页面长度控制 | ✅ 竖屏截图最大宽度 340px；整页由约 16000px 降至约 13000px（截图高度），阅读节奏更稳 |
| 外壳一致性 | ✅ Modern Editorial（紫强调/中文字体/网格）；CINIS 蓝橙与游戏视觉保留 |

## 8. 改动文件
- `experiments/art-direction/direction-b-modern-editorial/cinis.html`（重写为 Cover+11 段）
- `experiments/art-direction/direction-b-modern-editorial/style.css`（仅追加 `.cs-cinis` 封面三图 + 竖屏截图宽度上限；无全局改动）
- `docs/PHASE-13-REPORT.md`（本文件）
- 截图：`_shots/P13-*.png`
- 首页/作品页链接：**未改动**（已指向 `cinis.html`，本轮确认可用）

## 9. 与 Phase 12 文档差异
- Phase 12 大纲为 Cover+11 段；本页按此实现（另加 10b 原型体验块，便于放外链）。
- Phase 12 报告称已抓取 10 屏；本页展示 8 屏关键状态，计数口径与页面一致（23 / 10 / 8）。其余无冲突。

## 10. 仍需确认 / 待补
1. CINIS 原始 **Figma 链接/权限**（TODO）。
2. 补抓 roles/onboarding、taskDone、stage/settle、terminal/rekindle 截图（决定立誓/失败分支章节完整度）。
3. 个人角色、项目周期、研究/测试/指标（无证据则保持 TODO）。
4. 是否引入 Desktop 的**角色阶段源图**（需优化/授权确认后再用）。
5. 三模式/失败分支命名与文案是否以 `content.ts` 为准。

## 11. Git
- 提交见本轮（`feat(cinis): Phase 13 high-fidelity case page initial`），仅 `portfolio-redesign`；未推送。
