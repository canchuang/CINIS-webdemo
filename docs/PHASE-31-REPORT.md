# PHASE 31 REPORT — 新增作品流程最终验收与发布交接

> Branch: `portfolio-redesign` · 开始前 HEAD `dc5908a`。**未改 CINIS/PES/MOVA 案例正文；未改 `main`；未推送/合并/部署；未新增依赖。**
> 工作区原有用户手动 tweak（`style.css`）保留未覆盖，本轮提交不含该文件。

## 1. 文档与脚本一致性核对（按 ADD-NEW-PROJECT.md）
- 执行目录：仓库根 `repo/`；脚本：`scripts/new_project.mjs`；参数 `--slug / --title / --category / --summary / --filter / --cover / --layout / --home / --works`（及可选 `--feature/--tags/--cover-alt/--dry-run`）与脚本 `arg()/flag()` **完全一致**。
- 生成结果：`assets/projects/<slug>/` 素材目录、根目录 `<slug>.html`（来自 `templates/case-page-template.html`）、`content/projects.json` 追加、`content/projects-data.js` 重建 —— 与文档一致。
- **本轮修正的明确不一致（仅必要改动）**：
  1. 仓库版 `scripts/new_project.mjs` 成功提示原写 `node _tools/server.mjs ...`（该文件只在工作区，不在仓库）→ 改为 `cd "<站点目录>" && python -m http.server 8123`。
  2. `ADD-NEW-PROJECT.md` 补充说明 **所有 `--cover`/素材路径均相对“站点目录”**，不是 shell 当前目录。
  3. 发布章节修正重复编号，明确“**必须新建独立作品集站点，不能复用 CINIS 的 `cinis.netlify.app`**”，并写清 Branch / Base directory / Publish directory，以及部署连通后**必须 commit + push 到 `portfolio-redesign`** 才会更新线上。

## 2. 端到端演练（临时副本，完成后已删除）
在 `C:\Users\35335\artshots\p31-site`（站点副本）按文档命令执行：
```
node scripts/new_project.mjs --slug demo-temp --title "Demo Temp" \
  --category "UI/UX · 产品设计" --summary "临时验收项目（测试后清除）" \
  --filter uiux --cover assets/projects/demo-temp/cover.jpg --layout small --home true --works true
```
| 验证项 | 结果 |
|---|---|
| 素材目录 | ✅ `assets/projects/demo-temp/` 创建 |
| 案例页 | ✅ `demo-temp.html` 由模板生成 |
| projects.json | ✅ 3 → 4（追加 demo-temp） |
| projects-data.js | ✅ 含 demo-temp |
| 首页 | ✅ 新增第 4 张卡片（feature+3 secondary），图片 6 张、0 破图/0 缺 alt |
| 作品列表 | ✅ 4 张卡片；筛选 **全部 4 / UI-UX 3 / 产品 1**；链接 `demo-temp.html` 正确 |
| 失败用例（缺封面） | ✅ 脚本 exit=1 并输出可读错误「封面文件不存在…」；JSON **保持 4 项不变** |
| 清理 | ✅ 删除整个临时副本；**正式仓库 `content/projects.json` 仍为 3 项，无 demo 残留** |

## 3. 正式站点最终复核（桌面 1440 / 移动 390）
| 页面 | 溢出 | 图片 | 破图 | 缺 alt | 占位链接 | 筛选/链接 |
|---|---|---|---|---|---|---|
| 首页 | 无/无 | 5 | 0 | 0 | 0 | feature + 2 secondary |
| 作品列表 | 无/无 | 7 | 0 | 0 | 0 | 全部3 / UIUX2 / 产品1；`cinis.html`、`pes.html`、`mova.html` 均正确 |

- `qa.mjs`：7 页本地 href/src 全部解析；视觉与 Phase 30 一致，无回归。
- 截图（实际像素）：
  - 首页 `_shots/P31-index-desktop.png`（**1440×3615**）· `P31-index-mobile.png`（**390×3834**）
  - 作品列表 `_shots/P31-works-desktop.png`（**1440×2106**）· `P31-works-mobile.png`（**390×1609**）

## 4. 线上同步的实际条件（如实）
- **当前**：`portfolio-redesign` 分支**无任何自动预览/自动部署**；`cinis.netlify.app` 与 GitHub Pages 均绑定 `main`（CINIS 原项目），**推送本分支不会更新线上**。
- **本地更新网页**（不联网）：编辑 `content/projects.json`（或跑 `new_project.mjs`）→ `node scripts/build_projects.mjs` → 站点目录起静态服务器刷新即可。
- **要上线，需要你在平台侧完成**（本环境无权限，未尝试登录/连接/保存 Token/推送/部署）：
  1. 新建**独立作品集部署站点**（勿复用 CINIS 站点）。Netlify：Branch=`portfolio-redesign`，Base directory=`experiments/art-direction/direction-b-modern-editorial`，Build command 留空，Publish directory=`.`；
  2. 之后每次新增/修改：**commit + push 到 `portfolio-redesign`**（若开启自动部署）触发线上；否则平台手动 Deploy；
  3. 发布前先在本地预览确认。
- 结论：**目前仅本地可更新；线上自动同步未建立**，需上述平台配置后才成立。

## 5. 交付结论
- ✅ 用户可以依据 `docs/ADD-NEW-PROJECT.md` 新增项目，并在本地首页/作品列表同步看到数量、顺序、封面、分类、链接与筛选更新。
- ✅ 正式作品数据无测试残留（3 项）。
- ✅ 文档与脚本命令一致（含本轮 3 处修正）。
- ⛔ 线上发布仍待平台配置（独立站点 + 分支 + 子目录），非本阶段可完成。

## 6. 改动文件
- `docs/ADD-NEW-PROJECT.md`（路径说明/预览命令/发布步骤修正）
- `scripts/new_project.mjs`（成功提示改为 python 静态服务器命令）
- `docs/PHASE-31-REPORT.md`（本文件）
- 截图：`_shots/P31-index-{desktop,mobile}.png`、`P31-works-{desktop,mobile}.png`
- **无页面/案例内容改动；无新增依赖；未改 `style.css`。**

## 7. Git
- 提交见本轮（`docs: Phase 31 accept add-project flow + publishing handoff`），仅 `portfolio-redesign`；未推送。
