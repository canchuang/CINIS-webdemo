# DESIGN COMPARISON

> Compares the three visual directions across seven dimensions. Scores 1–5 (5 = best). For "技术复杂度", 5 = **lowest/cleanest complexity** (easier, more maintainable).
> Prototypes: `repo/experiments/art-direction/direction-{a,b,c}/`. This document recommends; it does **not** decide — final choice is the user's.

---

## 1. Score matrix

| 维度 / Dimension | A · Typographic Brutalism | B · Editorial Contrast | C · Kinetic Experimental |
|---|:--:|:--:|:--:|
| 视觉辨识度 Distinctiveness | **5** | 4 | 5 |
| 阅读体验 Reading experience | 3 | **5** | 3 |
| 作品展示能力 Work showcase | 3 | **5** | 4 |
| UI/UX 专业表达 Professional expression | 4 | **5** | 4 |
| 动效可行性 Motion feasibility | 4 | 4 | **5** |
| 技术复杂度 Technical complexity (5=easiest) | **5** | **5** | 3 |
| 移动端适配 Mobile adaptation | 4 | **5** | 3 |
| **合计 Total /35** | **28** | **33** | **27** |

---

## 2. Dimension-by-dimension

### 2.1 视觉辨识度 (Distinctiveness)
- **A = 5.** Monochrome + oversized Archivo Black + grain is instantly ownable; reads as "a designer with a position". Risks polarizing.
- **B = 4.** Fraunces + terracotta is refined and distinctive but within a known editorial genre; less "shocking", more "tasteful".
- **C = 5.** Dark gradient + kinetic type + glow is the most contemporary/memorable — but this aesthetic is also common in 2024–26 portfolios, so distinctiveness depends on execution.

### 2.2 阅读体验 (Readability)
- **B = 5.** Serif body, narrow measure, clear hierarchy, captions — genuinely readable long-form case studies.
- **A = 3.** Brutalist density and huge type can fight legibility; fine for headlines, tiring for long text.
- **C = 3.** Glow/background and motion can reduce contrast and focus; needs careful restraint.

### 2.3 作品展示能力 (Work showcase)
- **B = 5.** Magazine proportions put the *work* centre-stage with captions — best for a UI/UX portfolio judged on craft.
- **C = 4.** Cinematic and immersive; strong hero, but glow/dark can compete with the work itself.
- **A = 3.** Very editorial but the work can become secondary to the typographic gesture.

### 2.4 UI/UX 专业表达 (Professional expression)
- **B = 5.** Signals typographic literacy, systems thinking, restraint — the exact signals a hiring design lead reads.
- **A = 4.** Bold and confident; strong POV, but can read as "graphic designer" more than "product/UX".
- **C = 4.** Shows motion/interaction range; risk of style over substance.

### 2.5 动效可行性 (Motion feasibility)
- **C = 5.** Motion-first by design; clear motion vocabulary.
- **A = 4.** Hover invert/marquee are cheap and robust; limited "wow".
- **B = 4.** Subtle zoom/underline reveals — elegant, easy, but understated.

### 2.6 技术复杂度 (lower is easier; 5 = easiest)
- **A = 5 / B = 5.** Pure HTML/CSS, trivial to port to React + CSS Modules. No perf risk.
- **C = 3.** Animated blurs, canvas/JS observers, cursor tracking → more perf/a11y precautions (reduced-motion, GPU, mobile).

### 2.7 移动端适配 (Mobile adaptation)
- **B = 5.** Single-column editorial is natural on mobile; type scale degrades gracefully.
- **A = 4.** Works, but oversized display + hard rules need careful tightening.
- **C = 3.** Heavy blur/animation needs disabling/reducing on mobile; more work to keep 60fps.

---

## 3. Qualitative read

| | A · Brutalism | B · Editorial | C · Kinetic |
|---|---|---|---|
| Best for | A bold **statement** portfolio; standing out hard | A **credibility-first** portfolio that showcases case-study craft | A **motion/experimental** identity; interaction-heavy work |
| Weakest at | Long-form readability, warmth | Feeling "experimental enough" | Focus, performance, production cost |
| Effort to productionize | Low | Low–medium | Medium–high |

---

## 4. Recommendation (for user decision — not final)

**Recommended primary direction: Direction B — Editorial Contrast**, enhanced with selective motion from **Direction C**.

**Why B:**
1. **Best total (33/35)** and the only direction that is simultaneously strong on readability *and* work-showcase — the two things that actually get a UI/UX designer hired.
2. **Editorial typography** directly satisfies the brief's "Typography-driven / Editorial Art Direction" mandate without sacrificing legibility.
3. **Lowest production risk** (easy mobile, easy a11y, cheap to build in React).
4. Its single terracotta accent leaves room for per-project accents (CINIS blue, etc.) without a redesign.

**How to inject the other directions:**
- Take **C's motion system** (scroll-reveal, restrained kinetic hero, subtle hover) applied *sparingly* on top of B's editorial layout — "B's calm, C's pulse".
- Borrow **A's oversized display type** *only* in the hero and section breaks for a shot of brutalist confidence.

**If the user's priority is "stand out / art-directed at all costs"**, Direction A is the alternative recommendation — accept the readability tradeoff for maximum distinctiveness.

**If the user's priority is "experimental motion / interaction designer"**, Direction C is the choice — budget for performance + reduced-motion work.

> **Not decided here.** Awaiting user's pick among A / B / C / hybrid.

---

## 5. Open decisions surfaced by the comparison

1. Which direction (or hybrid) is the base? *(recommend B + C's motion)*
2. How experimental may the hero be (calm editorial vs bold kinetic)?
3. Accent strategy: keep a single accent (B) or per-project accents?
4. Confirm final typeface licensing (Fraunces, Archivo Black, Bricolage, Inter, IBM Plex Mono are all open-source / OFL — free for commercial use).
5. Motion budget & performance target on mobile.
