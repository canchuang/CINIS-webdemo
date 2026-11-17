# CINIS · React 交互原型

Figma 稿选中的主链路页面 → 可跑、可点、可在手机浏览器体验的 React 网页原型。

## 起手

```bash
pnpm install     # 已装好，可跳过
pnpm dev         # 开发服务，默认 5173
pnpm build       # 生产构建，产物 dist/
pnpm preview     # 预览构建产物
```

## 手机上看

1. 电脑与手机连同一 Wi-Fi
2. `pnpm dev` 会打印 Network 地址，形如 `http://192.168.x.x:5173/`
3. 手机浏览器打开即可

服务已绑定 `0.0.0.0`。也可双击 `start.bat`。

## 已实现的页面（23 页 + 1 弹层）

| 分组 | 页面 |
|---|---|
| 引导 | `P01` 启动页 → `P01b` 角色选择 → `P02` 首次引导 |
| 今日主链路 | `P11` 今日 → 完成方式弹层(11A) → `P13` 专注计时 → `P10` 任务完成反馈 |
| 阶段 | `P15` 阶段结算 |
| 失败分支（旅者） | `P16` 终止（无损失） → `P17` 后续（从一簇小火开始） |
| 失败分支（骑士） | `P23` 终止（FAILED·誓约警戒，损失 50 可追回） → `P24` 后续（REKINDLE·重燃，恢复任务） |
| 失败分支（深渊） | `P30` 终止（契约已断，250→0） → `P31` 后续（重新开始，浅色） |
| 目标 | `P05` 目标列表 → `P06` 目标详情 → `P07` 编辑目标 |
| 成长 | `P37` 个人成长 → `P37B` 角色档案、`P36` 成就墙 |
| 我的 | `P34` 我的 |
| 系统 | `P38` 历史记录、`P32` 提醒设置、`P33` 数据与隐私 |

> 三套模式的失败分支各有独立页面，结构与视觉均按原稿实现，不是简单换色。

## 关键交互

| 交互 | 说明 |
|---|---|
| **三模式切换** | 今日页「⇄ 换模式」在 旅者 → 骑士 → 深渊 之间循环；卡片底色、强调色、魂火上限、门槛、角色立绘、任务数、文案全部随模式切换，专注页与结算页同步跟随 |
| **底部导航浅蓝块平移** | `transform: translate3d()` + `cubic-bezier(0.22,1,0.36,1)` 380ms，只动 transform，手机端 60fps |
| **专注计时** | 真实 `setInterval` 倒计时，暂停/继续有效 |
| 任务勾选 | 切换完成态、删除线、进度条与「已完成 N 项」同步 |
| 完成方式弹层 | 底部抽屉升起 + 遮罩，两个选项可点 |
| 目标筛选 | 全部 / 进行中 / 待开始 / 已记录 |
| 编辑目标 | 星期多选、任务数步进器 |
| 历史筛选 | 全部 / 已完成 / 熄灭 / 恢复，空态提示 |
| 提醒设置 | 时间选择 + 多个场景开关 + 主开关 |
| 角色装扮切换 | 三套装扮可点选 |
| 页面转场 | 220ms 淡入；深色页无导航外壳 |

## 调试直达

地址栏加 hash 可直接打开某页（方便演示/截图）：
```
http://localhost:5173/#achievements
http://localhost:5173/#focus
http://localhost:5173/#goalEdit
```
可用：splash / roles / onboarding / today / goals / goalDetail / goalEdit / growth / me / focus / taskDone / settle / terminal / rekindle / achievements / characterFile / history / reminderSettings / privacy

## 目录

```
src/
├── components/
│   ├── BottomNav.tsx        导航 + 滑动指示器
│   ├── PageHeader.tsx       二级页头部（返回 + 标题）
│   ├── Screen.tsx           手机外壳：状态栏 / 滚动区 / 安全区
│   └── icons/NavIcons.tsx   四个 tab 图标
├── data/
│   ├── routes.ts            路由键定义
│   ├── tabs.ts              导航项
│   └── content.ts           所有页面文案与数据（源自 Figma 稿）
├── pages/                   各页面组件 + 同名 .module.css
├── styles/
│   ├── tokens.ts            设计令牌
│   ├── widgets.module.css   跨页通用构件（行/按钮）
│   └── global.css           全局重置与 CSS 变量
├── App.tsx                  路由 + 弹层编排
└── main.tsx                 入口
```

## 还原说明

- 色值、字号、圆角：用 `figma_spec phase=style` 从 Figma 读取的真实值，不是目测
- 角色立绘（旅者/骑士/深渊）、成长场景、3 枚成就徽章、结算页跃起角色：Figma 导出的原图
- 字号对正文做了移动端可读性微调（稿内最小 10px，网页端正文最小 12px）

## 已知范围

- 主链路 23 面 + 1 弹层，覆盖 **旅者 / 骑士 / 深渊 三套模式**，且三套的失败分支是各自独立的页面
- 数据为示例写死，无后端、无本地持久化（刷新回到引导页）
- 稿中的部分设置项（个人资料、通知细项等）点击后暂无下级页面
