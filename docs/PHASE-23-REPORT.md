# PHASE 23 REPORT — CINIS 真实状态补抓与完整截图导出

> Branch: `portfolio-redesign` · 开始前 HEAD `4f26920`。**仅改 CINIS 案例页及相关文档/素材；未改 About/首页/作品/Contact/生产分支；未合并/推送/部署。**
> 说明：工作区原有用户手动 tweak（`style.css` works 卡片字重/透明底）**保留未覆盖**，本轮提交不含该文件。

## 1. 真实状态抓取（方法）
- 检查源码 `src/App.tsx`：路由读取 `location.hash`（`h = location.hash.replace('#','')`），即支持 **`#route`**（不是 `#/route`；后者会渲染为空壳）。
- 从**真实运行原型**（`https://cinis.netlify.app/#route`，GitHub Pages 同源亦 200）在 **390×844 @2×** 视口抓取，输出 **780×1688 PNG**；均为真实页面，非示意图。
- 交互补充：完成方式弹层经真实点击「今日任务 → 完成方式」获取。

| 状态 | 路由/来源 | 文件 | 尺寸 |
|---|---|---|---|
| 角色选择 | `#roles` | `assets/screen-roles.png` | 780×1688 |
| 引导（两种成长） | `#onboarding` | `assets/screen-onboarding.png` | 780×1688 |
| 完成方式弹层 | 今日页真实点击 | `assets/screen-chooseMode.png` | 780×1688 |
| 任务完成反馈 | `#taskDone` | `assets/screen-taskDone.png` | 780×1688 |
| 阶段进度 | `#stageProgress` | `assets/screen-stageProgress.png` | 780×1688 |
| 阶段结算 | `#settle` | `assets/screen-settle.png` | 780×1688 |
| 终止 | `#terminal` | `assets/screen-terminal.png` | 780×1688 |
| 重燃 | `#rekindle` | `assets/screen-rekindle.png` | 780×1688 |
| 回归 | `#comeback` | `assets/screen-comeback.png` | 780×1688 |

- `#stage` 路由渲染为空壳，故使用 `#stageProgress`（实际阶段进度页）。

## 2. 页面改动（CINIS）
- §07 核心流程：新增 6 张真实状态（角色选择 / 引导 / 完成方式 / 完成反馈 / 阶段进度 / 阶段结算），每张配设计说明。
- 新增 §05b 失败分支：终止 / 重燃 / 回归三屏，并注明「以旅者为示例；骑士/深渊沿用各自后果」。
- 计数更新：**原型 23 屏 / 已抓取 18 屏（另含完成方式弹层）/ 本页展示 17 个界面状态**（概述与最终界面两处同步）。
- §07「待补」更新为：taskDetail、goalEdit、reminderSettings、privacy、trialConfirm、newGoal、editor、modalBgEditor 等次要流程/设置页。
- 未改章节结构与视觉系统。

## 3. 骑士/深渊高清立绘复核（不替换）
- 当前 `char-traveler/knight/abyss` 实为 **324 / 568 / 336 px**（清晰，此前 56–80px 记录为误判，已更正 Phase 22 报告与 OPEN-QUESTIONS）。
- Desktop `paladin_knight` 与原 `char-knight` 为**不同造型**（不同头盔/披风/配色），不能混用；`深渊/chibi_knight4` 与当前深渊一致，但现有 336px 已足够。→ **本轮不替换线上素材**。

## 4. 完整页面截图（实际像素）
| 页面 | 文件 | 实际尺寸 |
|---|---|---|
| CINIS 桌面 | `_shots/P23-cinis-desktop.png` | **1440 × 13684** |
| CINIS 手机 | `_shots/P23-cinis-mobile.png` | **390 × 18248** |

- 已取消脚本 18000px 截断，按真实 `scrollHeight` 导出完整高度。
- 手机横向溢出检查：`innerWidth=390 / docScrollWidth=390 / bodyScrollWidth=390 → overflow=false` ✅。
- 链接/图片校验（6 页）通过。

## 5. 改动文件
- `cinis.html`（新增 9 张状态与图注、计数与待补更新）
- `assets/screen-{roles,onboarding,chooseMode,taskDone,stageProgress,settle,terminal,rekindle,comeback}.png`（新增，源自真实原型）
- `docs/CINIS-CASE-STUDY-OUTLINE.md`（Phase 23 台账 + 状态更新）
- `docs/OPEN-QUESTIONS.md`（清晰度更正 + Phase 23 记录）
- `docs/PHASE-22-REPORT.md`（立绘尺寸更正）
- `docs/PHASE-23-REPORT.md`（本文件）
- `_shots/P23-cinis-{desktop,mobile}.png`

## 6. 仍待补 / 需你提供
- 次要流程/设置页截图（taskDetail、goalEdit、reminderSettings、privacy、trialConfirm、newGoal、editor、modalBgEditor）。
- 用户研究 / 可用性测试 / 量化成效；个人角色与项目周期。
- CINIS Figma 链接。
- 骑士/深渊是否需要专门的**阶段/变体**立绘（如需要，请指明对应关系；现有主立绘清晰可用）。

## 7. Git
- 提交见本轮（`feat(cinis): Phase 23 capture real states + full-height exports`），仅 `portfolio-redesign`；未推送。
