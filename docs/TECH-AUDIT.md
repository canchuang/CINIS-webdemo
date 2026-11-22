# TECH AUDIT — Repository & Platform Relationship

> Phase 01 deliverable — **revised 2026-11-19 (Round 2)** after user confirmed the site/repo mapping. Facts verified against public APIs (`api.github.com`, **`api.netlify.com/api/v1/sites/cinis.netlify.app` — 200, unauthenticated public site object**), `raw.githubusercontent.com`, a local `git clone`, and direct HTTP probes. Unverified items are marked **TODO**.

---

## 0. Audit method (what was actually checked)

| Check | Method | Result |
|---|---|---|
| Public repos of `canchuang` | GitHub REST `GET /users/canchuang/repos` | 2 repos (see §1) |
| CINIS repo metadata | `GET /repos/canchuang/CINIS-webdemo` | OK — public, TypeScript |
| CINIS file tree & assets | `GET /git/trees/main?recursive=1` | OK — full tree captured |
| CINIS branches | `GET /repos/.../branches` | 5 branches (see §1.2) |
| CINIS GH Pages | live fetch | 200 (see §1.3) |
| **Netlify site object** | `GET /api/v1/sites/cinis.netlify.app` | **200 — repo_url, branch, commit, deploy state exposed** (see §2) |
| **Netlify deploy object** | `GET /api/v1/deploys/{id}` | 200 — branch `main`, context `production` (see §2) |
| Local backup | `git clone --depth 1` | OK — 66 asset files backed up + hashed (see §6) |
| Candidate Netlify team/projects list | `GET /api/v1/teams/...` (unauth) | 401/404 — requires token (not needed now) |

**Tooling:** `git` 2.54, `node` 24.22. **Not available:** `gh`/`netlify` CLI, `GITHUB_TOKEN`/`NETLIFY_AUTH_TOKEN`, browser session. *(Netlify read of the public site object did NOT require a token.)*

---

## 1. GitHub — what exists

### 1.1 Repositories under `canchuang` (public)

| Repo | Visibility | Language | Default branch | Size | Notes |
|---|---|---|---|---|---|
| `CINIS-webdemo` | public | TypeScript | `main` | ~6 MB | **CINIS Project Source Repository** (confirmed) |
| `-` (name is a single hyphen) | public | — | `main` | 0 KB | Empty placeholder repo, description "hahaha", created 2026-11-19. No content. Not usable. |

> **Update (Round 2):** There is no separate portfolio repository, and none is needed. The user confirmed the portfolio will be built *on* `CINIS-webdemo` (the repo already bound to the live Netlify site). Per **Rule A**, `CINIS-webdemo` is the real main-site repository; a `portfolio-redesign` branch will be created from `main`. See §3.

### 1.2 `CINIS-webdemo` — structure & stack

- **Purpose (verified):** A Figma→React *interactive mobile prototype* of the CINIS gamified self-discipline app. README: "Figma 稿选中的主链路页面 → 可跑、可点、可在手机浏览器体验的 React 网页原型". 23 screens + 1 bottom-sheet layer.
- **Default branch:** `main` (HEAD `cb91106`).
- **Other branches:** `gh-pages` (built output), `feature/knight-settle-polish`, `feature/modal-bg-editor`, `feature/traveler-theme`. No `portfolio-redesign`, no `dev`, no `production`.
- **Tech stack (verified from `package.json` + `vite.config.ts` + `index.html`):**
  - React `^19.3.1`, React DOM `^19.3.1`
  - Vite `^8.3.8`, `@vitejs/plugin-react` `^6.3.0`
  - TypeScript `^7.0.2`
  - `grapesjs` `^0.23.9` (used by `ModalBgEditorPage` — a visual editor utility, NOT part of the core prototype flow)
  - CSS Modules + CSS custom properties (design tokens in `src/styles/tokens.ts`, `global.css`)
  - `pnpm` package manager (`pnpm-lock.yaml`)
  - Build: `tsc -b && vite build` → `dist/`; Dev: `vite --host 0.0.0.0` port 5173
- **App structure:** `src/pages/*` (one folder-per-screen, TSX + `.module.css`), `src/components/*` (BottomNav, PageHeader, Screen shell, ModalBackdrop, etc.), `src/data/content.ts` (22 KB of Figma-sourced copy/data), `src/styles/*`.
- **No router library** — hash-based manual routing in `App.tsx` (`#today`, `#focus`, `#achievements`, …) for direct-screen demo access.
- **No backend / no persistence** — data is hard-coded; refresh returns to onboarding (per README). This is a *prototype*, not a product.
- **No `netlify.toml`, no `.github/workflows`** found in the tree.

### 1.3 Deployment status of CINIS

- **GitHub Pages: LIVE.** `https://canchuang.github.io/CINIS-webdemo/` returns HTTP 200 and serves the built prototype (`<title>CINIS · 自律原型</title>`, hashed Vite assets under `/CINIS-webdemo/assets/`). The `gh-pages` branch backs this.
  - Note: `GET /repos/.../pages` returned 404 (legacy/API quirk) even though the site is live — treat the *live fetch* as ground truth.
- **Netlify: LIVE and bound to this repo — CONFIRMED (see §2).** `https://cinis.netlify.app/` returns HTTP 200 (`Server: Netlify`, `X-Nf-Request-Id`, edge cache) and serves the same CINIS prototype shell (`<title>CINIS · 自律原型</title>`); its deploy `commit_ref` = `cb91106` = `main` HEAD.

### 1.4 Asset provenance (verified from `public/assets/assets.json`)

`assets.json` is a **Figma export manifest** (schemaVersion 2). It proves every CINIS visual asset originated from a Figma file:
- Root node `1299:5713` — "P22_阶段结算 · 骑士".
- Multi-root export covers pages: `P11_首页·旅者`, `P37_个人成长`, `P37B_角色档案`, `P25_首页·深渊`, `P15_阶段结算·旅者`, `P23_终止·骑士`, `P30_终止·深渊`, `P24_后续·骑士`, `P29_阶段结算·深渊`, `P31_后续·深渊`, `P22_阶段结算·骑士`.
- Assets are 2×-optimized PNGs and inline SVG vectors with `figma-image:` / `svg-content:` source identities, content digests, semantic labels, pixel dimensions and per-node placements.
- **Implication:** the original design source is a Figma file that the user owns. Good for hero/case-study imagery. (Figma file key/link to be confirmed → OPEN-QUESTION.)

---

## 2. Netlify — CONFIRMED via public site object

The Netlify **public site object** is readable without a token and gives us the definitive binding:

`GET https://api.netlify.com/api/v1/sites/cinis.netlify.app` → **HTTP 200**, body summary:

| Field | Value |
|---|---|
| `id` | `ffb10f71-cd4f-403d-bba5-1595ead6ab14` |
| `name` | `cinis` |
| `url` / `ssl_url` | `http://cinis.netlify.app` / **`https://cinis.netlify.app`** |
| `admin_url` | `https://app.netlify.com/projects/cinis` |
| `custom_domain` | *(empty — no custom domain)* |
| `account_slug` / `account_name` | `canchuang` / 鬼杀队 |
| **`repo_url`** | **`https://github.com/canchuang/CINIS-webdemo`** ✅ |
| `public` | `true` |
| `published_deploy.id` | `6afd4fa22df809097b6ee72c` |
| `published_deploy.branch` | **`main`** ✅ |
| `published_deploy.commit_ref` | **`cb91106220f0dcf7a0d063b21262207a4a96a96d`** (= `main` HEAD) |
| `published_deploy.context` | `production` |
| `published_deploy.state` | `ready` |
| `published_deploy.deploy_url` | `https://main--cinis.netlify.app` |
| `published_deploy.published_at` | `2026-11-18T07:11:45.813Z` |
| Screenshot | `https://d33wubrfki0l68.cloudfront.net/6afd4fa22df809097b6ee72c/…webp` (phone frame + 魂火 splash — confirmed CINIS) |

`GET /api/v1/deploys/6afd4fa22df809097b6ee72c` → also confirms `branch: main`, `context: production`, `commit_ref: cb91106`.

- **Site name:** `cinis` · **Production URL:** `https://cinis.netlify.app` · **GitHub repo:** `canchuang/CINIS-webdemo` · **Production branch:** `main` · **Deploy:** production/ready.
- **Build command / publish directory / env vars:** NOT exposed by the public API (empty fields). Inferred from repo: `pnpm build` → `dist/` → **TODO confirm in Netlify UI (Settings → Build & deploy)**.
- **Served-build note:** Netlify serves `index-Cdhj1u-2.js` / `index-Dz-Frx8o.css`, while GitHub Pages serves `index-Btp5yLpM.js` / `index-BZIG8R1j.css` — i.e., Netlify runs its **own** build (not a mirror of `gh-pages`). Both are the same CINIS app.

**Conclusion:** Netlify site `cinis` **is bound to `CINIS-webdemo` on production branch `main`.** Binding resolved.

---

## 3. Rule evaluation (per task §03) — **Rule A now applies**

- **Rule A** (real main site found + bound to GitHub → use that repo): **✅ APPLIES.** Netlify `cinis.netlify.app` ↔ GitHub `CINIS-webdemo`, production `main`.
- Rule B: N/A (no separate repo involved).
- Rule C: no longer applicable (the exact blocker it guards — "cannot confirm real production repo" — is now resolved).

### 3.1 Decision (Rule A) — safe execution

> Use `canchuang/CINIS-webdemo` as the development repo. **Production branch `main` and the `gh-pages` branch must not be modified.** Create **`portfolio-redesign` from `main`**; all portfolio redesign work happens only on that branch, surfaced via a Netlify **Deploy Preview** — never touching the live `cinis.netlify.app` production content.

**State of execution (updated Round 3):**
- ✅ `portfolio-redesign` branch **CREATED on remote** (verified via `git ls-remote`), pointing at `cb91106` = `main` HEAD. Production `main`/`gh-pages` untouched.
- ✅ Full repo cloned locally for backup (`assets/source/CINIS-webdemo`, commit `cb91106`) — see §6.
- ✅ Data read-only; no writes to GitHub `main`/`gh-pages`.
- ⚠️ Pushing commits *to* `portfolio-redesign` still needs repo **write credentials** (none in session). To let the agent push, drop a `canchuang`-owned token into `.secrets/github_token.txt` (gitignored). Otherwise the agent delivers changes as a patch/bundle for the user to push.
- ⛔ No production deploy, no Netlify setting change.

---

## 4. What is still needed before build

1. **Repo write access** (token) OR user creates `portfolio-redesign` from `main` — to host the redesign branch.
2. **Confirm build command / publish dir / env vars** from Netlify UI (Settings → Build & deploy) — public API hides them.
3. **PES / MOVA assets** (absent).
4. **CINIS Figma file link** + permission to write case-study copy from the prototype.
5. **Personal info** (bio, email, socials, resume) — no fabrication.

---

## 5. Reusable components / learnings from CINIS source

| Item | Reusability for portfolio |
|---|---|
| Design-token pattern (`src/styles/tokens.ts`, CSS vars) | Good reference for a token system; do not import the game palette directly. |
| `Screen` phone-shell component + CSS Modules | Reusable pattern for embedding phone-frame case-study previews (and the CINIS iframe). |
| `TiltCard.tsx` (pointer-tilt card) | Directly reusable interaction for project covers (aligns with ReactBits "Tilted Card"). |
| Hash routing pattern | Too simple for a multi-page portfolio; a real router (e.g., React Router) will be chosen instead. |
| Figma-exported PNG/SVG art | **Primary hero & case-study imagery** (see ASSET-INVENTORY / ASSET-BACKUP-MANIFEST). |
| `BottomNav` sliding indicator (transform + cubic-bezier 380ms) | Motion reference for a nav underline/indicator. |

> Core rule: **preserve, don't destroy.** CINIS's existing content and prototype remain intact — it is *repurposed* as the portfolio's flagship case study, not deleted. The existing prototype stays reachable (live demo + optional in-page iframe).

---

## 6. Local backup (executed this round)

- **Location:** `assets/source/CINIS-webdemo/` (full `git clone --depth 1`, commit `cb91106220f0dcf7a0d063b21262207a4a96a96d`).
- **Scope backed up:** entire repo — `public/assets` (66 files, 4,855,835 bytes), `src/` (90 files: 31 page `.tsx`, 15 component files, data/styles), configs, README.
- **Hashes:** `assets/source/cinis-assets-hashes.csv` (per-file SHA256 + bytes).
- **Manifest:** `docs/ASSET-BACKUP-MANIFEST.md` (human-readable full listing).
- **Immutability:** originals are read-only; processed outputs go to `assets/projects/cinis/*` (never overwrite source).


---

## 7. PHASE 29 — STATUS UPDATE（supersedes §4 items where noted）

> 本节为最新状态，覆盖 Phase 01 审计中的部分假设；历史内容保留。

- **实现形态**：作品集以**静态原型**交付，位于 `repo/experiments/art-direction/direction-b-modern-editorial/`（Modern Editorial；HTML/CSS/JS + 少量 vanilla WebGL shader），**不是** Phase 01 设想的 React Router 重构。分支 `portfolio-redesign` 已有完整提交历史；**尚未 push**（无写权限/token），未改 `main`/`gh-pages`。
- **MOVA 素材**：15 屏真实界面 + `mova.html` 案例页已建成（取代 §4.3「MOVA assets absent」）。仍缺：完整影院列表/详情、最终浅色 Design System、原型公开访问权限。
- **PES 素材**：已在用户课程资料找到真实展板（`300dpi.jpg` 7442×5264 等）并建成 `pes.html`（取代 §4.3「PES assets absent」）。仍缺：工程测试数据、角色/周期/参赛获奖。
- **CINIS**：原型 23 屏；已抓取 18 屏 + 完成方式弹层，页面展示 17 状态；仍缺 Figma 源文件、研究/测试资料、少量次要状态截图。
- **个人信息**：About 已使用确认信息（颜夕和 · 浙江科技大学产品设计 · 大三 · UI/UX 与交互设计）；**Gmail / 简历 / 社交链接仍缺**（§4.5 仍未解决）。
- **Phase 29 全站复核**：的首页、作品、About、Contact、CINIS、PES、MOVA 七页，在 1440 与 390 下均无破图/缺 alt/失效链接/横向溢出/可见 TODO；本地 href/src 全部解析。
