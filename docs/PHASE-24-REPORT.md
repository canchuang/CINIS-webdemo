# PHASE 24 REPORT — Hero 背景方案对比（Aurora / Grainient）

> Branch: `portfolio-redesign`。**仅改首页 Hero 与新增背景组件/样式；未改 About/作品/案例/导航/字体/品牌色；未推送、未合并、未部署。**
> 备注：工作区原有用户手动 tweak（`style.css`）保留未覆盖，本轮提交不含该文件。

## 1. 技术决策（是否新增依赖）
- React Bits 的 Aurora / Grainient 是 **React + WebGL2 组件**；本作品集原型是**静态 HTML/CSS/JS**，无 React 运行时。
- 已实际尝试 `npx shadcn@latest add @react-bits/Grainient-JS-CSS`（及 Aurora 同款指令）：CLI 需要 React 工程 `components.json`，在静态原型目录中无法完成（挂起/不产出）。
- 因此**直接读取 React Bits registry 的官方源码**，把其中的 **WebGL shader 原样移植**为无依赖的 vanilla 模块；原始 JSX 存于 `vendor/react-bits/` 供参考。
- **未新增任何 npm 依赖**；无构建步骤。

## 2. 位置与切换
- **Aurora = 首页 Hero 默认方案**（浅色、低饱和、单层柔光，从顶部展开）。
- **Grainient = 同一 Hero 的替代方案**，与 Aurora **互斥**（不叠加）；仅在首页生效。
- Hero 右上角提供简洁切换：`背景 · [Aurora] [Grainient]`，默认 Aurora，`aria-pressed` 同步。

## 3. 动效参数与交互关闭
| 项 | Aurora | Grainient |
|---|---|---|
| 模式 | lightMode | lightMode |
| 配色 | #E6E0FB / #D9E6F6 / #F1F4FA（淡薰衣草·浅蓝灰·冷白） | #F4F6FA / #E8EFF8 / #EFEAFB / #E3ECF7 |
| 强度 | amplitude .55 · glow .45 · brightness .9 · opacity .6 | contrast .92 · saturation .55 |
| 速度/流动 | speed .2 | speed .2 · flow .45 |
| 高度/层 | height .33 · layers 1（单层） | — |
| 颗粒 | 无 | grainAmount .045 · grainSize 1.1 · grainAnimated（低速） |
| 交互 | **mouseInteraction=false**（无光标跟随） | **interactive=false**、**clickSwirl=false**（无拖拽扰动、无点击旋涡） |
- 背景层 `z-index:0; pointer-events:none`，Hero 内容 `z-index:2`；导航/标题/主视觉/作品缩略图均在背景之上，可读性不受影响。

## 4. 减少动态 / 移动端
- `prefers-reduced-motion: reduce`：CSS 静态渐变；JS 检测到 reduce 时**只渲染一帧静态画面并停止 rAF**，颗粒覆盖禁用。
- 移动端：渲染 DPR 上限 1.25、Aurora 模糊降低；仅**当前方案**持续绘制，另一方案暂停 rAF（节省 GPU）；内容区 `scrollWidth=390 / innerWidth=390 → 无横向溢出`。

## 5. 方案对比说明
- **Aurora（推荐默认）**：顶部柔和光晕、有方向性的氛围光，标题区更“透气”，干扰最低，最贴 Modern Editorial 的克制气质。
- **Grainient**：均匀的浅色渐变 + 细腻颗粒，画面更像纸面/印刷质感，纹理更明显；作为替代方案，适合想要更强材质感时使用。
- 两者都保持浅底、无强对比、无光标交互，不影响标题可读性。

## 6. 截图（1440×900 / 390×844）
- Aurora 桌面 `_shots/P24-aurora-desktop.png` · 手机 `P24-aurora-mobile.png`
- Grainient 桌面 `_shots/P24-grainient-desktop.png` · 手机 `P24-grainient-mobile.png`

## 7. 改动文件
- `index.html`（Hero 内新增背景层、切换控件、脚本引用）
- `hero-bg.css`（两方案样式、切换控件、reduced-motion、移动端、canvas 规则）
- `hero-bg.js`（Aurora/Grainient 切换，无光标交互）
- `rb-shaders.js`（官方 registry shader 常量，原样移植）
- `hero-bg-canvas.js`（vanilla WebGL 渲染器；交互关闭、浅色、低速、reduced-motion 静态）
- `vendor/react-bits/Aurora.jsx`、`vendor/react-bits/Grainient.jsx`（官方源码留档）
- `docs/PHASE-24-REPORT.md`（本文件）
- 截图：`_shots/P24-{aurora,grainient}-{desktop,mobile}.png`

## 8. 说明
- 若后续需要“原封不动的 React Bits 组件”，需将作品集迁移/嵌入 React 构建；当前静态原型以**官方 shader 的 vanilla 移植**实现同等视觉效果且零依赖。

## 9. Git
- 提交见本轮（`feat(hero): Phase 24 Aurora/Grainient background comparison`），仅 `portfolio-redesign`；未推送。
