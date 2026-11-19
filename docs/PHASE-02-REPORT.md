# PHASE 02 REPORT — Round 2 (Repo confirmed · CINIS preserved as case study)

> Date: 2026-11-19 (Asia/Shanghai) · Role: tech lead / PM / design engineer
> Scope this round: **confirm Netlify↔GitHub relationship · inventory + back up existing CINIS site · update docs.** No pages built, no production change, no deploy.

---

## 1. Repository relationship — ✅ CONFIRMED (Rule A)

Verified via the Netlify **public site object** (`GET https://api.netlify.com/api/v1/sites/cinis.netlify.app` → HTTP 200) and deploy object:

| Item | Value |
|---|---|
| Netlify site name | `cinis` |
| Production URL | **`https://cinis.netlify.app`** |
| Admin | `https://app.netlify.com/projects/cinis` |
| GitHub repository | **`https://github.com/canchuang/CINIS-webdemo`** |
| Production branch | **`main`** |
| Production deploy | commit `cb91106220f0dcf7a0d063b21262207a4a96a96d`, context `production`, state `ready`, 2026-11-18 |
| Branch deploy | `https://main--cinis.netlify.app` |
| Custom domain | none |
| Account | `canchuang` (鬼杀队) |
| Build command / publish dir / env | not exposed publicly → **TODO confirm in UI** (inferred `pnpm build` → `dist/`) |

**Decision:** Rule A — develop on `CINIS-webdemo`, production `main` untouched, work on `portfolio-redesign` (from `main`) surfaced via Deploy Preview. **This round: no branch pushed (needs repo write access); no `main`/`gh-pages` change; no deploy.**

Verified extra: Netlify serves its **own** build (`index-Cdhj1u-2.js`), distinct from GH Pages (`index-Btp5yLpM.js`) — both are the same CINIS app.

---

## 2. Asset backup — ✅ COMPLETE (nothing lost)

- **Read-only clone:** `assets/source/CINIS-webdemo/` @ `cb91106` (≈ 4.92 MB incl. `.git`).
- **`public/assets`:** 66 files, **4,855,835 bytes**, all SHA256-hashed → `assets/source/cinis-assets-hashes.csv`.
- **Unique contents:** 45 (several duplicate-named PNGs share hashes — dedup when producing web assets).
- **Full application source** also backed up (31 page `.tsx`, components, `content.ts`, tokens, configs) so the prototype can be rebuilt/iframe-embedded.
- **Manifest:** [`ASSET-BACKUP-MANIFEST.md`](ASSET-BACKUP-MANIFEST.md) (per-file table + checksums).
- **Directory skeleton created:** `assets/projects/cinis/{characters,screens,illustrations,icons,growth-system,interaction,content}/`, `assets/projects/{portable-energy-storage,mova}/`, `assets/source/`.
- **Immutability:** originals read-only; processed outputs saved separately under `assets/projects/cinis/*`.

---

## 3. Documentation updated (paths)

| Doc | What changed |
|---|---|
| [`docs/PRD.md`](PRD.md) | Doc-status → repo confirmed; §18 deployment rewritten to confirmed facts + Rule A branch model; §14 asset structure → actual `assets/projects`/`assets/source` tree; §19 roadmap unblocked; removed stale Rule-C text. |
| [`docs/ASSET-INVENTORY.md`](ASSET-INVENTORY.md) | Added §0 backup status; CINIS source-of-truth now lists **both** live sites + local backup; screen-capture routes expanded (28 keys). |
| [`docs/TECH-AUDIT.md`](TECH-AUDIT.md) | §2 rewritten with full Netlify site-object facts; §3 → **Rule A applies**; §4 remaining needs; added §6 local backup. |
| [`docs/OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md) | Q1/Q2 **CLOSED**; new Q2b (write access + build settings); Q3/Q4/Q5/Q6 still open. |
| [`docs/ASSET-BACKUP-MANIFEST.md`](ASSET-BACKUP-MANIFEST.md) | **NEW** — full hashed backup manifest. |
| [`docs/PHASE-01-REPORT.md`](PHASE-01-REPORT.md) | Marked SUPERSEDED (historical Round-1). |
| `docs/DESIGN-DIRECTION.md` | unchanged (still valid). |

---

## 4. Next-phase execution plan

**Gate 0 — unblock (needs you):**
1. Repo **write access**: provide a `GITHUB_TOKEN`/PAT (repo scope) **or** create `portfolio-redesign` from `main` yourself.
2. Confirm Netlify **build command / publish dir / env vars** (Settings → Build & deploy).
3. Provide **PES** and **MOVA** assets; **CINIS Figma link**; personal info (bio/email/socials/resume).

**Then (agent):**
- **Phase 02b — Screen capture:** headless-capture the 23 CINIS screens at 390×844 @2× into `assets/projects/cinis/screens/`; dedup+optimize to WebP/AVIF.
- **Phase 03 — Content:** author CINIS case-study copy (12-section narrative) from prototype + `content.ts` (on your OK); stub PES/MOVA with honest "素材待补充".
- **Phase 04 — Design system:** moodboard, final type/color/space/motion tokens, key-page static comps (Experimental Art Direction).
- **Phase 05 — Hi-fi + motion:** per-page design + motion prototypes (ReactBits/Transitions.dev principles).
- **Phase 06 — Build:** scaffold on `portfolio-redesign`, implement pages/components/router/motion/responsive/a11y/SEO/perf; **CINIS prototype embedded via phone-frame iframe + external demo link retained**.
- **Phase 07 — Deploy Preview:** push branch → Netlify Deploy Preview for review; **production switch only after your sign-off**.

**Safety:** `main` and `gh-pages` remain untouched throughout; `cinis.netlify.app` keeps serving the prototype until you approve a switch.

---

## 5. Round 3 update — dev branch created

- ✅ User created **`portfolio-redesign`** from `main` (verified: remote ref → `cb91106` = `main` HEAD).
- Production `main` / `gh-pages` unchanged; no deploy triggered.
- Remaining to push code: `canchuang`-owned token in `.secrets/github_token.txt` (or user pushes agent-produced patch).
