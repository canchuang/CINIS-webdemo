import type { GameMode } from './content'

export type SettleMode = {
  duration: string
  hero: string
  soul: string
  mode: string
  /** 大标题 */
  title: string
  /** 副标题（含完成率） */
  subtitle: string
  rows: { label: string; value: string; accent?: boolean }[]
  /** 称号解锁卡（稿子里旅者有，深渊没有） */
  badge?: { title: string; sub: string }
  /** 次要按钮（稿子里的「回到首页」） */
  backLabel?: string
}

export const modeSettle: Record<GameMode, SettleMode> = {
  traveler: {
    duration: '3s',
    hero: '/assets/settle-traveler.png',
    soul: '140',
    mode: '旅者',
    title: '试炼已终。',
    subtitle: '本阶段历经七日 · 全额结算',
    rows: [
      { label: '完成任务', value: '14 / 21' },
      { label: '阶段完成率', value: '67% · 铜徽章' },
      { label: '永久经验', value: '+320 XP · 660 → 980' },
      { label: '真实专注', value: '5 小时 40 分' },
    ],
    badge: { title: '解锁称号 · 旅途初行者', sub: '首次完成旅者模式的阶段 · 普通' },
    backLabel: '回到首页',
  },

  knight: {
    duration: '6s',
    hero: '/assets/settle-knight.png',
    soul: '180',
    mode: '骑士',
    title: '试炼已终',
    subtitle: '本阶段历经七日 · 达 85% 门槛',
    rows: [
      { label: '完成任务', value: '18 / 18' },
      { label: '阶段完成率', value: '100% · 金徽章' },
      { label: '永久经验', value: '+420 XP · 660 → 1080', accent: true },
      { label: '真实专注', value: '7 小时 20 分' },
    ],
    badge: { title: '解锁称号 · 誓约骑士', sub: '首次完成骑士模式的阶段 · 稀有' },
  },

  abyss: {
    duration: '8s',
    hero: '/assets/settle-abyss.png',
    soul: '250',
    mode: '深渊',
    title: '深渊见证了你的坚持',
    subtitle: '本阶段历经五日 · 100% 达成',
    rows: [
      { label: '完成任务', value: '20 / 20' },
      { label: '阶段完成率', value: '100% · 金徽记' },
      { label: '永久经验', value: '+1000 XP · 660 → 1660', accent: true },
      { label: '真实专注', value: '8 小时 20 分' },
    ],
    backLabel: '回到首页',
  },
}
