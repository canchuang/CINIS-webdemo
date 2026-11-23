# SCROLL EXPERIENCE REPORT — 首页滚动叙事 / Pinned Project Showcase

> 分支：`portfolio-redesign`（本地工作区）· 站点：`https://loquacious-maamoul-60291d.netlify.app/`
> **按你的最新指示：完成后不提交/不推送/不同步 GitHub，改动留在工作区交给 GPT 同步；Netlify 部署结果不验证、不声称。**

## 1. 动效系统审查与复用
- 现有 `project-motion.js`：作品卡片→详情页的 FLIP 式转场幕布 + 作品筛选 FLIP，已复用，不改其逻辑。
- 现有 `interaction-flow.js`：随阅读段落漂移的 ambient 背景层，已复用。
- 现有 `hero-bg-canvas.js / hero-bg.js`：Aurora/Grainient 背景，保持。
- 现有 `.rv` IntersectionObserver reveal（`app.js`）保持。
- **未引入 Lenis**；未重复初始化滚动控制器；仅新增 GSAP + ScrollTrigger（本地 vendor，不走 CDN）。
- 现有远端文案/全宽版式（你的提交 `3db30b0`）已同步到本地并完整保留。

## 2. 实现（首页 Selected Works）
- 数据层：`content/projects.json` 新增每项目 `showcase`：`accent / visual / label / note / images`；
  - CINIS：旅者/骑士/深渊三角色（modes）
  - MOVA：电影首页/选座/电子票三屏（screens）
  - PES：产品三视图 + 结构爆炸图（industrial）
  - 重建 `content/projects-data.js`（`node scripts/build_projects.mjs` 校验通过）。
- 渲染：`scroll-showcase.js` 依据 `window.PROJECTS` 生成 3 个 `.showcase-panel`（标题/编号/类别/简介/标签/CTA/视觉）。
- 滚动结构：`#work.showcase` → `.showcase-viewport`（桌面 pin）→ `.showcase-stage`；右侧进度轨与 `01/03` 计数。
- 桌面（≥1024 且非 reduced）：
  - Hero：`gsap.to('.hero-v2x .wrap', {yPercent:-10, opacity:0, scrub})`，标题缓缓上移淡出。
  - Showcase：`ScrollTrigger` pin + `scrub:1`；每段用 `clip-path: inset()` + `scale()` 做“遮罩展开 / 收束”，上一项目 scale 1.045 淡出、下一项目 0.95→1 展开；约 2 个视口滚动长度完成 3 项目。
  - 每个项目背景使用自己的 `--panel-accent`（CINIS 薰衣草 / MOVA 暖橙 / PES 冷灰），全站保持冷白基调。
  - 活动 panel 的 `pointer-events:auto`，其余 `none`；**CTA「查看案例」始终可点**（点击验证：`pes.html` 成功跳转）。
- 移动/平板（<1024）与 `prefers-reduced-motion`：**不 pin、不 scrub**，回退为自然纵向堆叠面板；无横向溢出，无滚动锁。`static` 参数下同样回退。
- 修复关键兼容问题：`main.page-fade` 原有 `transform` 入场动画会创建 containing block，使 `position:fixed` 的 pin 偏移到视口外；已改为**仅透明度淡入**（`pageFadeOnly`），保留页面淡入观感并修复 pin。

## 3. 验收（真实浏览器）
### 3.1 尺寸 / 溢出（5 档）
| 页面 | 1440 | 1280 | 768 | 390 | 375 | 横向溢出 |
|---|---:|---:|---:|---:|---:|---|
| Home | 5065 | 4967 | 4446 | 3939 | 3928 | 无 |
| Works | 2329 | 2166 | 2203 | 1599 | 1571 | 无 |
| About | 2442 | 2408 | 2620 | 2821 | 2820 | 无 |
| Contact | 900 | 900 | 1024 | 844 | 844 | 无 |
| CINIS | 18228 | 17591 | 17867 | 18618 | 18643 | 无 |
| PES | 13414 | 12525 | 11360 | 10497 | 10575 | 无 |
| MOVA | 14781 | 14117 | 19643 | 16642 | 16592 | 无 |

### 3.2 滚动/交互
- 正向：面板 1→2→3 依次激活，rail 0→50%→100%；反向快速滚回：3→2→1 正常（实测 opacity/active 均回退）。
- 点击：活动面板 CTA `href=pes.html`、`pointer-events:auto`，点击后实际进入 `pes.html`。
- 平板 768 / 手机 390：`is-enhanced=false`（无 pin），`overflow=false`；手机面板高度 731/668/712（自然堆叠）。
- 控制台：0 个 error。
- `prefers-reduced-motion: reduce`：`matchMedia=true`、`is-enhanced=false`、docH 4371、无溢出；无 pin/无 scrub。
- 现有导航、筛选、作品切换、Aurora/Grainient 均正常。

## 4. 性能
- GSAP `72KB` + ScrollTrigger `43KB`（本地 vendor，无 CDN 请求；无新 npm 依赖）。
- 单页仅 **1 个 pinned ScrollTrigger**（2 次转场）；移动端/减少动态直接不创建 pin。
- `will-change: opacity, transform, clip-path`；非首屏面板图片 `loading=lazy`；无 Lenis 平滑层，避免二次滚动。
- 无滚动锁、无固定高度空白、无强制 Scroll Snap。

## 5. 截图（`_shots/scroll-experience/`）
- `SCROLL-desktop-01.png` — Hero 首屏 1440×900
- `SCROLL-desktop-02.png` — Hero 滚动过渡 1440×900
- `SCROLL-desktop-03.png` — 进入 Showcase 1440×900
- `SCROLL-desktop-04.png` — CINIS 模式面板 1440×900
- `SCROLL-desktop-05.png` — PES 工业面板 1440×900
- `SCROLL-desktop-06.png` — MOVA 界面面板 1440×900
- `SCROLL-desktop-07.png` — 末面板/进度 1440×900
- `SCROLL-mobile-full.png` — 手机整页（降级堆叠）390×3939

## 6. 工作区 / 同步状态（重要）
- **本轮不提交、不推送、不部署**：按你的指示留给 GPT 同步。
- 远端 `portfolio-redesign` 当前仍是 `3db30b0`（你的文案/全宽提交）+ 之前 `c9764c0` 报告提交；本地工作树基于其最新内容。
- **真正需要同步的本轮变更（相对远端）**：
  1) `experiments/art-direction/direction-b-modern-editorial/index.html`（Showcase 结构 + GSAP/脚本引用）
  2) `content/projects.json`、`content/projects-data.js`（`showcase` 字段）
  3) `scroll-showcase.css`、`scroll-showcase.js`
  4) `vendor/gsap/gsap.min.js`、`vendor/gsap/ScrollTrigger.min.js`
  5) `_shots/scroll-experience/*`（报告截图）
- 工作区其它 `M/??` 文件（about/contact/works/cinis/pes/mova、editorial-refresh/home-polish/visual-refine/interaction-flow/project-motion/case-next/inner-bg）是为本地预览从远端 `3db30b0` **同步下来的现有文件**，不是本轮新增；同步时不要重复覆盖远端。
- `style.css` 的手动 tweak 保留未提交。

## 7. 遗留 / 建议
- CINIS/MOVA 案例页依旧很长（内容量决定）；本轮未改案例页。
- CINIS/MOVA 的 React 原型目前是外链入口，页面未 iframe 嵌入（避免双滚动）；未在本轮改动。
- Works 列表沿用现有 FLIP 筛选/页面转场，未加 pin（仅首页 Selected Works 使用 pinned showcase）。

## 8. Git / 部署
- **无 commit、无 push、无 Netlify 部署验证**（按本轮明确指示，交给 GPT 同步）。
