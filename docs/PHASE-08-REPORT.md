# PHASE 08 REPORT — MOVA 案例页初版（开发与验收）

> Branch: `portfolio-redesign` · Direction B · Modern Editorial · Hero A · Modern Iris
> 本轮：在作品集原型中开发 MOVA 案例页初版并完成验收。**未改生产 / 未合并 main / 未部署。**

## 1. 预览地址
- 本地预览：**http://127.0.0.1:8123/mova.html**（静态预览服务，根目录为原型 `direction-b-modern-editorial/`）
- 也可访问：`http://127.0.0.1:8123/index.html`（首页）、`/works.html`、`/cinis.html`
- 进入路径：首页/作品页 → MOVA 卡片 → 案例页；页面末端「← 返回作品」回列表。

## 2. 页面结构（13 段，承接大纲）
1. Cover（首屏主视觉：`09-seat-select` + `13-payment-success` 双机，标注「选座 → 支付·电子票」）
2. 项目概述 Overview
3. 背景与场景 Background & Context
4. 设计问题与目标 Problem & Goals（目标表述，不写成果数据）
5. 产品定位 Positioning
6. 信息架构 Information Architecture（三 Tab）
7. 主流程与影片详情 Main Flow & Movie Detail（流程图 + `04/05` 长图，可滚动 + 「查看完整长图」链接）
8. 筛选场次 Sessions（`06` 按时段 + `07` 按影院 并排，讲清两种查找方式）
9. 选座交互 Seat Selection【重点】（`08` 总览 / `09` 放大·推荐 / `10` 已选；可选·已售·推荐·已选反馈）
10. UI 视觉系统 UI Visual System（MOVA 橙红保留；附 `02/03/14` 辅助界面）
11. 确认订单·支付·电子票（`11/12/13` + `12b` 变体；优惠券 ¥91→¥81；电子票条码）
12. 交互原型 Prototype（**素材待补充**，拿到链接后接入）
13. 总结 Reflection（成果/研究 TODO，不虚构）

设计外壳沿用 Modern Editorial（紫强调、MiSans/Inter/等宽、12 栏、响应式）；**MOVA 界面保留原有橙红**；手机截图保持原比例。

## 3. 待补素材 → 对应章节
| 待补素材 | 页面位置 |
|---|---|
| 交互原型（Figma/在线） | §12 交互原型（现为一行「素材待补充」） |
| 独立影院 Tab 界面 | §06 信息架构（影院 Tab 下） |
| 研究 / 竞品 | §03 背景与场景 · §05 产品定位 |
| IA / 线框图 | §06 信息架构 · §07 主流程 |
| 原始视觉规范（色值/字号） | §10 UI 视觉系统 |

## 4. 改动文件
- 新增：`experiments/art-direction/direction-b-modern-editorial/mova.html`
- 修改：`style.css`（MOVA 案例样式：双机首屏 / 长图滚动 / 待补充标记 / 卡片封面）
- 修改：`index.html`、`works.html`（MOVA 卡片 → 链接 `mova.html`，封面换真实图 `assets/mova/02-movie-logged-out.png`）
- 素材：`assets/mova/`（15 张，已在上轮整合并随仓库）
- 文档：`docs/PHASE-08-REPORT.md`；修正 `MOVA-ASSET-REPORT.md` / `MOVA-INTEGRATION-ACCEPTANCE.md` / `MANIFEST.md` 的编码说明

## 5. 验证结果（验收）
| 项 | 结果 |
|---|---|
| 从项目卡进入 MOVA | ✅ 首页/作品页 MOVA 卡片 → `mova.html` |
| 直接访问 / 刷新 | ✅ `http://127.0.0.1:8123/mova.html` 200 |
| 返回作品列表 | ✅ 页尾「← 返回作品」→ `works.html` |
| 链接 / 图片校验（静态） | ✅ 6 页全部本地 href/src 解析通过；MOVA 资源 15/15 存在 |
| 预览服务资源 | ✅ mova/index/cinis 均 200；图片以 `image/png` 正常返回 |
| 桌面 1440 整页 | ✅ `_shots/ME-mova-desktop.png` |
| 手机 390 整页 | ✅ `_shots/ME-mova-mobile.png`；单栏、无横向溢出 |
| 长图查看 | ✅ `04/05` 容器可滚动 + 「查看完整长图 ↗」新窗口；移动端可上下滚动 |
| 截图清晰度 | ✅ 原始 PNG（393×852 / 长图 393×1683）直接引用，未二次压缩 |
| **图片编码核对** | ⚠️ **素材实际为 PNG（magic `89 50 4E 47`），并非 WebP**；已按实际编码服务与引用，并修正相关文档说明 |
| 构建命令 | ⚠️ 仓库为 Vite/React 应用，但本机 **未安装 pnpm、无 node_modules**；且本轮页面为 `experiments/` 下的**静态原型**（无构建步骤）。已用「静态链接/图片校验 + headless 渲染 + 本地静态服务器」替代构建验证；如需跑 `pnpm build` 需先 `pnpm install`（且该命令构建的是 CINIS React 应用，非本静态原型）。 |

## 6. 截图
- 桌面整页：`experiments/art-direction/direction-b-modern-editorial/_shots/ME-mova-desktop.png`
- 手机整页：`.../_shots/ME-mova-mobile.png`
- 首页（MOVA 卡真实封面）：`.../_shots/ME-home-desktop.png`；作品页：`.../_shots/ME-works-desktop.png`

## 7. 说明与边界
- 文案依据现有界面与已确认资料撰写；设计目标用「目标表述」；成果仅写可支持的交付（高保真界面 + 主流程），研究/指标/竞品保持 TODO。
- MOVA 原始素材只读、未改；MOVA 配色保留；仅作品集外壳统一。
- `main` / `gh-pages` / `cinis.netlify.app` 未动。

## 8. TODO
交互原型链接、影院 Tab、研究/竞品、IA/线框、原始视觉规范；MOVA 项目时间线/成果数据（若有）。
