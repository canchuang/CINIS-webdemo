# PHASE 14 REPORT — CINIS 视觉收束与角色素材评估

> Branch: `portfolio-redesign` · 开始前 HEAD `b0df433`，工作树 clean。保留 Modern Editorial 外壳与 CINIS 蓝橙游戏视觉。**未改首页/MOVA/全局设计系统；未改 main/gh-pages/生产，未合并、未部署。**

## 1. 本轮修改
1. **三模式卡片对齐**：`.cs-cinis .modes{align-items:stretch}` + `.mode{display:flex;flex-direction:column}` + `.mode .fig{margin-top:auto;height:200px;place-items:center}`。三张角色图统一 200px 图框并**底部对齐**；文案长短不同也不再造成图卡高低错位。
2. **魂火成长示例标注**：成长场景图旁新增说明「成长场景图以**骑士**为例；旅者 / 深渊对应成长场景素材未提供」。
3. **交互说明重写**：主叙事改为「用户可见状态 + 设计目的」（模式切换→全站换肤的承诺感；专注计时→看到专注在推进；任务勾选→即时反馈；阶段推进→魂火转经验/称号的正反馈）。`setInterval / translate3d / cubic-bezier / 220ms` 等实现参数**降为一条次级注释**，不再占据主叙事。
4. **研究边界**：三模式区后新增「模式与失败机制对留存 / 坚持的影响为设计意图，尚未经研究验证」。
5. **新增「阶段演进 · 以旅者为例」区块**（三模式之后）：见 §3 素材评估。
6. **整页交付截图改为按内容实际高度裁切**（不再有画布底部空白）。

## 2. 角色阶段素材盘点与判断（关键）
盘点来源：`Desktop/学习资料/大学作业记录/大三上/图形界面设计/CINIS/Characters/`（用户自有项目源图）与仓库 `_assets/cinis`、`assets/`。

| 文件 | 尺寸 | 透明 | 模式/阶段/动作（据命名与画面） | 判断 |
|---|---|---|---|---|
| `Traveler/traveler_lv1_base.png` | 1472×1472 | 是(RGBA) | 旅者 · Lv1 初火 · 站立待机 | ✅ 接入 |
| `Traveler/traveler_lv2_soulfire.png` | 1472×1472 | 是 | 旅者 · Lv2 燃魂（肩甲 + 胸口魂火纹）· 站立 | ✅ 接入 |
| `Traveler/traveler_lv3_veteran.png` | 1472×1472 | 是 | 旅者 · Lv3 历战（腰带/护具完善）· 站立 | ✅ 接入 |
| `深渊/chibi_knight2/3/4_transparent 1.png` | ~200–208² | 是 | 深渊（多个变体） | ⛔ 未接入：**阶段对应关系不明确**（仅编号），无法确认 lv 对应 |
| `骑士/paladin_knight_transparent 1.png` | 212² | 是 | 骑士（单张立绘） | ⛔ 未接入：无阶段序列，仅单张 |
| `画像 2 / 扁平风格Q版骑士战士 2` 等 | 152–212² | 是 | 骑士/杂项 | ⛔ 未接入：命名不足以判定阶段/模式 |
| `soulfire_bright/dim/normal.png` | 很小 | 是 | 魂火特效素材 | ⛔ 本轮未用（可作特效点缀，后续可选） |

**接入决定**：仅旅者具备**明确 Lv1–Lv3 命名与可见阶段差异**（初火→燃魂→历战），质量高、透明、同一角色一致，映射**可靠**；据此接入 **3 张**，放在三模式策略段之后，标题「阶段演进 · 以旅者为例」。其余角色图因阶段/对应关系不足，**不接入**，在报告列明待确认点。
- 素材处理：复制为 `assets/stage-traveler-lv1/2/3.png`（**新文件，不覆盖原始备份**；原始仍只读在 Desktop 与 `assets/source`）。
- 页面注明来源与范围（仅旅者有阶段图；骑士/深渊未提供）。

## 3. 机制表述核对（对照 content.ts / README）
- **旅者**：`terminalInfo`「本轮没有任何损失；魂火全额结算、记录照常计入历史」＋`rekindleInfo`「旅者没有损失可追回」→ 页面「本轮无损失」✅ 一致。
- **骑士**：README「P23 失败·誓约警戒，损失可追回 → P24 REKINDLE 重燃」→ 页面「誓约警戒，损失可在后续追回（重燃/REKINDLE）」✅ 一致。
- **深渊**：README「P30 契约已断（250→0）→ P31 重新开始」＋`comebackInfo`「断 9 天…永久成长都还在，魂火从零」→ 页面「契约已断…魂火从零，但永久成长保留」✅ 一致。
- **永久成长不收回**：`settleInfo.foot`「称号与经验不因后续失败收回」、`achievementsInfo.foot`「称号只升不降，失败不收回」→ 页面一致 ✅。
- **未发现机制说明与截图状态冲突**；未新增任何未证实行为效果。

## 4. 检查结果（仅本轮改动）
| 项 | 结果 |
|---|---|
| 链接 / 图片校验（6 页） | ✅ 全部本地 href/src 解析（`qa.mjs`）；新增 3 张 stage 图存在 |
| 三模式对齐 | ✅ 三图同高框、底部对齐（桌面/手机） |
| 阶段演进区块 | ✅ Lv1→Lv2→Lv3 清晰、标注来源 |
| 交互说明层次 | ✅ 状态/目的在前，技术参数为次级注释 |
| 整页截图（按内容高度裁切） | ✅ Desktop 12085px / Mobile 16301px，**无底部空白** |
| 桌面 1440 / 手机 390 | ✅ `_shots/P14-cinis-{desktop,mobile}-full.png`、`P14-{desktop,mobile}-{strategy,stage-evolution,interact}.png`；手机单栏无横向溢出 |
| 外壳与 CINIS 视觉 | ✅ 一致；CINIS 蓝橙保留 |

## 5. 改动文件
- `experiments/art-direction/direction-b-modern-editorial/cinis.html`（三模式对齐相关无结构变化；新增边界说明、阶段演进区块、成长示例标注、交互文案重写、阶段区块 id）
- `experiments/art-direction/direction-b-modern-editorial/style.css`（`.cs-cinis` 三模式对齐 + `.stage-strip` 样式；无全局改动）
- 新增素材：`assets/stage-traveler-lv1/2/3.png`（来自用户项目源图，新文件不覆盖）
- `docs/PHASE-14-REPORT.md`（本文件）
- 截图：`_shots/P14-*.png`

## 6. 未解决 / 待确认
1. **阶段素材对应关系**：深渊 `chibi_knight2/3/4` 是否为 Lv 阶段、骑士 `paladin_knight` 是否代表某阶段——**命名不足以判定**，需你确认后才可接入；目前**未使用**。
2. 补抓 roles/onboarding、taskDone、stage/settle、terminal/rekindle 截图（决定立誓/失败分支章节完整度）。
3. 个人角色、项目周期、研究/测试/指标、CINIS Figma 链接：均 TODO。
4. `soulfire_*` 特效素材是否用于魂火点缀（可选）。

## 7. Git
- 提交见本轮（`feat(cinis): Phase 14 visual polish + traveler stage evolution`），仅在 `portfolio-redesign`；未推送。
