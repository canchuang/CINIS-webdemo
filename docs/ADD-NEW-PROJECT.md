# 新增作品操作指南（ADD A NEW PROJECT）

> 作品集采用**单一作品数据源**：`content/projects.json`。首页与作品列表都由它渲染，**不要手动改两处卡片**。
> 站点目录：`repo/experiments/art-direction/direction-b-modern-editorial/`（下称“站点目录”）。

## 文件结构（与维护相关的部分）
| 文件 | 作用 | 是否手改 |
|---|---|---|
| `content/projects.json` | **唯一数据源**：项目 slug/标题/分类/排序/简介/封面/案例页/显隐 | ✅ 手改（或由脚本追加） |
| `content/projects-data.js` | 由 JSON **自动生成**的 `window.PROJECTS` | ❌ 不要手改，运行构建即可 |
| `content/projects-render.js` | 首页 / 作品列表共用渲染器（读取 `window.PROJECTS`） | ❌ 一般不改 |
| `content/projects-cards.css` | 数据驱动卡片的少量样式覆盖 | ❌ 一般不改 |
| `templates/case-page-template.html` | 新案例页模板（可自由定制正文） | 模板本身可改 |
| `scripts/projects-lib.mjs` | 校验 / 生成 / 工具函数 | 逻辑改动才改 |
| `scripts/build_projects.mjs` | 校验 JSON 并生成 `projects-data.js` | — |
| `scripts/new_project.mjs` | **新增作品脚手架**（校验+建目录+建模板页+追加 JSON+重新生成） | — |

## 数据字段（`content/projects.json` 中每个项目）
| 字段 | 必填 | 说明 |
|---|---|---|
| `slug` | ✅ | 唯一标识，小写字母/数字/连字符（如 `my-app`） |
| `order` | ✅ | 排序（整数，从 1 开始，唯一）；决定首页/作品/编号顺序 |
| `title` | ✅ | 项目标题 |
| `filter` | ✅ | `uiux` 或 `product`（对应作品列表筛选项） |
| `worksMeta` | ✅ | 作品列表类别行，如 `04 — UI/UX · 产品设计` |
| `summary` | ✅ | 作品列表一句话简介 |
| `homeSummary` | ⬜ | 首页卡片简介（默认同 summary） |
| `homeLayout` | ⬜ | `feature`（首页大卡，通常仅 1 个）或 `item`（次级卡） |
| `homeMeta` / `homeCat` / `homeTags` | ⬜ | 首页卡片的编号/类别/标签 |
| `worksLayout` | ⬜ | `big` / `small` / `wide` |
| `coverClass` | ⬜ | 作品卡样式类（如 `cinis-card` / `mova-card` / `pes-card`） |
| `cover.kind` | ✅ | `single`（单图）或 `triptych`（三屏组合） |
| `cover.images[]` | ✅ | `{ src, alt }`；`src` 必须是 `assets/` 下的相对路径且文件存在 |
| `page` | ✅ | 案例页文件名，如 `my-app.html`（须存在） |
| `showOnHome` / `showInWorks` | ✅ | 是否显示在首页 / 作品筛选结果 |

## A. 新增一个作品（推荐流程）
1. **放素材**：把封面/过程图放到
   `站点目录/assets/projects/<slug>/`（目录可先不存在，脚本会创建）。
   例：`assets/projects/my-app/cover.jpg`。
2. **运行脚手架**（在仓库根 `repo/` 下）：
   ```bash
   node scripts/new_project.mjs \
     --slug my-app \
     --title "我的项目" \
     --category "UI/UX · 产品设计" \
     --summary "一句话简介" \
     --filter uiux \
     --cover assets/projects/my-app/cover.jpg \
     --layout small \
     --home true --works true
   ```
   可选：`--feature`（首页大卡）、`--home false` / `--works false`（暂不展示）、`--tags "UI/UX,产品设计"`、`--cover-alt "封面描述"`、`--dry-run`（只打印将写入的内容，不落盘）。
   脚本会：校验参数 → 创建素材目录 → 从模板生成 `<slug>.html` → 追加 `content/projects.json` → 重新生成 `content/projects-data.js`。
3. **编辑案例页**：打开新生成的 `站点目录/<slug>.html`，按模板中的 01–05 区块填写真实内容。**案例正文不写进 JSON**；JSON 只记录卡片元数据。
4. **本地预览**：
   ```bash
   cd repo/experiments/art-direction/direction-b-modern-editorial
   python -m http.server 8123
   # 打开 http://localhost:8123/
   ```
   （或使用工作区的 `node _tools/server.mjs "<站点目录>" 8123`）
5. **提交**：`content/projects.json`、`content/projects-data.js`、`assets/projects/<slug>/`、`<slug>.html`（以及如需的样式）。

> 新增后，**首页/作品列表的项目数量、顺序、封面、分类、链接、筛选结果会自动同步**；无需再改 HTML 卡片。

## B. 修改已有作品（改名/换封面/调顺序/隐藏）
1. 编辑 `content/projects.json` 对应条目（改 `title`/`summary`/`cover`/`order`/`showOnHome`/`showInWorks` 等）。
2. 运行：`node scripts/build_projects.mjs`（校验并重新生成 `projects-data.js`）。
3. 刷新本地页面即可；无需改 index/works 的 HTML。

## C. 校验与常见错误
`node scripts/build_projects.mjs` 会逐项检查并给出可读错误，例如：
- `slug 必须为小写字母/数字/连字符`、`slug 重复`
- `order 必须为 >=1 的整数`、`order 重复`
- `缺少必填字段 title/summary/worksMeta/page`
- `filter 必须是 uiux / product`
- `案例页不存在: xxx.html`
- `cover.images[0] 图片不存在: assets/...`
- `src 必须是 assets/ 下的相对路径`、`缺 alt 文本`
构建失败时 **不会** 生成新的 `projects-data.js`，页面维持上一次有效状态。

## D. 本地更新 vs 线上发布（重要）
- **本地更新网页**：改 JSON → `node scripts/build_projects.mjs` → 本地静态服务器刷新即可。完全离线，无 Token。
- **当前部署状态（如实）**：
  - `portfolio-redesign` 分支**没有**连接到任何自动预览/自动部署；
  - 现有的 Netlify `cinis.netlify.app` 与 GitHub Pages 都绑定 **`main`**，推送作品集分支**不会**更新它们；
  - 因此**现在不会自动上线**，也不要在浏览器/仓库保存 GitHub / Netlify Token 或部署密钥。
- **以后要发布（需你在平台侧配置）**：
  1. 新建一个 Netlify 站点，绑定 `portfolio-redesign` 分支，**Base directory** 设为
     `experiments/art-direction/direction-b-modern-editorial`，Publish directory 设为 `.`；或
  2. 用 GitHub Pages 指向包含该站点目录的分支/文件夹。
  2. 平台账号与授权由你完成；本仓库不保存任何部署密钥。发布前建议先在本地按第 4 步预览确认。

## E. 约束
- 不提供“看起来能提交但无法保存”的前端表单；所有变更走 JSON + 脚本。
- 不要编造案例内容、数据或成效；缺资料就标注“暂无材料/待补”。
- 不覆盖原始素材；新增派生图放 `assets/projects/<slug>/` 或 `assets/pes/` 等独立目录。
