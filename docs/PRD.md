# 产品需求文档（PRD）— 个人设计作品集网站

> **Personal Design Portfolio · Product Requirements Document**

---

## 文档状态（Document Status）

| 项 | 内容 |
|---|---|
| 文档阶段 | **Phase 01 · 文档阶段（Documentation）** |
| 交付状态 | 尚未构建任何页面；本文件为需求与方向定义，不含实现 |
| 代码仓库状态 | ✅ **已确认（2026-11-19 更新）**：Netlify 站点 `cinis.netlify.app` 已绑定 GitHub 仓库 `canchuang/CINIS-webdemo`，生产分支 `main`（生产部署 commit `cb91106`）。拟从 `main` 创建开发分支 `portfolio-redesign`（Rule A）。**尚未创建分支、未改动 `main`/`gh-pages`、未部署。** |
| 素材状态 | CINIS 具备较完整素材并已本地备份（`assets/source/CINIS-webdemo`，见 `ASSET-BACKUP-MANIFEST.md`）；**Portable Energy Storage / MOVA 素材全部 MISSING（待提供）** |
| 信息来源 | ① `canchuang/CINIS-webdemo` 的 GitHub 审计；② ReactBits 与 Transitions.dev 的视觉/动效参考评审；③ 工作区既有文档 `DESIGN-DIRECTION.md`、`ASSET-INVENTORY.md`、`TECH-AUDIT.md`、`OPEN-QUESTIONS.md` |
| 写作原则 | **不虚构**：项目成果、奖项、用户测试数据、指标、个人履历一律不编造；凡未确认内容一律标注 **TODO** |

> **给读者的提示**：本文档中的时长、断点、性能阈值、技术选型等数值均为**建议值（proposal）**，需在真实内容与真实素材到位后校准。凡标记 **TODO** 者，均代表待用户确认或待素材补充。

---

## 1. 项目背景（Project Background）

### 1.1 缘起

`canchuang` 是一位 UI/UX 与产品设计师。现有可公开展示的材料高度集中在单一项目 **CINIS**（一个可运行的 23 屏 React 原型 + Figma 导出的插画/矢量资产），另有 **Portable Energy Storage**（工业/产品设计）与 **MOVA**（电影票务与观影体验产品）两个设计项目，但目前**尚无任何可检索的素材或源码**。

一位设计师的作品集，其存在意义不止于"罗列项目"，而是**以作品本身证明设计能力**。因此本项目的第一性目标是：

> **让网站本身成为一件作品（The site must BE a work of design）。**

### 1.2 问题陈述

- 现有材料碎片化（一个项目的资产散落在 Figma 导出、原型仓库、设计稿之间）。
- 传统简历式排版无法体现"实验性艺术指导 / 编辑设计 / 字体驱动 / 创意交互"的能力。
- 两个项目（PES、MOVA）素材缺失，若强行展示会变成空壳或虚构，需以诚实的叙事策略处理。

### 1.3 项目边界

- 仅展示**恰好三个**核心项目：**CINIS**、**Portable Energy Storage（PES）**、**MOVA**。
- **Smart Home Icon System 被明确禁止**出现在任何页面、卡片或分类中（项目授权规定）。
- 不新增第四个项目；不展示未经用户确认的个人信息。

---

## 2. 产品定位（Product Positioning）

### 2.1 一句话定位

> **一份以编辑设计与字体实验为主张的、可交互的个人设计作品集**——它不描述设计师，它*演示*设计师。

### 2.2 定位维度

| 维度 | 定位 |
|---|---|
| 品类 | Personal Design Portfolio（个人设计作品集网站） |
| 气质 | Editorial / Experimental / Typographic / Kinetic / Tactile |
| 对标而非复制 | ReactBits、Transitions.dev 的"动效语义"与交互品质，而非模板化简历 |
| 与"简历站"的区别 | 简历站是**信息容器**；本站是**被设计过的对象**，排版与动效承担叙事 |
| 观众的第一印象 | "这个人是会做设计的人"，而非"这个人都做过什么" |

### 2.3 非目标（Non-goals）

- 不是博客 / CMS 内容平台。
- 不是 UI 组件库或模板市场。
- 不追求信息密度，不堆砌项目数量；**少而精**。

---

## 3. 目标用户（Target Users）

| 用户类型 | 画像 | 核心诉求 | 关键场景 |
|---|---|---|---|
| **招聘方 / HR** | 设计团队 lead、产品设计招聘 | 30 秒内判断水准与方向匹配度 | 快速扫过首页与作品卡，点开 1–2 个 case study |
| **同行设计师** | UI/UX、品牌、动效设计师 | 看设计思考、看工艺细节、看交互 | 深读 case study 叙事、体验原型 |
| **潜在客户 / 合作方** | 创业团队、外包需求方 | 判断能否交付、风格是否契合 | 查看能力覆盖（UI/UX + 工业设计）与联系方式 |
| **设计社区 / 随机访客** | Dribbble/Behance/X 引流 | 感受审美与个性 | 停留在首页的强视觉与动效上 |

### 3.1 用户旅程假设（非实测，标注为假设）

> **TODO（待用户测试验证）**：以下为设计假设，非真实用户研究数据，禁止当作已验证结论引用。

- 招聘方：Home → Works → CINIS Case Study → Contact，预期 2–4 分钟。
- 同行：Home → 深读 1 个 case study（含原型）→ About，预期 5–8 分钟。

---

## 4. 产品目标（Product Goals）

### 4.1 定性目标

1. 网站本身即为设计能力的证明（"作品即简历"）。
2. 三个项目的呈现**层级清晰、叙事完整、质感统一**。
3. 动效克制、服务叙事，不喧宾夺主。
4. 对素材缺口诚实处理，不虚构、不注水。

### 4.2 可衡量的成功信号（指标为**待定义**，不虚构具体数值）

| 目标 | 建议衡量方式 | 状态 |
|---|---|---|
| 首屏强记忆点 | 首页停留时长 / 首个 case study 点击率 | **TODO** — 需接入分析后定义目标值 |
| Case study 可读性 | 平均阅读深度 / 原型体验点击率 | **TODO** |
| 联系转化 | Contact 页邮件点击 / 表单提交 | **TODO** |
| 技术质量 | Core Web Vitals 达标（见 §17） | 阈值见 §17 |

> **规则**：本文档不撰写任何未经测量的成绩数字；所有指标目标值标记 TODO，待上线后基于真实数据设定。

---

## 5. 设计理念（Design Philosophy）

### 5.1 北极星（North Star）

> **The site must read as a designed object, not a résumé page.** —— 编辑级字体领衔；动效服务叙事；不对称是结构性的，而非装饰性的。克制胜于炫技：每一个动画都必须通过"澄清层级或状态"来挣得其存在。

### 5.2 六条主张

1. **Editorial 编辑性** —— 杂志级字阶、超大展示标题、留白与页码/题注体系。
2. **Asymmetric 不对称** —— 偏移网格、刻意的失衡、叠加平面；严格基线之上做有意破格。
3. **Typographic 字体驱动** —— 字体*即*图像；超大可变字型、展示级紧行距、标签级宽字距。
4. **Kinetic 动态** —— 动效绑定阅读顺序与滚动，而非环境噪音。
5. **Tactile 质感** —— 轻微噪点/颗粒，墨黑 + 纸白基底，单一信号强调色。
6. **Systematic 系统性** —— 实验性表皮之下，是一套真实的 token 系统（色/字/间距/动效）。

### 5.3 设计约束（不可妥协）

- **禁止 `transition: all`**；只动画显式声明的属性。
- 优先 `transform` + `opacity`（GPU 友好），目标 60fps。
- 每个交互面**只保留一个**招牌效果（不在同一卡片叠加 tilt + glare + parallax + shader）。
- **Hover ≠ Focus**：键盘用户获得等价反馈，不依赖指针专有效果。
- 完整尊重 `prefers-reduced-motion`。

---

## 6. 视觉设计方向（Visual Design Direction）

### 6.1 关键词（主 → 辅）

Editorial → Asymmetric → Typographic → Kinetic → Tactile → Systematic。

### 6.2 字体方向（**TODO：需确认字族与授权预算**）

| 用途 | 方向 | 候选（待授权确认） |
|---|---|---|
| Display 展示 | 高对比编辑衬线 / 表现力强的 grotesk | PP Editorial New · Instrument Serif · GT Alpina · Söhne Breit |
| Body / UI 正文 | 中性高可读 grotesk | Inter · Söhne · ABC Diatype |
| Mono / 标签 | 功能性等宽 | JetBrains Mono · IBM Plex Mono |

- 字阶采用模块化、视口流体 `clamp()`；展示级可超过 8–12vw。
- 展示级紧行距（−0.02 ~ −0.04em），小标签宽字距（+0.08em）。
- **TODO（Q7）**：最终字族 + 授权（付费是否可接受 / 是否仅限开源）。

### 6.3 色彩方向（**TODO：完整色板与 AA/AAA 对比度校验**）

| 角色 | 方向 |
|---|---|
| 基底 | 墨黑（ink）× 纸白（paper），编辑感；冷暖温度待定（TODO） |
| 信号强调色 | 单一强调色（电光/酸性/朱红——TODO 选定），仅用于状态与强调 |
| 项目专属色 | 仅*在各自 case study 内*使用：CINIS 冷蓝、PES 技术石墨、MOVA 影院深红；**永不全局化** |
| 质感 | 极轻微胶片颗粒叠加（低透明度） |

### 6.4 网格方向

- 桌面：**12 栏不对称编辑网格**，内容故意偏移（正文占 3–9 栏，图片出血至边缘），基线网格控制垂直韵律，段落之间用满幅色带 reset 视线。
- 移动：单栏 + 有意满幅图片 + 超大字体，层级与桌面一致（不做"随意塌陷"）。
- **TODO**：构建时锁定精确 gutter / margin token。

### 6.5 参考评审（ReactBits / Transitions.dev）

| 来源 | 取其什么 | 采纳规则 |
|---|---|---|
| **ReactBits** | Text Animations、Backgrounds（Soft Aurora/Grainient/Noise）、Tilted Card、Glare Hover 等 | 复制源码入仓（不做运行时 CDN 依赖）；逐组件核对许可（免费 vs Pro）；提供 CSS-only 静态回退 |
| **Transitions.dev** | 动效**原则与时值**，非整份复制付费实现：origin-aware 开合、tooltip「延迟进/立即出」、逐行偏移 stagger、pill indicator | Pro 项一律自研等价实现 |
| **明确拒绝** | Glitch Text、ASCII Text、CRT Warp、Hyperspeed、粒子文字等 | 过于喧闹，与编辑气质冲突 |

### 6.6 情绪板计划（**TODO**）

- 探索 2–3 个 hero 方向：(a) 黑白字体主导 + 颗粒；(b) 双色调强调 + 超大衬线；(c) 单色 + 单一动态渐变带。
- **先出静态稿再决定是否上 shader**，避免"由动效倒推设计"。
- **TODO**：Phase 04 规划阶段产出视觉情绪板。

---

## 7. 网站信息架构（Information Architecture）

### 7.1 顶层结构

```
/  (HOME)
├── /works                      (WORKS · 作品索引)
│    ├── /works/cinis           (CASE STUDY)
│    ├── /works/portable-energy-storage  (CASE STUDY · TODO 内容)
│    └── /works/mova            (CASE STUDY · TODO 内容)
├── /about                      (ABOUT · 关于)
└── /contact                    (CONTACT · 联系)
```

| 页面 | 路由 | 角色 | 备注 |
|---|---|---|---|
| HOME | `/` | 第一印象、强视觉、引导进入作品 | 动效最克制但最有记忆点 |
| WORKS | `/works` | 项目索引 / 分类筛选 | 仅 3 个项目 |
| CASE STUDY | `/works/:slug` | 深度叙事 | 统一 12 段式模板（见 §7.2） |
| ABOUT | `/about` | 编辑级长文、个人主张 | **个人信息待提供（TODO）** |
| CONTACT | `/contact` | 邮件 + 社交入口 | 链接待确认（TODO） |

### 7.2 Case Study 叙事顺序（12 段式，所有项目共用，按项目裁剪内容）

> 以下为 **case-study-ready** 的标准叙事骨架，顺序固定以保证阅读一致性：

| 序号 | 段落 | 作用 |
|---|---|---|
| 1 | **Cover** 封面 | 项目名 + 一句话定位 + hero 视觉 |
| 2 | **Overview** 概览 | 项目速览：角色、类型、周期（TODO，待用户确认） |
| 3 | **Background** 背景 | 项目缘起与语境 |
| 4 | **Problem** 问题 | 要解决的核心问题 |
| 5 | **Research** 研究 | 用户/场景/竞品研究 |
| 6 | **Strategy** 策略 | 设计策略与方向决策 |
| 7 | **Information Architecture** 信息架构 | 站点/产品结构图 |
| 8 | **User Flow** 用户流程 | 关键流程路径图 |
| 9 | **Design Process** 设计过程 | 迭代、探索、取舍 |
| 10 | **Visual Design** 视觉设计 | 设计系统 + 高保真 UI |
| 11 | **Final Outcome** 最终呈现 | 成品/原型演示 |
| 12 | **Reflection** 反思 | 复盘（**不虚构成果数据**） |

> 每一段可对某项目"不适用/暂无素材"而暂缺，但**必须显式标注 TODO，不得以虚构内容填空**。

---

## 8. 页面功能需求（Page Functional Requirements）

### 8.1 HOME `/`

**目标**：在 5 秒内建立"这是会做设计的人"的认知。

| 组件 | 行为 / 要求 |
|---|---|
| Hero 区 | 超大展示标题 + 分字/分行动画（stagger 60–90ms/行，最多 4 行）；背景可为极轻颗粒/渐变（reduced-motion 下静态） |
| 身份一行 | 一行极简自我介绍（**文案 TODO**） |
| Featured Projects | 3 个作品卡的**不对称编辑网格**；卡片 tilt/glare 之一（不叠加） |
| 滚动引导 | 一处分段滚动揭示，绑定阅读顺序 |
| 页脚导航 | 指向 Works / About / Contact |

### 8.2 WORKS `/works`

| 组件 | 行为 / 要求 |
|---|---|
| 标题区 | 大字号 "WORKS" + 索引计数（如 "03 Projects"） |
| 分类筛选 | 分类 pill：All / UI·UX / Product·Industrial；**滑动的 pill indicator**（Transitions.dev 语义，`dur-3`） |
| 项目列表 | 每卡：封面、项目名、类别、年份（TODO）、一句话；hover 揭示题注 |
| 空态/加载 | 若某项目素材缺失，卡片显示 "素材待补充 / Coming soon" 状态，**不隐藏、不虚构** |

### 8.3 CASE STUDY `/works/:slug`

| 组件 | 行为 / 要求 |
|---|---|
| 章节导航 | 桌面右侧 sticky 章节标签；当前章节高亮（scroll-spy） |
| 内容块 | 12 段式结构（§7.2）；文本块 + 图文块 + 全幅图 + 演示块 |
| 图注系统 | 每图具备题注（folio/caption），编辑感 |
| 原型演示 | CINIS 可 iframe 嵌入手机壳或外链（**TODO Q4：外链 vs 内嵌**） |
| 段落动效 | 标题逐行 reveal、图片适度 parallax（≤8px）、skeleton→content 交叉淡入 |
| 上/下一篇 | 底部指向下一个 case study |

### 8.4 ABOUT `/about`

| 组件 | 行为 / 要求 |
|---|---|
| 长文排版 | 编辑级正文排版，阅读节奏优先 |
| 主张段落 | 设计理念文（**TODO：待用户提供文案**） |
| 技能/领域 | 以排版化列表呈现（不做进度条式的假精确） |
| 履历 | **禁止虚构**；若未提供则整段标注 TODO 或省略 |

### 8.5 CONTACT `/contact`

| 组件 | 行为 / 要求 |
|---|---|
| 主入口 | 大号 Email CTA（hover 下划线描画） |
| 社交链接 | Behance / Dribbble / LinkedIn / X 等（**链接 TODO，待确认**） |
| 简历链接 | 状态为 **待确认（TODO）** |
| 表单（可选） | 若采用需后端或第三方服务；**默认仅邮件轻量方案**（待确认） |

### 8.6 全局组件

| 组件 | 要求 |
|---|---|
| 导航栏 | 固定/半固定，导航下划线 hover 描画（`dur-2`），键盘 focus ring |
| 路由过渡 | fade + translateY 16px，`dur-page`；focus 移至新页 h1 |
| 页脚 | 版权、社交、回到顶部 |
| 颗粒叠层 | 极轻 Noise 叠加（性能友好，red-motion 关闭） |

---

## 9. 项目详情页叙事逻辑（Case-Study Narrative Logic）

### 9.1 CINIS — UI/UX Design · Product Design

**一句话**：一款"游戏化自律"产品（chibi 游戏美术、三种模式：旅者 / 骑士 / 深渊、魂火成长体系）。

**必备叙事板块（must cover）**：

| 板块 | 内容要求 | 素材状态 |
|---|---|---|
| 产品定位 | 游戏化自律的价值主张 | 文案 **MISSING（TODO，可从 `content.ts` 与原型授权撰写）** |
| 三模式机制 | 旅者/骑士/深渊 机制差异与切换 | 图/文 **MISSING**，可据原型撰写 |
| 信息架构 | 产品结构图 | **MISSING（需绘制）** |
| 用户流程 | 主链路流程图 | **MISSING（需绘制）** |
| 交互逻辑 | 关键交互说明 | **MISSING（可从代码推导）** |
| 魂火成长体系 | 成长路径/里程碑可视化 | **READY** — `growth-scene.png`（已确认优秀） |
| UI 设计系统 | 色彩/字/间距/组件规范页 | **MISSING（可从 tokens 提取，NEEDS-PROCESSING）** |
| 高保真 UI | 23 屏 hi-fi 展示 | **READY（需截图处理）** — 可在 Phase 04 以 390×844、2× 截取 |
| 原型演示 | 可运行原型 | **READY** — `https://canchuang.github.io/CINIS-webdemo/` |

**核心资产**：Figma 导出清单 `public/assets/assets.json`（45 项：17 图 + 28 矢量）；角色插画（traveler/knight/abyss、settle、rest、badge 等）为高质量 2× 透明 PNG，**READY**。

### 9.2 Portable Energy Storage（PES）— Product Design · Industrial Design

**一句话**：模块化户外便携储能设备。

**必备叙事板块**：

| 板块 | 内容要求 | 素材状态 |
|---|---|---|
| 用户与场景研究 | 访谈/persona/场景 | **MISSING（TODO）** |
| 产品功能分析 | 功能拆解 | **MISSING（TODO）** |
| 模块化设计 | 模块拆分图 | **MISSING（TODO）** |
| 产品结构方案 | 结构/爆炸视图 | **MISSING（TODO）** |
| 外观设计 | 形态/造型渲染 | **MISSING（TODO）— 封面最高优先** |
| 最终设计呈现 | final hero render | **MISSING（TODO）** |

> **全部 MISSING。** 需用户提供源文件（渲染图、过程板、研究文档）至 `assets/source/portable-energy-storage/`，或提供 Drive/Figma/Behance 链接 → **OPEN-QUESTION Q3**。

### 9.3 MOVA — UI/UX Design

**一句话**：电影票务与观影体验产品。

**必备叙事板块**：

| 板块 | 内容要求 | 素材状态 |
|---|---|---|
| 产品定位 | 价值主张 | **MISSING（TODO）** |
| 竞品分析 | 竞品对比 | **MISSING（TODO）** |
| 信息架构 | 结构图 | **MISSING（TODO）** |
| 票务流程 | 购票主流程 | **MISSING（TODO）** |
| 选座交互 | 选座设计 + 多状态 | **MISSING（TODO）— 招牌交互** |
| 高保真 UI | hi-fi 屏 | **MISSING（TODO）** |
| 原型演示 | Figma/live 原型 | **MISSING（TODO）** |

> **全部 MISSING。** 需用户提供 Figma 链接 + 导出屏 + 原型 URL → **OPEN-QUESTION Q4**。

---

## 10. 交互需求（Interaction Requirements）

### 10.1 核心交互清单

| 交互 | 位置 | 规格 |
|---|---|---|
| 卡片 tilt/glare | WORKS 与 HOME | 指针倾斜 **≤6°**，spring 阻尼收敛；**键盘无 tilt**，改用 focus ring + lift |
| 导航下划线 | 全局 nav | L→R 描画 `dur-2`；focus 时下划线常驻 |
| 分类 pill indicator | WORKS | 指示器随激活项滑动 `dur-3`；origin-aware |
| 逐行文字 reveal | Hero / 章节标题 | 每行 60–90ms stagger，最多 4 行；不延迟内容 >250ms |
| 图片 parallax | Case study | 位移 **≤8px**，reduced-motion 下禁用 |
| 路由过渡 | 所有页面切换 | fade + rise `dur-page`；焦点移至 h1 |
| Tooltip | 若有 | **延迟进、立即出** |
| 折叠/手风琴 | 若用于 FAQ/细节 | grid-rows 高度 morph + chevron 变形（唯一允许动 layout 的场景） |
| 图注揭示 | 项目卡/图上 | hover 时题注淡入；focus 同样触发 |

### 10.2 交互规则

- 动效**可中断**，不阻塞输入。
- 指针专有效果在触摸设备与键盘下**自动降级**。
- 同一面只有一个招牌效果（不同时叠加 tilt+glare+parallax+shader）。

---

## 11. Motion Design 规范（Motion Spec）

> 所有数值为**建议值（proposal）**，需在构建时按真实内容密度校准（TODO）。

### 11.1 时长 token

| Token | 值 | 用途 |
|---|---|---|
| `dur-1` | 120 ms | 微观：hover 变色、图标态 |
| `dur-2` | 200 ms | UI：tooltip 进、按钮按下、链接下划线 |
| `dur-3` | 320 ms | 组件：卡片抬起、tab indicator、下拉 |
| `dur-4` | 480 ms | 强调：逐行文字 reveal、页面元素 |
| `dur-5` | 700 ms | Hero 入场、章节 stagger 容器 |
| `dur-page` | 520 ms | 路由/页面过渡 |

### 11.2 缓动 token

| Token | cubic-bezier | 性格 |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | 默认 UI |
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | 入场、揭示 |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | 往返变换 |
| `ease-spring-soft` | spring（stiffness≈180, damping≈22） | 卡片/tilt 收敛 |

### 11.3 Stagger / Delay

- 文字逐行：**60–90 ms/行**（≤4 行）。
- 网格项：**40–70 ms** stagger（≤8 项后截断）。
- 内容进入视口后延迟 **不超过约 250 ms**。

### 11.4 状态模型（enter / exit / hover / focus）

| 元素 | Enter | Exit | Hover | Focus |
|---|---|---|---|---|
| 卡片 | fade + 12px 升 + 0.98→1 缩放（`dur-4`, `ease-out-expo`） | fade out `dur-2` | tilt ≤6°、glare 跟随指针、阴影抬升 | **2px 可见 focus ring**，同抬升，键盘无 tilt |
| 导航链接 | — | — | 下划线 L→R `dur-2` | focus ring；下划线常驻 |
| 项目封面 | 揭示时图 1→1.04（`dur-5`） | 复位 `dur-3` | glare/spotlight + 可选 parallax ≤8px | focus ring，题注揭示 |
| 页面过渡 | 内容 fade + translateY 16px 进（`dur-page`） | fade out | — | 焦点移至页 h1 |

### 11.5 Reduced-motion（`prefers-reduced-motion: reduce`）

- 关闭：parallax、tilt、自动播放、背景 shader。
- 仅保留 ≤120ms 的即时淡入；**无 stagger 延迟**；**无滚动劫持**。

### 11.6 硬性规则

- **禁止 `transition: all`**；仅动画 `transform / opacity / filter / clip-path / color / border-color`。
- 不动画造成 layout thrash 的属性（`width/height/top/left`），唯一例外是以 `grid-template-rows` 的 morph 实现手风琴。
- 优先 `transform` + `opacity`；目标 60fps。

---

## 12. 响应式设计（Responsive Design）

### 12.1 断点（建议值，TODO 校准）

| 名称 | 范围 | 主要变化 |
|---|---|---|
| `sm` Mobile | < 640px | 单栏、满幅图、超大字体、底部导航简化 |
| `md` Tablet | 640–1024px | 单栏偏宽，图片出血 |
| `lg` Laptop | 1024–1440px | 12 栏不对称网格启用 |
| `xl` Desktop | ≥ 1440px | 全 12 栏 + 最大内容宽度约束 + 更激进不对称 |

### 12.2 网格与一致性

- 桌面：12 栏不对称编辑网格（正文占 3–9 栏，图片出血）。
- 移动：单栏，但**层级与阅读顺序与桌面一致**（不因断点改变叙事顺序）。
- 图片比例在各断点保持一致，避免"任意塌陷"。

### 12.3 移动/桌面一致性规则

- 相同的阅读顺序与叙事结构。
- 动效在移动端降级（无 hover，tilt 关闭，仅保留 reveal）。
- 触摸目标 ≥ 44×44px。

---

## 13. 技术栈（Tech Stack）— **提案 / PROPOSAL（TODO 确认）**

> **重要**：以下为**提议**的技术选型，尚未构建、尚未落地。仓库已确认（Round 2：`CINIS-webdemo` ↔ Netlify `cinis.netlify.app`，Rule A），但技术栈仍为提案，需在实现前确认（TODO）。

| 层 | 提议选型 | 理由 |
|---|---|---|
| 框架 | **React + TypeScript + Vite**（或 Next.js，视 SEO/SSG 需求定） | 与 CINIS 技术栈同源、团队熟悉；Vite 构建快 |
| 路由 | 真实路由库（**React Router** 或 Next 文件路由） | CINIS 的 hash 手动路由过简，不适合多页 |
| 样式 | **CSS Modules + CSS 自定义属性（token 系统）** | 已有 token 模式可借鉴；**不引入 Tailwind** |
| 动效 | 原生 CSS transition/animation + 轻量 JS（IntersectionObserver）；可选自研或复制 ReactBits 源码 | 可中断、可降级；无运行时重依赖 |
| 字体 | 自托管 WOFF2（视授权，TODO） | 性能 + 授权可控 |
| 包管理 | pnpm | 与现有仓库一致 |
| 部署 | Netlify（提案，见 §18） | deploy previews 工作流 |

### 13.1 明确声明

- **不因本项目新增 Tailwind、UI 组件库或图标库**（除非用户明确要求）。
- **不复制 CINIS 的游戏色板**；token 仅作参考。
- 不将 `CINIS-webdemo` 当作作品集代码库——它只是项目素材源。
- **TODO（Q1）**：确认真实仓库后锁定最终栈。

---

## 14. 图片与素材管理（Image & Asset Management）

### 14.1 素材来源与状态

| 项目 | 来源 | 状态 |
|---|---|---|
| **CINIS** | Figma 导出清单 `public/assets/assets.json`（45 项：17 图 + 28 矢量）+ 仓库完整备份 `assets/source/CINIS-webdemo`（66 文件 / 4.86 MB，已哈希）；React 原型；live demo（Netlify + GitHub Pages） | 多数 **READY**；部分 **NEEDS-PROCESSING**（2 张 PNG 需重裁、23 屏需截图处理）；叙事素材 **MISSING** |
| **Portable Energy Storage** | 无 | **全部 MISSING（TODO）** |
| **MOVA** | 无 | **全部 MISSING（TODO）** |

### 14.2 组织约定（已按用户建议落地骨架）

```
assets/
├── projects/                     # 作品集用（处理后产物）
│   ├── cinis/
│   │   ├── characters/           # 角色插画（旅者/骑士/深渊）
│   │   ├── screens/              # 23 屏 hi-fi 界面截图（待采集处理）
│   │   ├── illustrations/        # 场景/结算/成长等插画
│   │   ├── icons/                # 导航/tab/矢量图标
│   │   ├── growth-system/        # 魂火成长体系视觉
│   │   ├── interaction/          # 交互状态/动效素材
│   │   └── content/              # 文案与说明（源自 content.ts / 原型）
│   ├── portable-energy-storage/  # 待用户投放（TODO）
│   └── mova/                     # 待用户投放（TODO）
└── source/                       # 原始素材（只读，永不改动）
    ├── CINIS-webdemo/            # 已 clone 的完整仓库备份（含 public/assets 全部 66 文件）
    └── cinis-assets-hashes.csv   # sha256 + 字节数 清单
```

> 上述 `assets/projects/cinis/*` 骨架目录已创建（空目录待后续处理产物填充）；`assets/source/CINIS-webdemo` 为只读原始备份。完整清单见 `docs/ASSET-BACKUP-MANIFEST.md`。

### 14.3 处理规则

- **原始素材永不修改**；处理后的图片**另存**到 `assets/projects/cinis/*`，不得覆盖 `assets/source/**` 原件。
- 图片格式：优先 AVIF/WebP，回退 JPEG/PNG；响应式 `srcset` + 尺寸标注。
- 透明 PNG（CINIS 角色插画）保留 alpha，注意 2× 高清与按需缩放。
- **TODO**：PES/MOVA 素材到位后补全清单；确认所有素材的使用许可（假定用户自有，仍需确认）。

### 14.4 素材缺口即产品缺口（诚实原则）

- 缺失素材的 case study 卡片显示 "Coming soon / 素材待补充" 状态。
- 不以占位图冒充成品渲染；不以虚构叙事填补。

---

## 15. SEO

### 15.1 基础

| 项 | 要求 |
|---|---|
| `<title>` | 每页唯一，含项目名与身份关键词 |
| `<meta name="description">` | 每页唯一，120–160 字符 |
| 语义化 HTML | 正确使用 `header/nav/main/article/section/footer`、层级化 `<h1>–<h3>` |
| Open Graph / Twitter Card | 每个 case study 提供分享图（用其 hero 视觉） |
| `sitemap.xml` | 自动生成，覆盖 `/`、`/works`、3 个 case study、`/about`、`/contact` |
| `robots.txt` | 允许索引；排除草稿（若有） |
| Canonical | 每页自指 canonical |
| 结构化数据 | `Person` + `CreativeWork`（每个项目）Schema.org JSON-LD |

### 15.2 渲染策略（取决于栈）

- 若选 Next.js：SSG/ISR，利于 SEO 与首屏。
- 若选 Vite SPA：需预渲染或静态生成关键路由（**TODO 随栈确认**）。

> **TODO**：确认站点主语言（中文/英文/双语，Q10），影响 hreflang 与文案工作量。

---

## 16. 无障碍要求（Accessibility）— 目标 **WCAG 2.2 AA**

| 维度 | 要求 |
|---|---|
| 语义与结构 | 语义化地标、层级标题、跳转主内容的 skip link |
| 键盘可达 | 所有交互元素可 Tab 到达，逻辑顺序；**可见 focus ring（≥2px）** |
| 颜色对比 | 正文 ≥ 4.5:1，大字 ≥ 3:1；完整色板需校验（**TODO**） |
| 不用颜色单独传达信息 | 状态需配合文字/图标 |
| 动效 | 尊重 `prefers-reduced-motion`；无强制自动播放；无闪烁风险（无 >3Hz 闪烁） |
| 图片 | 内容图有 `alt`；纯装饰图 `alt=""` 或 CSS 背景 |
| 表单 | 标签关联、错误提示可读、焦点管理 |
| 触摸目标 | ≥ 44×44px |
| 文本缩放 | 200% 缩放不破版 |
| 语言声明 | `lang` 属性正确（依 Q10） |

> **禁止**：以 hover-only 交互承载关键信息（键盘/触摸用户需等价路径）。

---

## 17. 性能要求（Performance）— Core Web Vitals 目标

| 指标 | 目标（mobile） | 说明 |
|---|---|---|
| **LCP** | ≤ 2.5s | Hero 图/字体优化，避免大图阻塞 |
| **INP** | ≤ 200ms | 动效不阻塞主线程；轻量 JS |
| **CLS** | ≤ 0.1 | 图片标注尺寸、字体 `font-display` 策略、预留空间 |
| **TTFB** | ≤ 0.8s | 静态托管（Netlify CDN） |
| 首屏 JS | 尽量精简 | 避免重型动画库；按需加载 |
| 图片 | AVIF/WebP + `srcset` + 懒加载（首屏除外） | 减少带宽 |
| 字体 | 子集化、`preload`、`font-display: swap` | 避免 FOIT |

> 目标为 **建议阈值**；上线后以真实 RUM/实验室数据校准（**TODO**）。

---

## 18. 部署策略（Deployment Strategy）

> **状态（2026-11-19 更新）：仓库绑定与生产环境已确认。** 依据 `TECH-AUDIT.md §2` 实测：Netlify 站点 `cinis.netlify.app` → 绑定仓库 `canchuang/CINIS-webdemo`，生产分支 `main`，生产部署 commit `cb91106`，context=`production`，state=`ready`。**这满足 Rule A：以真实主站仓库（CINIS-webdemo）为开发仓库。**

### 18.1 已确认的生产环境事实

| 项 | 实测值 |
|---|---|
| Netlify 站点 | `cinis`（`https://cinis.netlify.app`，`admin_url` = `https://app.netlify.com/projects/cinis`） |
| 账户 | `canchuang`（团队显示名 "鬼杀队"） |
| GitHub 绑定 | `https://github.com/canchuang/CINIS-webdemo` ✅ |
| 生产分支 | `main`（生产部署 commit `cb91106` = main HEAD） |
| 生产部署状态 | `production` / `ready`，发布于 2026-11-18 07:11 UTC |
| 分支部署 | `main--cinis.netlify.app` 可用 |
| 构建命令 / 发布目录 | 公共 API 未暴露（空）；按仓库推断为 `pnpm build` → `dist/`（**TODO：以 Netlify 后台 Settings 为准**） |
| 自定义域名 | 无（`custom_domain` 为空） |

### 18.2 分支与部署模型（Rule A）

| 项 | 方案 |
|---|---|
| 开发仓库 | `canchuang/CINIS-webdemo`（已绑定 Netlify） |
| 生产分支 | `main` —— **不改动** |
| 现有 `gh-pages` | **不改动**（继续服务 `canchuang.github.io/CINIS-webdemo/`） |
| 开发分支 | 从 `main` 创建 **`portfolio-redesign`**（所有重构仅在此分支） |
| Deploy Previews | Netlify 对 `portfolio-redesign` 分支/PR 生成预览链接（不改动生产） |
| 发布 | **本阶段不做**；未来合并策略需用户确认 |

### 18.3 待确认（残余）

| 编号 | 待确认项 | 来源 |
|---|---|---|
| Q2b | 构建命令 / 发布目录 / 环境变量（公共 API 未暴露，需后台确认） | OPEN-QUESTIONS Q2 |
| Q3/Q4 | PES / MOVA 素材源 | OPEN-QUESTIONS Q3/Q4 |
| Q9 | 是否启用自定义域名、是否允许创建并推送 `portfolio-redesign`（需仓库写权限/token） | OPEN-QUESTIONS Q9 |
| Q-new | 是否保留 Netlify 上 CINIS 原型访问（建议：重构期保留旧站，新作品集作为 preview，验收后再切换） | OPEN-QUESTIONS |

> **安全底线：不修改 `main`、不修改 `gh-pages`、不做生产部署、不覆盖 `cinis.netlify.app` 现有内容。** 所有变更只在 `portfolio-redesign` 分支与其 Deploy Preview 上进行。

---

## 19. 开发优先级（Development Priority / Phased Roadmap）

| 阶段 | 交付物 | 状态 |
|---|---|---|
| **Phase 01 · 调研与文档** | TECH-AUDIT、ASSET-INVENTORY、DESIGN-DIRECTION、OPEN-QUESTIONS、ASSET-BACKUP-MANIFEST、**本 PRD** | ✅ **已完成（done）** |
| Phase 02 · 素材整理 | CINIS 23 屏截图处理（390×844 @2×）、资产 manifest、许可确认 | ⏳ 待办（清单已建立，见 ASSET-BACKUP-MANIFEST） |
| Phase 03 · 信息架构与内容 | 12 段 case study 文案（CINIS 可据原型授权撰写；PES/MOVA 待素材）、About/Contact 文案（待用户） | ⏳ 待办（部分 **BLOCKED** on 素材/文案） |
| Phase 04 · 视觉与设计系统 | 情绪板、色彩/字/间距/motion token 定稿、关键页静态稿 | ⏳ 待办 |
| Phase 05 · 高保真设计 | 各页 hi-fi 设计、动效原型 | ⏳ 待办 |
| Phase 06 · 前端开发 | 栈落地、组件、路由、动效、响应式、a11y、SEO、性能 | ⏳ 待办（可在 `portfolio-redesign` 分支进行；推送需写权限） |
| Phase 07 · 部署上线 | Netlify 绑定（已绑定）、deploy previews、CWV 验收、切换上线 | ⏳ 待办（生产切换需用户确认） |

### 19.1 关键路径依赖

- 仓库/Netlify 绑定已确认（原 Q1/Q2 已关闭）；**剩余阻塞：PES / MOVA 素材（Q3/Q4）与 About/Contact 个人文案（Q6）**。
- 创建并推送 `portfolio-redesign` 分支需仓库写权限或用户手动创建（agent 无推送凭据）。
- CINIS 的 case study 文案可先行动（若用户授权从原型撰写，Q5）。

---

## 20. 验收标准（Acceptance Criteria）

### 20.1 内容验收

- [ ] 恰好 3 个项目（CINIS / PES / MOVA）；**无第四项、无 Smart Home Icon System**。
- [ ] 每个 case study 按 12 段式（§7.2）呈现，缺失段显式标注 TODO。
- [ ] PES / MOVA 素材缺口明确标注 "待提供 / Coming soon"，无虚构。
- [ ] 无任何虚构的成果、奖项、用户测试数据、指标、履历。
- [ ] About / Contact 信息来自用户，否则标注 TODO。

### 20.2 设计验收

- [ ] 视觉体现 Experimental Art Direction（编辑/字体/不对称/动效），非简历站。
- [ ] 桌面启用 12 栏不对称网格；移动单栏且层级一致。
- [ ] 色板通过 AA 对比度校验；单一信号强调色克制使用。

### 20.3 交互 & 动效验收

- [ ] 无 `transition: all`；仅动画白名单属性。
- [ ] `prefers-reduced-motion` 下禁用 parallax/tilt/自动播放/shader，仅留 ≤120ms 淡入。
- [ ] 键盘可达所有交互；focus ring 可见；Hover ≠ Focus。
- [ ] 同一交互面仅一个招牌效果。

### 20.4 质量验收

- [ ] WCAG 2.2 AA 关键项通过（对比度、键盘、alt、标签、缩放）。
- [ ] CWV：LCP ≤2.5s、INP ≤200ms、CLS ≤0.1（移动）。
- [ ] SEO：每页唯一 title/description、OG、sitemap、结构化数据、canonical。
- [ ] 代码不含未授权第三方组件（ReactBits 许可已核对，Pro 项已自研）。

### 20.5 部署验收

- [ ] 生产（`main`）与预览（`portfolio-redesign`）分支部署正常。
- [ ] Deploy Preview 可用；回滚机制有效。
- [ ] 自定义域 HTTPS 正常（依 Q9）。

> 所有**带数值的验收阈值**为建议基线，最终以确认后的真实内容与仓库为准（TODO）。

---

## 附录 A · 待办与阻塞汇总（TODO / BLOCKERS）

| 编号 | 事项 | 类型 | 影响 |
|---|---|---|---|
| Q1 | 真实作品集主站仓库 | **BLOCKER** | 全部开发/部署 |
| Q2 | Netlify 项目信息 | **BLOCKER** | 部署 |
| Q3 | PES 全部素材 | **BLOCKER** | PES case study |
| Q4 | MOVA 全部素材 | **BLOCKER** | MOVA case study |
| Q5 | CINIS Figma 链接 + 叙事撰写授权 | 重要 | CINIS case study 文案 |
| Q6 | 个人信息（bio/联系方式/简历） | 重要 | About/Contact |
| Q7 | 字族与授权预算 | 重要 | 视觉方向落地 |
| Q8 | ReactBits/Transitions.dev 许可 | 重要 | 动效实现方式 |
| Q9 | 托管与域名偏好 | 重要 | 部署 |
| Q10 | 站点语言（中/英/双语） | 重要 | IA/文案/SEO |

## 附录 B · 参考链接

- CINIS live prototype: <https://canchuang.github.io/CINIS-webdemo/>
- CINIS source: <https://github.com/canchuang/CINIS-webdemo>
- ReactBits: <https://www.reactbits.dev/>
- Transitions.dev: <https://transitions.dev/>

---

> **文档结束 · End of PRD**
> 本文件为 Phase 01/02 文档阶段产物；无页面构建；仓库已确认（Round 2 · Rule A）；来源为 CINIS-webdemo 的 GitHub + Netlify 审计、本地备份、以及 ReactBits / Transitions.dev 评审。


---

## 附：PHASE 07 状态更新（2026-11-20）
- 身份：**颜夕和**（中文品牌名）；英文名 TODO。
- 联系方式：Gmail 待配置（不编造邮箱；无有效邮箱时联系入口呈「待配置」）。
- 素材：CINIS 完整；**MOVA 15 屏已收到**（原型/研究待补）；PES 仍缺。
- CINIS 案例页已扩展为 **13 段**（含每段「设计逻辑」），原型主入口改为 **GitHub Pages**。
- 分支：`portfolio-redesign`；生产未动。
