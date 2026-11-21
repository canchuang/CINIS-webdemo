# PHASE 18 REPORT — 作品列表交互与可访问性验收

> Branch: `portfolio-redesign` · 开始前 HEAD `a3f7c59`，工作树 clean。**保持 Phase 17 视觉方案；未重做页面、未改案例页/素材；未改 main/gh-pages/生产，未合并/部署。**

## 1. 筛选交互（实测，CDP 真实点击）
| 操作 | 可见项目 | aria-pressed（all/uiux/product） | 状态文本 |
|---|---|---|---|
| 初始 | CINIS、便携式储能、MOVA（3） | true/false/false | 已显示 3 个项目：CINIS、便携式储能、MOVA |
| 点 UI/UX | CINIS、MOVA（2） | false/true/false | 已显示 2 个项目：CINIS、MOVA |
| 点 产品 | 便携式储能（1） | false/false/true | 已显示 1 个项目：便携式储能 |
| 点 全部 | 3 | true/false/false | 已显示 3 个项目 |

- 筛选**真实生效**（非视觉按钮）；活动态 `.on`（深底反白）清晰；`aria-pressed` 同步；新增 `role="status" aria-live="polite"` 播报数量与名称。编号（01/02/03）为项目编号、非计数，与筛选结果不冲突。

## 2. 卡片与导航（可访问性）
| 检查 | 结果 |
|---|---|
| CINIS 卡片 | ✅ 现为 `<a href="cinis.html">`，`tabIndex=0`，`aria-label="CINIS — UI/UX · 产品设计，查看案例"`；整卡可点、可键盘聚焦 |
| MOVA 卡片 | ✅ `<a href="mova.html">`，可聚焦，`aria-label` 同上格式 |
| PES 卡片 | ✅ 仍为 `<article>`，**无 href、tabIndex=-1、cursor:default**，hover 不再变标题色/缩放 → 不伪装成可进入；保留「案例素材待补充」 |
| 键盘 | ✅ 筛选项（3 个 `<button>`）`tabIndex=0`，原生 **Enter 与 Space 均可触发**；两张卡片链接为 `<a href>`（`tabIndex=0`），原生 **Enter 可触发**、**Space 为页面滚动、不激活链接**；无自定义按键逻辑（无 `onkeydown`）；`:focus-visible` 2px 强调色轮廓（含 `.wcard:focus-visible`） |
| 图片替代文本 | ✅ 6 张图均具描述性 alt（CINIS 今日/成长/角色档案；MOVA 电影首页/选座/电子票）；无重复装饰性朗读（卡片链接以 aria-label 命名，避免图片 alt 叠加冗读） |

## 3. 移动端与动效
- 筛选按钮 `flex-wrap`，手机端自动换行、点按区足够；筛选后页面高度与顺序自然（CINIS→PES→MOVA 过滤后收拢）。
- 卡片交互不依赖 hover：可进入项为真实链接，触屏直接点按；PES 明确非链接、不可点。
- **减少动态效果**：`Emulation prefers-reduced-motion: reduce` → `media=true`，筛选仍正常（产品筛选显示 1 项）；全站动效在 reduced-motion 下由既有 CSS 收束，筛选逻辑不依赖动效。
- 保持 Phase 17：CINIS 三屏、PES 3/2 占位、MOVA 三屏**均未重裁/放大**。

## 4. 本轮实际修复（仅修确认问题）
1. 筛选：加 `role="group" aria-label`、按钮 `type="button"` 与 `aria-pressed`；新增隐藏 live 区域播报「已显示 N 个项目：…」；重写内联脚本（含数量/状态、初始 all）。
2. 卡片：CINIS/MOVA 由 `article + onclick` → **`<a href>` 真链接**（可键盘聚焦、aria-label）；移除 `onclick`。
3. PES：`.pes-card{cursor:default}` + 取消 hover 标题变色/图片缩放 → 不再暗示可点。
4. 新增 `.visually-hidden` 工具类与 `.wcard:focus-visible` 焦点样式。
- 未改动：视觉布局/字体/颜色/分隔线、CINIS 三屏与 MOVA 三屏、PES 占位比例、案例页内容。

## 5. 截图（内容高度）
- 桌面 1440：`_shots/P18-works-desktop.png`（h=2106）
- 手机 390：`_shots/P18-works-mobile.png`（h=1638）

## 6. 检查结果
链接/图片校验（6 页）通过；桌面/手机无横向溢出；筛选键盘可用；焦点可见；PES 非链接；alt 完整；reduced-motion 下筛选正常。**未新增自动化测试**（本轮用一次性 CDP 验收脚本核对，未纳入仓库）。

## 7. 改动文件
- `works.html`（筛选语义/aria/live 状态、卡片改真链接、脚本重写）
- `style.css`（`.visually-hidden`、`.wcard.pes-card` 非交互、`.wcard:focus-visible`）
- `docs/OPEN-QUESTIONS.md`（Phase 18 记录）
- `docs/PHASE-18-REPORT.md`（本文件）
- 截图：`_shots/P18-works-{desktop,mobile}.png`

## 8. 未完成 / 需你提供
- **PES 真实素材**（外观渲染/成品图、结构/爆炸图、场景研究、过程展板、参数）→ 否则 PES 卡维持「待补充」、不建案例页。
- 个人简介 / 城市 / 经历；Gmail 地址 / 简历 / 社交链接。
- CINIS：Figma 链接、缺失状态截图（roles/onboarding、taskDone、stage/settle、terminal/rekindle）、深渊/骑士阶段素材对应确认。

## 9. Git
- 提交见本轮（`feat(works): Phase 18 works filters a11y + real card links`），仅 `portfolio-redesign`；未推送。
