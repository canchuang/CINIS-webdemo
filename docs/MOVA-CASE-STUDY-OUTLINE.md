# MOVA CASE STUDY — OUTLINE (pre-build)

> Phase 07 · Based only on the 15 real screens received (see `MOVA-ASSET-REPORT.md`). Structure developed; page not yet built.
> Portfolio shell uses the unified **Modern Editorial** system; MOVA's **own visual language (orange-red, rounded cards) is preserved** inside the case study.

---

## 1. Positioning (from screens — inferred, not research)
MOVA 是一款**电影发现与购票**应用：从选城市、看热映/即将上映，到影片详情、选场次、选座、下单支付、出电子票、管理订单与收藏，覆盖观影前的完整决策与交易链路。
> ⚠️ 项目定位的正式表述、目标用户与研究成果 **TODO（未提供研究材料，不虚构）**。

## 2. Information Architecture (observed)
- **底部三 Tab：** 电影 · 影院 · 我的
- **电影：** 城市选择 → 热映 / 即将上映 → 影片详情（详情 / 场次）
- **影院：** 影院列表（TODO：未提供影院 Tab 截图，仅底部存在）
- **我的：** 头像/城市、想看 / 已看、我的订单（全部/待支付/已完成）、优惠券、通知、支付方式、关于 MOVA

## 3. Main ticketing flow (observed)
Splash → 电影首页 → 影片详情 → 场次（按时段 / 按影院，格式/价格/距离筛选）→ 选座（含最佳座位推荐）→ 确认订单（票×2、服务费、优惠券立减）→ 支付 → 支付成功（电子票 + 条码）→ 我的订单

## 4. Key interactions (inferred from states)
- **场次筛选：** 时间优先 / 影院优先 切换；2D/IMAX/4D 格式标签；价格 + 距离展示；"余票不多"提示。
- **选座：** 银幕弧线 + 座位网格；图例「可选 / 已告 / 最佳位置」；橙色"推荐"浮标；缩放视图。
- **结算：** 自动套用"电影之夜·立减¥10"优惠券，合计从 ¥91 → ¥81。
- **成功页：** 电子票卡 + 条形码 + 订单号；「查看票券 / 查询订单进度」。
> 说明：上述为**从截图状态推断**的交互说明，非用户研究结论。

## 5. UI visual system (observed)
- 主操作色：橙红（购票/主按钮）；浅灰白底 + 圆角卡片；海报为深色大图；评分/标签用中性灰与状态色。
- 字体：系统无衬线；层级以字重与字号区分。
- 组件：底部 Tab、筛选胶囊、场次行、座位格、优惠券卡、电子票卡。
> 具体色值/字号 **TODO**：截图近似，需原始规范（Figma）确认。

## 6. High-fidelity screens available (15)
Splash · Movie(logged out/in) · Movie About(×2) · Sessions(time/cinema) · Seat overview · Seat select · Selected seat · Checkout · Payment(×2) · Payment success · Mine.

## 7. Prototype
**MISSING** — no interactive prototype/Figma link provided. Case study will present static hi-fi screens + flow; prototype entry marked TODO until provided.

## 8. Planned case-study narrative (13 sections, mirroring CINIS)
1. Cover — MOVA wordmark / hero screen
2. Overview — role, scope, what it is
3. Background — movie-discovery→booking context *(research TODO)*
4. Problem — friction in choosing showtime & seats *(hypothesis, mark as such)*
5. Positioning — discovery + transaction in one flow
6. Information Architecture — 3 tabs + trees
7. Main Booking Flow — sessions → seat → checkout → success
8. Sessions & Seat Interaction — filters, seat map, best-seat recommendation
9. UI Visual System — orange-red accent, cards, components (preserve original)
10. High-Fidelity Screens — large + detail zoom, varied ratios
11. Checkout & Payment — coupon math, e-ticket
12. Prototype — TODO (no link)
13. Reflection — TODO (no metrics)

## 9. Needed from user (to build fully)
- 交互原型链接（Figma / 在线）· 影院 Tab 截图 · 项目定位/研究/竞品资料 · 原始视觉规范（色值/字号）· 成果数据（若有）。
