# PHASE 30 REPORT — 可持续的作品新增与网页同步流程

> Branch: `portfolio-redesign` · 开始前 HEAD `26644f2`。**新增数据源/脚本/模板并改造首页与作品列表读取同一数据；未改 CINIS/PES/MOVA 案例内容与设计；未推送/合并/部署；未新增依赖。**
> 工作区原有用户手动 tweak（`style.css`）保留未覆盖，本轮提交不含该文件。

## 1. 方案（静态、零依赖、最小改动）
```
content/projects.json  (唯一数据源)
        │  node scripts/build_projects.mjs  (校验 + 生成)
        ▼
content/projects-data.js (window.PROJECTS，自动生成)
        │
        ├── content/projects-render.js  → 首页 (#homeFeature/#homeSecondary) + 作品列表 (#grid + 筛选)
        └── content/projects-cards.css  → 卡片交互样式
```
- 首页与作品列表**不再各自硬编码卡片**，都从 `window.PROJECTS` 渲染；数量、顺序、封面、分类、链接、筛选项与结果自动同步。
- **案例正文不写入 JSON**；新项目页由模板生成，可自由定制。现有 CINIS/PES/MOVA 页面未改。

## 2. 交付物
- **数据源**：`content/projects.json`（3 个现有项目；字段：slug/order/title/filter/worksMeta/summary/封面（single|triptych + alt）/page/showOnHome/showInWorks 等）。
- **生成脚本**：`scripts/build_projects.mjs` + `scripts/projects-lib.mjs`（必填/唯一性/slug/order/filter/路径存在性/alt/显隐类型校验；失败不写产物）。
- **新增脚手架**：`scripts/new_project.mjs`（校验 → 建 `assets/projects/<slug>/` → 从模板建 `<slug>.html` → 追加 JSON → 重新生成）；支持 `--dry-run`。
- **渲染器与样式**：`content/projects-render.js`、`content/projects-cards.css`。
- **模板**：`templates/case-page-template.html`（Modern Editorial 结构，正文占位可自由改）。
- **文档**：`docs/ADD-NEW-PROJECT.md`（字段说明、新增/修改步骤、校验错误、预览、发布边界）。

## 3. 页面改动（仅数据接入）
- `index.html`：`精选作品` 改为 `#homeFeature` / `#homeSecondary` 容器 + `#homeProjectCount`；底部引入 `projects-data.js`、`projects-render.js`。
- `works.html`：`#grid` 改空容器，筛选脚本改由渲染器统一处理；`#worksProjectCount` 动态计数；引入两份脚本。
- 无视觉重做；生成的卡片沿用既有 CSS 类（`wcard big/small/wide`、`cinis-card`/`mova-card`/`pes-card`、`feature`、`item`）。
- 修复数据驱动后 PES 卡仍是占位期“不可点样式”的问题：新增 `projects-cards.css` 覆盖 `.pes-card` 的 cursor/hover，使真实链接有可点击反馈。

## 4. 校验与同步测试
- `node scripts/build_projects.mjs` → **✓ 校验通过：3 个项目**；生成 `content/projects-data.js`。
- `scripts/new_project.mjs --dry-run` → 正确打印第 4 项计划，**不落盘**；仓库 JSON 仍 3 项、无 `demo-temp`。
- 在**临时站点副本**端到端跑真实新增（slug `demo-temp`）：成功创建素材目录、`demo-temp.html`、更新到 4 项并重建数据；测试后**删除整个临时副本**，仓库无残留。
- 运行时复核（index/works/pes，1440/390）：
  - 破图 0 / 缺 alt 0 / 占位链接 0 / 横向溢出 0；
  - 作品筛选：全部 3、UI/UX 2（CINIS、MOVA）、产品 1（镇岳）；`aria-pressed` 与状态播报同步；
  - 卡片链接：`cinis.html` / `pes.html` / `mova.html` 均正确；aria 为「项目 — 分类，查看案例」；PES 卡 cursor 已修复为 pointer。
- `qa.mjs`：7 页本地 href/src 全部解析。

## 5. 当前部署方式与限制（如实）
- **本地更新网页**：改 JSON → `node scripts/build_projects.mjs` → 本地静态服务器（如 `python -m http.server 8123` 于站点目录）刷新即可；完全离线。
- **线上**：`portfolio-redesign` 分支**未连接任何自动预览/部署**；现有 Netlify（`cinis.netlify.app`）与 GitHub Pages 均绑定 `main`，**推送分支不会自动上线**。后续需你在平台侧新建站点/Pages 并设置 Base directory = `experiments/art-direction/direction-b-modern-editorial`；仓库与浏览器均**不保存 Token/部署密钥**。
- 未推送、未合并、未部署。

## 6. 截图（实际像素）
- 首页：`_shots/P30-index-desktop.png`（1440×3615）· `P30-index-mobile.png`（390×3834）
- 作品列表：`_shots/P30-works-desktop.png`（1440×2106）· `P30-works-mobile.png`（390×1609）

## 7. 改动文件
- 新增：`content/projects.json`、`content/projects-data.js`（生成）、`content/projects-render.js`、`content/projects-cards.css`、`templates/case-page-template.html`、`scripts/projects-lib.mjs`、`scripts/build_projects.mjs`、`scripts/new_project.mjs`
- 修改：`index.html`、`works.html`（仅卡片改为数据渲染 + 脚本引入）
- 文档：`docs/ADD-NEW-PROJECT.md`、`docs/PHASE-30-REPORT.md`、`_shots/P30-*.png`
- **未新增依赖**；未改 CINIS/PES/MOVA 页面内容；未改 `style.css`。

## 8. 后续建议
- 若新增作品分类（非 uiux/product），需同步在 `works.html` 增加对应筛选按钮并在 `projects-lib.mjs` 的 `FILTERS` 放行。
- 若要三屏组合封面，新增后把 `cover.kind` 改为 `triptych` 并补 3 张图，再运行构建。
- 整理好线上发布配置后，按 `ADD-NEW-PROJECT.md` 的「D. 发布」执行；在此之前以本地预览为准。

## 9. Git
- 提交见本轮（`feat(content): Phase 30 single project data source + add-project workflow`），仅 `portfolio-redesign`；未推送。
