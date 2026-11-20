# MOVA 素材整合 · 验收报告

> Phase 07 · 整合完成 · 结论：**高保真界面部分 READY（可验收）**；原型/影院Tab/研究/视觉规范 **待补（TODO，不编造）**。

## 1. 验收范围
把已收到的 MOVA 15 张真实界面，从「原始散放」整合为「按流程命名、可被案例页直接引用」的结构化素材。**不含**任何未提供的素材（不虚构）。

## 2. 交付结果 & 位置
| 用途 | 位置 |
|---|---|
| 原始只读备份 | `assets/source/mova-original/`（15 文件，未改动） |
| 原始哈希清单 | `assets/source/mova-assets-hashes.csv` |
| 整合后素材（按流程命名） | `assets/projects/mova/screens/`（15 张：01…14） |
| 机器清单 | `assets/projects/mova/screens-manifest.csv` |
| 原型可直接引用副本 | `experiments/art-direction/direction-b-modern-editorial/assets/mova/`（15 张） |
| 素材说明 | `assets/projects/mova/MANIFEST.md` |
| 审计 / 大纲 | `docs/MOVA-ASSET-REPORT.md` · `docs/MOVA-CASE-STUDY-OUTLINE.md` |

## 3. 完整性校验
- 文件数：**15 / 15**。
- **SHA256：15/15 与原始文件逐一一致**（重命名未改内容）。
- 覆盖流程：启动 → 首页(未/已登录) → 影片详情(×2) → 场次(按时段/按影院) → 选座总览/选座/已选 → 确认订单 → 支付(×2) → 支付成功(电子票) → 我的。

## 4. 素材清单（核对项）
见 `assets/projects/mova/MANIFEST.md` 表（顺序 / 文件名 / 流程节点 / 尺寸 / 大小 / SHA256）。全部 393×852（04/05 为 393×1683 长图）。

## 5. 仍然缺失（需你补，已预留收纳位）
| 缺项 | 状态 | 收纳位 |
|---|---|---|
| 交互原型（Figma/链接/录屏） | TODO | `C:\Users\35335\Desktop\MOVA-intake\01_prototype\` |
| 影院 Tab 截图 | TODO | `…\02_cinema_tab\` |
| 研究 / 竞品 / IA / 线框 | TODO | `…\03_research\` |
| 原始视觉规范（色值/字号/组件） | TODO | `…\04_visual_spec\` |
| 其他（海报/logo/成果数据） | 可选 | `…\05_extra\` |
> chatgpt.com 的私有库链接我无法访问；请从该库下载后放入上述 Desktop 文件夹（或给我公开直链），我收到即**自动重盘 + SHA256 + 差异比对**。

## 6. 保真与边界
- 原始素材**只读备份、未修改**；处理产物另存，不覆盖原件。
- MOVA 自身**橙红配色保留**，不套用作品集紫色；MOVA 不会另起一套网站品牌风格。
- 仅作品集统一 Modern Editorial 外壳；项目内部忠实原貌。
- 生产站点 / `main` / `gh-pages` 未动。

## 7. 使用方式（下一步）
- 15 张已放在原型 `assets/mova/`，可直接在 MOVA 案例页引用（`assets/mova/01-splash.png` …）。
- 按 `docs/MOVA-CASE-STUDY-OUTLINE.md` 的 13 段结构推进；缺项处显示「素材待补充」，不造假。

## 8. 验收状态
- ✅ **MOVA 高保真界面素材：验收通过（READY，15/15，哈希一致，已按流程整合）。**
- ⏳ 交互原型 / 影院 Tab / 研究 / 视觉规范：待你补充（收纳位已建）。
- 📌 你可以：① 直接让我用现有 15 张开始 MOVA 案例页开发；② 或先补素材再统一推进。
