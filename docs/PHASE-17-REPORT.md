# PHASE 17 REPORT — 作品列表 CINIS 封面改善 & PES 占位减重

> Branch: `portfolio-redesign` · 开始前 HEAD `1851ccc`，工作树 clean。**仅小范围改动 works 列表与局部样式；未重做整站、未改已评审案例页、未改 main/gh-pages/生产，未合并/部署。**

## 1. CINIS 封面（作品列表）
- **问题**：原 CINIS 卡把单张 `screen-today.png` 放进 16/9 宽框 `object-fit:cover` → 放大且裁掉关键界面。
- **取材**：从现有 CINIS 备份/导出中选用真实高保真界面 **`screen-today` / `screen-growth` / `screen-characterFile`**（原生 **780×1688 @2×**，`direction-b-modern-editorial/assets/`），不改动原始素材。
- **做法**：参考 MOVA 三屏组合逻辑、按 CINIS 竖屏特点调整——16/9 卡内三屏并排，每屏约 **23% 卡宽**、`object-fit:contain`、独立白底细边，**按原比例展示、不放大不裁切**；hover 仅轻微上移。
- 仅用于**作品列表预览**；CINIS 案例页正文、封面与原始设计素材**未改动**。

## 2. PES 占位卡（降低视觉重量）
- 桌面框比例由 **4/5（偏高）→ 3/2（更矮）**，减弱斜纹对比（`rgba(17,21,27,.03)`）、字号收敛；占位高度明显低于 CINIS 主卡，不再比真实项目更抢眼。
- 手机端保持 **16/10**，占位文字清晰、不挤压标题与说明。
- 仍明确标注「**案例素材待补充**」；**未生成替代渲染、未建空壳案例页**。

## 3. 响应式复核
| 项 | 结果 |
|---|---|
| 桌面 1440（内容高度） | `_shots/P17-works-desktop.png`（h=2106）；顺序 CINIS → PES → MOVA |
| 手机 390（内容高度） | `_shots/P17-works-mobile.png`（h=1638）；单栏、无横向溢出 |
| CINIS 三屏 | ✅ 按原比例、清晰、无裁切 |
| PES 占位 | ✅ 更矮更轻，仍清楚 |
| MOVA 三屏 | ✅ 保持原完整展示，未被重裁/放大 |
| 标题/说明间距、字体、分隔线 | ✅ 沿用 Modern Editorial，无改动 |

## 4. 素材记录
- 已更新 `docs/ASSET-INVENTORY.md` §C：注明 works 的 CINIS 封面使用 `screen-today / screen-growth / screen-characterFile`（原生 780×1688，contain、不放大裁切）。
- 已更新 `docs/OPEN-QUESTIONS.md`（Phase 17）：记录本轮改动与 **PES 仍缺材料**。

## 5. 仍缺（PES；当前仓库/工作区未发现 ≠ 用户没有）
- 外观渲染/成品图（3/4 视角 + 细节，长边 ≥2000px，至少 1 张作封面）；
- 结构图 / 爆炸图 / 模块拆分；场景与用户研究；过程展板；关键参数与项目定位。
- 交付前仍**不建 PES 案例页、不生成替代图**；请放 `assets/source/portable-energy-storage/` 或给公开链接。

## 6. 改动文件
- `works.html`（CINIS 卡三屏组合 `.cinis-card`；PES 卡 `.pes-card`）
- `style.css`（新增 `.wcard.cinis-card` / `.wcard.pes-card` 作用域样式；无全局改动）
- `docs/ASSET-INVENTORY.md`、`docs/OPEN-QUESTIONS.md`、`docs/PHASE-17-REPORT.md`
- 截图：`_shots/P17-works-{desktop,mobile}.png`

## 7. 检查
链接/图片校验（6 页）全部通过；桌面/手机无横向溢出、图片比例与裁切合理；仅本轮必要检查，未新增自动化测试。

## 8. Git
- 提交见本轮（`feat(works): Phase 17 CINIS three-screen cover + lighter PES placeholder` 及 OPEN-QUESTIONS 文档提交），仅 `portfolio-redesign`；未推送。
