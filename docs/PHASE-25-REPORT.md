# PHASE 25 REPORT — Hero 背景复核与打磨

> Branch: `portfolio-redesign` · 开始前 HEAD `6f122d8`。**仅改首页 Hero 背景相关文件与本报告；未改其他页面；未推送、未合并、未部署。**
> 工作区原有用户手动 tweak（`style.css`）**保留未覆盖**，本轮提交不含该文件。

## 1. 视觉决策
- **Aurora 保持默认**：继续采用 P24 的 CSS 柔光实现（冷白 / 淡薰衣草 / 浅蓝灰、低饱和、单层柔光）。经对比，官方 Aurora shader 移植后顶部出现偏灰硬带、偏离 P24 基准，因此**不切换**，保持已认可的观感（官方源码仍留档 `vendor/react-bits/Aurora.jsx`）。
- **Grainient 保留为可切换对比方案**，不与 Aurora 叠加。
- **颗粒下调**：`grainAmount` **0.045 → 0.028**。桌面复核干净感恢复，颗粒仅作纸面质感提示，不干扰标题与正文。

## 2. 视口与可读性
| 视口 | 结果 |
|---|---|
| 1440×900 | Aurora 顶部柔光、标题清晰；Grainient 浅色渐变+轻颗粒，文字与缩略图干净 |
| 390×844 | 标题按原设计三行换行正常；导航完整；背景切换控件位于右侧、不遮挡正文；`innerWidth=390 / scrollWidth=390 → 无横向溢出` |

## 3. 交互关闭状态（实测）
- `.hero-bg` `pointer-events: none`（背景层不拦截点击）。
- Aurora：`mouseInteraction=false`（CSS 实现本身不监听指针）。
- Grainient：`interactive=false`、`clickSwirl=false`；渲染器**无 pointer 监听**、stir/twirl 全零，无光标跟随与点击旋涡。
- 切换控件：`<button>` 原生可键盘操作（Tab/Enter/Space）；`tabIndex=0`；`aria-pressed` 与当前方案同步（点击 Grainient → data-bg=grainient 且 pressed=[false,true]；点回 Aurora 同步恢复）；`:focus-visible` 实显 `solid 2px rgb(101,82,214)`。

## 4. 减少动态 / 静态回退
- `prefers-reduced-motion: reduce`（已用 emulation 验证 `media=true`）：
  - Aurora：CSS 动画关闭，呈**静态径向渐变**（`auroraBg` 保留 radial-gradient，动画 none）。
  - Grainient：JS 检测到 reduce → **只渲染一帧静态画面并停止 rAF**，颗粒不再刷新。
- **WebGL 不可用回退**：`init*` 拿不到 WebGL2 时移除 canvas、不添加 `has-canvas` 类 → 显示 `hero-bg.css` 中的 **静态 CSS 渐变**，页面不空、不报错。

## 5. 方案对比（复核后）
- **Aurora（默认，推荐）**：顶部有方向性的柔光，最“透气/干净”，贴 Modern Editorial 的克制气质。
- **Grainient（替代）**：均匀浅色渐变 + 极轻颗粒，偏纸面/印刷质感；颗粒降至 .028 后不再抢标题。

## 6. 截图（实际尺寸）
| 方案 | 桌面 | 手机 |
|---|---|---|
| Aurora | `_shots/P25-aurora-desktop.png`（**1440×900**） | `_shots/P25-aurora-mobile.png`（**390×844**） |
| Grainient | `_shots/P25-grainient-desktop.png`（**1440×900**） | `_shots/P25-grainient-mobile.png`（**390×844**） |

## 7. 改动文件
- `experiments/art-direction/direction-b-modern-editorial/hero-bg-canvas.js`（Grainient `grainAmount .045→.028`；Aurora 保持 CSS 基线，不挂载 shader）
- `experiments/art-direction/direction-b-modern-editorial/rb-shaders.js`（修正 Aurora shader 的模板占位符，使官方 shader 可编译备用；当前不启用）
- `docs/PHASE-25-REPORT.md`（本文件）
- 截图：`_shots/P25-aurora-{desktop,mobile}.png`、`_shots/P25-grainient-{desktop,mobile}.png`
- **未改** `index.html` / `hero-bg.css` / `hero-bg.js`（P24 结构沿用）。

## 8. 依赖
- **未新增任何依赖**（无 npm 包、无构建步骤；Grainient 仍为官方 registry shader 的 vanilla 移植）。

## 9. Git
- 提交见本轮（`feat(hero): Phase 25 refine Grainient grain + verify hero a11y/fallback`），仅 `portfolio-redesign`；未推送。
