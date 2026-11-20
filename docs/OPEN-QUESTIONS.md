# OPEN QUESTIONS

> Consolidated blockers and decisions needed from the user. Grouped by priority.
> **Round 2 update (2026-11-19): Q1 and Q2 are now RESOLVED** (Netlify site confirmed bound to `CINIS-webdemo`, production `main`). See closed items below.

---

## ✅ RESOLVED in Round 2

### Q1 — Repository  → **CLOSED**
- **Answer:** The portfolio is built **on `canchuang/CINIS-webdemo`** (Rule A). There is no separate portfolio repo. Dev branch `portfolio-redesign` to be created from `main`.
- **Residual:** pushing the branch needs repo **write access** (see Q2b).

### Q2 — Netlify  → **CLOSED (binding confirmed)**
- **Answer:** Site `cinis` = `https://cinis.netlify.app`, bound to `CINIS-webdemo`, production branch `main`, deploy `cb91106`, context `production`, state `ready`. No custom domain.
- **Residual (Q2b):** build command / publish dir / env vars not exposed by public API → confirm in Netlify UI (Settings → Build & deploy). Inferred: `pnpm build` → `dist/`.

---

## BLOCKERS (still open)

### Q2b — Repo write access + build settings
- **分支部分 ✅ 已解决（Round 3）**：用户已手动从 `main` 创建 `portfolio-redesign`（远程验证指向 `cb91106`）。
- **仍需要：** 若要让 agent 直接把提交 push 到该分支 → 放入 `canchuang` 账号的 token 到 `.secrets/github_token.txt`；否则由 agent 产出 patch/bundle，用户自行 push。
- **仍需要：** Netlify 后台确认 build command / publish dir / env vars（公共 API 未暴露）。
- **Impact：** 不 push 也能本地开发与出预览包；只影响"自动推送到远程"。

### Q3 — Portable Energy Storage assets
- No assets found. Provide: research/personas, function analysis, modular/structural diagrams, form renders, final hero image (drop folder into `assets/projects/portable-energy-storage/` or `assets/source/` or share a link).
- **Needed:** source files or a Drive/Figma/Behance link + usage permission.

### Q4 — MOVA assets
- No assets found. Provide: Figma link, exported screens, prototype URL, positioning/competitor docs.
- **Needed:** design source + prototype link + permission.

---

## IMPORTANT (answer during Phase 04 planning)

### Q5 — CINIS design source
- Figma file link for the original CINIS design (root node `1299:5713` seen in `assets.json`). Needed to reuse exact specs/imagery.
- Also: may we **author** the CINIS product-positioning / three-mode / IA / user-flow write-ups from the prototype & `content.ts`, or will you supply copy?
- **NEEDED vs TODO:** If no copy is supplied, these narrative sections stay **TODO** (we will not fabricate outcomes/metrics).

### Q6 — Personal information
- Bio / introduction, design philosophy text.
- Contact: **email**, social links (Behance/Dribbble/LinkedIn/X?), **resume link** (the brief marks resume as "待确认" — TODO).
- **Do not** invent awards, metrics, user-test data, or employment history. Any such content must come from you, else stays TODO.

### Q7 — Typography & licensing budget
- Approve final typefaces and confirm whether paid licenses (e.g., Editorial New / Söhne / PP) are acceptable, or restrict to open-source only.

### Q8 — ReactBits / Transitions.dev adoption
- Confirm licensing for the shortlisted ReactBits components (free vs Pro) and that copying their source into the repo is acceptable. Transitions.dev Pro items must be avoided or re-implemented.

### Q9 — Hosting & deployment preference
- Target host for the portfolio build: same Netlify team? custom domain? confirm branch → deploy strategy (Production = main; dev = `portfolio-redesign` preview).

### Q10 — Language(s)
- Site copy language: Chinese, English, or bilingual? Affects IA, type choices, and copy workload.

---

## NICE-TO-HAVE
- Analytics preference (privacy-friendly? e.g., Plausible/Umami) — affects privacy notes.
- Accessibility target level (WCAG 2.2 AA assumed unless told otherwise).
- Any brand/logo/monogram for the site identity.

---

## Decisions the agent made autonomously (reversible, stated for transparency)
- **Rule A applied** (Round 2): repo `CINIS-webdemo` ↔ Netlify `cinis.netlify.app`, production `main`; redesign to happen on `portfolio-redesign` only. → see TECH-AUDIT §3.
- Cloned the repo locally for a **read-only backup** (`assets/source/CINIS-webdemo`); **did not modify `main` / `gh-pages`**, did not push, did not deploy.
- Excluded Smart Home Icon System entirely (per mandate).
- Kept project list to exactly 3 (CINIS, PES, MOVA); did not add a fourth.


---

## PHASE 07 更新（2026-11-20）

- **身份已提供**：中文姓名 **颜夕和**（已全站替换：导航 / About / Footer / SEO Title / Open Graph / 配置文件）。**英文名 TODO**（不擅自使用拼音、英文昵称）。
- **联系方式**：确定使用 Gmail，但完整地址未提供 → 全站联系入口显示「待配置」，**不编造邮箱、不使用 hello@example.com 可点击链接**；获得地址后再生成 mailto。
- **MOVA 素材已收到**：15 张高保真界面（已备份 + SHA256 + 审计 → `docs/MOVA-ASSET-REPORT.md`、`docs/MOVA-CASE-STUDY-OUTLINE.md`）。仍缺：**交互原型链接、影院 Tab 截图、项目定位/研究/竞品、原始视觉规范（Figma/色值）**。
- **CINIS 原型入口**：主用 GitHub Pages `https://canchuang.github.io/CINIS-webdemo/`（Netlify `cinis.netlify.app` 作镜像备用，不作为唯一依赖）。
- 仍需：真实简介/城市/可用状态、简历链接、社交链接、CINIS 原始 Figma 链接、**PES 素材**。
