# VERTICAL RHYTHM REPORT — 纵向比例与滚动节奏精修

> Branch: `portfolio-redesign` · 项目目录 `experiments/art-direction/direction-b-modern-editorial` · 仅改该目录内 CSS/HTML 引用与本报告；**未改 CINIS/MOVA/PES 正文内容、品牌色、字体、全宽布局与交互逻辑**；工作区用户 `style.css` 改动保留未提交。
> 预览：`https://loquacious-maamoul-60291d.netlify.app/`（独立作品集站）· 按你的指示本轮**不推送/不验证 Netlify**，仅同步 GitHub 分支供预览。

## 1. 审计：修改前的问题
- `.sec` 全站固定 `padding:88px`，所有区块高度/停顿几乎一致，缺少“宽松→紧凑”的起伏。
- 首页 Hero 无最小高度，主标题视觉占比不足；Hero 到 Selected Works 的过渡靠默认流，节奏平。
- 作品列表 `wgrid` 底部 90px、卡片等距堆叠，展示高潮不足。
- 案例页 `.cs-marker` 固定 `margin:64px 0 28px`、`.cs-body` 固定 70px，阅读段停顿机械。
- About 的 `.about-block` 固定 42px、正文 16px 间距偏均质，缺少阅读连续性。
- Contact `padding:90px 0 60px` + `min-height:70vh`，桌面构图偏松、移动端空白偏多。
- 移动端多处沿用固定桌面间距，页面偏长、无意义空白较多。

## 2. 统一纵向 Token（新增 `rhythm.css`，全站最后引入）
| Token | 桌面（clamp） | 移动（≤640） |
|---|---|---|
| `--section-tight`（阅读） | 56–88px | 36–56px |
| `--section`（普通） | 72–112px | 40–64px |
| `--section-loose`（过渡） | 104–160px | 64–96px |
| `--section-showcase`（高潮） | 120–180px | 72–96px |
| `--title-gap`（标题→正文） | 20–32px | 16–24px |
| `--group-gap`（组内） | 16–24px | 12–20px |
| `--hero-min`（开场） | 640–920px / 88svh | `auto`（内容自适应，实测约 502px） |
- 全部使用 `clamp()` + CSS 变量；**不引入依赖、不改视觉系统**。

## 3. 逐页改动
**Home**
- Hero：`min-height: var(--hero-min)`（桌面 88svh≈792px、平板 70svh≈717px、移动自适应），`display:flex; justify-content:center`；收紧 `.hx-top/.hx-foot` 间距，标题成为视觉中心。
- Transition：`#work` 顶 `--section-loose`、底 `--section-showcase`；`feature` 内距收敛；`dup` 项目间拉开 `--space-3xl`。
- Reading：`#expertise` 用 `--section-tight` 压缩。
- Closing：`.cta` 上下用 `--section-loose` + 额外 `--space-m`，形成收尾。

**Works**
- 标题区 `works-hero` 缩短顶部、加大到筛选器间距（`--space-l`）；`wgrid` 用 `--space-l` 顶、`--section` 底（收回多余底部空白）、卡片间距 `clamp(28–44px)`。

**CINIS / MOVA / PES（案例）**
- `.cs-cover` 顶/底按 `clamp(48–84 / 32–56)`；`.cs-body` 顶 `clamp(40–64)`、底 `--section`。
- `.cs-marker` 段间 `clamp(44–76)`、标题下 `clamp(16–26)`；`.screens` 图组间距 `clamp(20–36)`；`.note` 文本块间距统一 `--space-s`。
- PES：`.pes-hero-shot / .pes-fig / .pes-split / .pes-steps` 的纵向节奏统一；未伪造内容、未拉大空区。

**About**
- Hero 收紧；`about-grid`/`about-flow` 间距收敛；`.about-body h2` 用 `--section-tight` + `--title-gap`；段落 `--group-gap`；`.about-block` 降为 `clamp(28–44)`；timeline 行距收紧。

**Contact**
- `padding` 改 `clamp(56–96 / 40–72)`；`min-height` 改 `clamp(420–620)`（移动端取消 min-height），标题/说明/按钮间距统一。

**全局**
- `.sec` 改用 `--section`；`.footer` 垂直 `--space-m`；不改变左右全宽布局与内部阅读网格。

## 4. 验证（真实浏览器，5 档视口）
| 页面 | 1440 高 | 1280 高 | 768 高 | 390 高 | 375 高 | 横向溢出 |
|---|---:|---:|---:|---:|---:|---|
| Home | 4114 | 3961 | 4707 | 3691 | 3687 | 全部无 |
| Works | 2183 | 2123 | 2153 | 1577 | 1551 | 全部无 |
| About | 2504 | 2470 | 2712 | 2951 | 2982 | 全部无 |
| Contact | 900 | 900 | 1024 | 844 | 844 | 全部无 |
| CINIS | 14330 | 14216 | 16770 | 17795 | 18158 | 全部无 |
| PES | 9669 | 9585 | 10222 | 9739 | 9796 | 全部无 |
| MOVA | 12209 | 12051 | 18392 | 15930 | 15903 | 全部无 |

- Hero 实测：桌面 792 / 平板 717 / 移动 502px。
- 导航、筛选（全部3 / UI-UX2 / 产品1）、作品链接、Aurora/Grainient、减少动态均未改动且正常。
- 移动端普遍**变短**（首页 3834→3690、About 3186→2951、MOVA 16035→15903），减少无意义空白；桌面因开场与展示停顿增强略增 3–5%，属节奏变化而非简单拉长。

## 5. 前后截图（`_shots/rhythm/`）
| 页面 | Before（1440 / 390） | After（1440 / 390） |
|---|---|---|
| Home | `before/BEF-home-desktop.png` 1440×3615 · `BEF-home-mobile.png` 390×3834 | `after/AFT-home-desktop.png` 1440×4114 · `AFT-home-mobile.png` 390×3690 |
| Works | `BEF-works-desktop.png` 1440×2106 · `BEF-works-mobile.png` 390×1609 | `AFT-works-desktop.png` 1440×2183 · `AFT-works-mobile.png` 390×1551 |
| About | 1440×2370 / 390×3186 | 1440×2504 / 390×2951 |
| Contact | 1440×900 / 390×844 | 1440×900 / 390×844 |
| CINIS | 1440×13684 / 390×18248 | 1440×14330 / 390×18158 |
| PES | 1440×9209 / 390×9864 | 1440×9669 / 390×9796 |
| MOVA | 1440×11704 / 390×16035 | 1440×12209 / 390×15903 |
- 额外：`after/AFT-home-768.png` 768×1024（平板首屏）。

## 6. 重要 CSS 改动
- 新增 `rhythm.css`（唯一新文件；所有页面 `style.css` 之后引入）。
- 7 个 HTML 加 `<link rel="stylesheet" href="rhythm.css">`（index/works/about/contact/cinis/pes/mova）。
- 无 JavaScript、无动效参数改动、无色彩/字体/布局宽度改动。

## 7. 仍存在的问题 / 建议
- **CINIS 页仍然很长**（17 个真实界面状态 + 展板），这是内容量决定，不是空白；若需再缩短，建议将部分状态图折叠为“更多状态”链接，而非删减证据。
- **PES** 的深度受真实素材限制（无工程测试/周期数据），未虚构；页面保持诚实标注。
- 当前 CINIS/MOVA 的 React 原型入口是**外链按钮**，页面未使用 iframe（避免双滚动/空白容器）。本轮按现状保留；若后续要“直接嵌入原型”，需确认 iframe 可访问性并单列设计。
- 375 小屏使用 emulation 检查无横向溢出；Chrome CLI 的 375px 截图有最小窗口裁剪伪影，未作为交付图。

## 8. 同步
- 本地代码提交：**`8d9cf0e`** `feat(layout): vertical rhythm & scroll narrative refinement`（rhythm.css、7 页引用、前后截图）。
- **远端同步（GitHub）**：因本机到 GitHub 的 git 传输持续被网络 `Connection reset` 阻断，改用已登录的 GitHub API，在**你远端提交 `3db30b0`（文案与全宽调整）之上**创建站点提交 **`9d8036f`**：新增 `rhythm.css` 并在 7 页注入引用；**未强推、未改 main、保留你的改动**。
- 远端 `portfolio-redesign` 已包含纵向节奏变更，可直接在 GitHub 预览；按你的要求**不做 Netlify 部署验证**。
- 工作区用户 `style.css` 手动改动保留未提交。
