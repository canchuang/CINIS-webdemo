export type Task = {
  id: string
  title: string
  duration: string
  xp: number
  soul: number
  done: boolean
}

export type ChallengeInfo = {
  mode: string
  stage: string
  day: string
  quote: string
  soul: number
  soulMax: number
  threshold: string
  todayDone: number
  todayTotal: number
}

export type Goal = {
  id: string
  title: string
  mode: string
  weekly: number
  daily: number
  progress: number
  status: '进行中' | '待开始'
  dayIndex?: number
}

/** 数据来自 Figma 稿 P11 / P05 / P37 / P34 等页面的真实文案 */
export const challengeForTraveler: ChallengeInfo = {
  mode: '旅者',
  stage: '第一阶段',
  day: '第 3 / 7 天',
  quote: '走多远，算多远',
  soul: 100,
  soulMax: 120,
  threshold: '无门槛',
  todayDone: 2,
  todayTotal: 3,
}

export const tasksForTraveler: Task[] = [
  { id: 't1', title: '跟读复述 1 段', duration: '20 分钟', xp: 40, soul: 10, done: false },
  { id: 't2', title: '背诵 20 个生词', duration: '15 分钟', xp: 20, soul: 5, done: true },
  { id: 't3', title: '精听 BBC 6 Minute', duration: '25 分钟', xp: 40, soul: 10, done: true },
]

export const goals: Goal[] = [
  {
    id: 'g1',
    title: '英语精听 · 30 天',
    mode: '骑士',
    weekly: 5,
    daily: 3,
    progress: 0.57,
    status: '进行中',
    dayIndex: 12,
  },
  {
    id: 'g2',
    title: '每周三次力量训练',
    mode: '旅者',
    weekly: 3,
    daily: 1,
    progress: 0.67,
    status: '进行中',
  },
  {
    id: 'g3',
    title: '每天读 20 页书',
    mode: '旅者',
    weekly: 7,
    daily: 1,
    progress: 0.42,
    status: '进行中',
  },
  {
    id: 'g4',
    title: '期末高数 85+',
    mode: '未开始',
    weekly: 4,
    daily: 2,
    progress: 0,
    status: '待开始',
  },
]

/** 目标详情页（P06 / P07）用的完整字段 */
export const goalDetail = {
  id: 'g1',
  title: '英语精听 · 30 天',
  mode: '骑士',
  dayIndex: 12,
  progress: 0.57,
  toTarget: 5,
  settings: [
    { key: 'frequency', label: '执行频率', value: '每周 5 天' },
    { key: 'daily', label: '每天任务', value: '3 项' },
    { key: 'remind', label: '提醒', value: '21:00' },
    { key: 'rest', label: '休息日', value: '每周 2 天' },
    { key: 'standard', label: '完成标准', value: '填真实数值' },
  ],
  weekdays: [
    { label: '一', on: true },
    { label: '二', on: true },
    { label: '三', on: true },
    { label: '四', on: true },
    { label: '五', on: true },
    { label: '六', on: false },
    { label: '日', on: false },
  ],
  todayTasks: [
    { title: '精听 BBC 6 Minute', state: '已完成' as const },
    { title: '背诵 20 个生词', state: '已完成' as const },
    { title: '跟读复述 1 段', state: '进行中' as const },
  ],
}

export const growthStats = {
  level: 'Lv.08',
  xp: 680,
  xpMax: 800,
  tier: '微光段位',
  character: '骑士 · L2 誓约',
  weekly: [0.42, 0.55, 0.4, 0.92, 0.5, 0.78, 0.86],
  avg: 81,
  delta: '+4%',
  badges: ['/assets/badge-1.png', '/assets/badge-2.png', '/assets/badge-3.png'],
  totals: [
    { label: '完成轮次', value: '28 / 32' },
    { label: '累计魂火', value: '+4,180' },
    { label: '有效专注', value: '61 小时' },
    { label: '活跃天数', value: '41 天' },
  ],
  week: [
    { label: '完成任务', value: '11 / 21' },
    { label: '投入专注', value: '4 小时 20 分' },
    { label: '结算魂火', value: '+180' },
  ],
}

export const me = {
  name: '乐乐',
  avatar: '乐',
  title: '踏火之人',
  level: 'Lv.08',
  xp: 680,
  xpMax: 800,
  toNextTier: 120,
  nextTier: '微光段位',
  groups: [
    {
      label: '成长',
      items: [
        { id: 'notify', title: '通知设置', desc: '提醒时间、频率', to: 'reminderSettings' },
        { id: 'wall', title: '成就墙', desc: '12 / 32 枚', to: 'achievements' },
        { id: 'history', title: '历史记录', desc: '41 轮', to: 'history' },
      ],
    },
    {
      label: '偏好',
      items: [
        { id: 'feedback', title: '成长反馈偏好', desc: '要不要每次打卡都提示', to: 'reminderSettings' },
        { id: 'privacy', title: '数据与隐私', desc: '本地存储、导出、清除', to: 'privacy' },
      ],
    },
  ] as { label: string; items: { id: string; title: string; desc: string; to: string }[] }[],
}

/** 专注计时页（P13） */
export const focusState = {
  taskTitle: '整理错题本',
  remaining: '12:48',
  remainingHint: '剩余 12 分 48 秒',
  elapsedRatio: 0.488, // 12:12 / 25:00
  elapsed: '12:12',
  plan: '25:00',
  reward: '+40 XP · +10 魂火',
}

/** 任务完成反馈（P10） */
export const taskDoneInfo = {
  title: '行动已记录。',
  task: '整理错题本',
  meta: '30 分钟 · 第 12 天',
  xp: '+60 XP',
  xpRange: '660 → 720',
  soul: '+15',
  soulRange: '140 → 155',
  todayRatio: 0.75,
  todayText: '今日 3 / 4',
  remainText: '还剩 1 项：跟读复述 1 段（20 分钟）',
  streak: 12,
  streakMax: 19,
  streakHint: '距新称号还差 8 天',
}

/** 阶段进度（P14） */
export const stageInfo = {
  dayLabel: '第 4 天',
  done: 14,
  total: 21,
  rate: 0.67,
  remain: 7,
  rows: [
    { label: '已完成任务', value: '14 / 21' },
    { label: '有效专注', value: '5 小时 40 分' },
    { label: '暂存魂火', value: '100 / 120' },
    { label: '裂痕', value: '0 / 2' },
  ],
  daily: [
    { label: '周一', value: '3 / 3' },
    { label: '周二', value: '2 / 3' },
    { label: '周三', value: '3 / 4' },
    { label: '周四', value: '0 / 4' },
  ],
}

/** 阶段结算（P15） */
export const settleInfo = {
  mode: '旅者',
  duration: '3s',
  heroSrc: '/assets/settle-traveler.png',
  title: '试炼已终。',
  sub: '本阶段历经七日 · 全额结算',
  label: '结算魂火 · 一次性',
  soul: '140',
  rows: [
    { label: '完成任务', value: '14 / 21' },
    { label: '阶段完成率', value: '67% · 铜徽章' },
    { label: '永久经验', value: '+320 XP · 660 → 980' },
    { label: '真实专注', value: '5 小时 40 分' },
  ],
  badge: { title: '解锁称号 · 旅途初行者', sub: '首次完成旅者模式的阶段 · 普通' },
  cta: '继续征途',
  foot: '称号与经验不因后续失败收回。',
}

/** 终止 / 后续（P16 / P17） */
export const terminalInfo = {
  title: '进度停在这里',
  card: { title: '本轮没有任何损失', sub: '魂火 120 全额结算，记录照常计入历史。' },
  keepLabel: '保留',
  keepHint: '不会因失败收回',
  rows: [
    { label: '永久经验', value: '240 XP' },
    { label: '已完成任务', value: '12 项' },
    { label: '累计专注', value: '8 小时' },
    { label: '已获称号', value: '全部保留' },
  ],
  secondary: '换个模式',
  primary: '继续本轮 · 还剩 3 天',
}

export const rekindleInfo = {
  title: '从一簇小火开始',
  sub: '旅者没有损失可追回，只需决定下一轮怎么走。',
  options: [
    { title: '沿用原计划', sub: '7 天，每天 3 项', selected: false },
    { title: '降低强度', sub: '7 天，每天 2 项', selected: true },
    { title: '先休息几天', sub: '不设开始时间', selected: false },
  ],
  secondary: '换个模式',
  primary: '点燃新一轮',
}

/** 重燃与回归（P39，深色） */
export const comebackInfo = {
  title: '你回来了',
  sub: '断了 9 天。永久成长都还在，魂火从零开始。',
  kept: [
    { label: '永久经验', value: '1,240 XP' },
    { label: '持有称号', value: '12 枚' },
    { label: '历史记录', value: '41 轮' },
  ],
  howTo: '要怎么开始',
  options: [
    { title: '从今天重新点一把火', sub: '7 天，每天 3 项' },
    { title: '先只设一个任务', sub: '5 天，每天 1 项' },
  ],
  primary: '点燃火种，重新开始',
  foot: '持续不是从不中断，是愿意回来。',
}

/** 成就墙（P36，深色殿堂） */
export const achievementsInfo = {
  total: 12,
  spotlight: { name: '不灭誓约 · 已点亮' },
  titles: [
    { name: '能量满溢', tone: 'ember' as const },
    { name: '自律战神', tone: 'accent' as const },
    { name: '未获得称号', tone: 'muted' as const },
  ],
  tabs: ['旅程成就', '试炼成就', '深渊成就'],
  sectionLabel: '天数成就',
  sectionMeta: '累计 41 天',
  badges: [
    { name: '打卡 1 天', src: '/assets/badge-1.png' },
    { name: '打卡 7 天', src: '/assets/badge-2.png' },
    { name: '打卡 21 天', src: '/assets/badge-3.png' },
    { name: '连胜 7 天', src: '/assets/badge-1.png' },
    { name: '专注 10 小时', src: '/assets/badge-2.png' },
    { name: '全部完成', src: '/assets/badge-3.png' },
  ],
  foot: '称号只升不降，失败不收回',
}

/** 角色档案（P37B） */
export const characterFileInfo = {
  name: '骑士 · L2 誓约',
  rounds: '已完成 3 轮',
  heroSrc: '/assets/character-knight.png',
  stages: [
    { code: 'L0', name: '初火', done: true, current: false },
    { code: 'L1', name: '行装', done: true, current: false },
    { code: 'L2', name: '誓约', done: true, current: true },
    { code: 'L3', name: '余烬', done: false, current: false },
    { code: 'L4', name: '长明', done: false, current: false },
  ],
  looks: [
    { name: '旅者', src: '/assets/character-traveler.png', active: false },
    { name: '骑士', src: '/assets/character-knight.png', active: true },
    { name: '深渊', src: '/assets/character-abyss.png', active: false },
  ],
  titleLabel: '称号',
  titleValue: '守誓者',
  titleCount: '3 / 8',
}

/** 历史记录（P38） */
export const historyInfo = {
  totalRounds: 41,
  summary: '最近七轮 5 完成 · 2 熄灭',
  filters: ['全部', '已完成', '熄灭', '恢复'],
  rows: [
    { date: '3.05 – 3.11', name: '骑士 · 第二阶段', sub: '7 天 · 100%', done: 21, total: 21, soul: '+210', tone: 'pos' },
    { date: '2.24 – 3.02', name: '深渊 · 第五轮', sub: '熄灭 · 裂痕满', done: 12, total: 20, soul: '−250', tone: 'neg' },
    { date: '2.17 – 2.23', name: '旅者 · 第二阶段', sub: '7 天 · 67%', done: 14, total: 21, soul: '+140', tone: 'pos' },
    { date: '2.10 – 2.16', name: '骑士 · 第一阶段', sub: '7 天 · 90%', done: 19, total: 21, soul: '+170', tone: 'pos' },
    { date: '2.03 – 2.09', name: '深渊 · 第四轮', sub: '主动结束', done: 7, total: 20, soul: '−70', tone: 'neg' },
    { date: '1.27 – 2.02', name: '旅者 · 第一阶段', sub: '7 天 · 57%', done: 12, total: 21, soul: '+120', tone: 'pos' },
    { date: '1.20 – 1.26', name: '骑士 · 第一阶段', sub: '7 天 · 86%', done: 18, total: 21, soul: '+180', tone: 'pos' },
  ] as { date: string; name: string; sub: string; done: number; total: number; soul: string; tone: 'pos' | 'neg' }[],
  totals: [
    { label: '完成轮次', value: '28 / 32' },
    { label: '累计魂火', value: '+4,180' },
    { label: '平均完成率', value: '81%' },
  ],
  foot: '失败轮次同样归档，记录不会被删除。',
}

/** 提醒设置（P32） */
export const reminderInfo = {
  mainToggle: { title: '21:00 提醒还没完成的任务', sub: '只在有未完成任务时推送', on: true },
  times: ['07:30', '12:30', '21:00', '22:30'],
  activeTime: '21:00',
  scenes: [
    { title: '补做窗口到期前 4 小时', sub: '避免因为忘记而记裂痕', on: true },
    { title: '阶段结束前一天', sub: '提醒还剩多少项', on: true },
    { title: '篝火结算可进行时', sub: '只在有可结算魂火时', on: true },
    { title: '连续 3 天未打开', sub: '一次温和召回，不连发', on: false },
  ],
  dnd: { title: '免打扰', value: '23:00 – 08:00 不推送' },
}

/** 数据与隐私（P33） */
export const privacyInfo = {
  local: { title: '数据默认存在本机', sub: '任务内容、完成记录、魂火账本都不上云。卸载即删除。' },
  exports: [
    { title: '导出全部记录', sub: 'CSV · 含每轮挑战与任务明细' },
    { title: '导出成长报告', sub: 'PDF · 等级、趋势与阶段回顾' },
  ],
  perms: [
    { label: '通知', value: '已开启' },
    { label: '健康数据', value: '未接入' },
    { label: '相册', value: '仅保存图片时使用' },
  ],
  clear: { title: '清除', sub: '清除后不可恢复，永久成长也会一起清空。', action: '删除这个目标' },
  foot: { title: 'CINIS 没有社交功能', sub: '不上传好友关系、不展示排行榜，也不读取通讯录。' },
}

/** 引导页（P01 / P01b / P02） */
export const onboardingInfo = {
  splash: { eyebrow: '自灰烬中，再次前行', brand: 'CINIS', tagline: 'RISE FROM THE ASHES', version: 'v1.0' },
  roles: {
    chapter: '序章 · 角色选择',
    brand: 'CINIS',
    title: '于灰烬中，择一身',
    sub: '火将熄，路未尽。选择与你同行的化身。',
    cards: [
      { numeral: 'Ⅰ', name: '旅者', en: 'TRAVELER', tag: '缓步前行', quote: '纵身向无边深暗，也要亲手点燃属于自己的归途。' },
      { numeral: 'Ⅱ', name: '骑士', en: 'KNIGHT', tag: '持誓不返', quote: '誓言并不会替你前行，它只在你退缩时提醒你为何出发。' },
      { numeral: 'Ⅲ', name: '深渊', en: 'ABYSS', tag: '向暗而生', quote: '深渊不予馈赠，只以代价回应觊觎。' },
    ],
    footer: '灰烬未冷，来路由你',
    cta: '启程',
  },
  concept: {
    brand: 'CINIS',
    title: ['两种成长，', '一种会失去。'],
    sub: '魂火是这一轮挣的，会随失败消失；经验与等级是你的，谁也拿不走。',
    blocks: [
      { title: '永久成长', items: '经验 · 等级 · 称号', note: '失败、退出、重开都不影响' },
      { title: '魂火', items: '本轮暂存，未结算可失落', note: '只有撑过阶段才真正属于你' },
    ],
    cta: '下一步',
  },
}

/** 完成方式弹层（11A） */
export const chooseModeInfo = {
  task: '跟读复述 1 段',
  meta: '20 分钟 · +40 XP · +10 魂火',
  focus: { title: '点火专注', meta: '20 min · +40 XP', rule: '随时可暂停 · 无次数限制' },
  quick: { title: '快速打卡', meta: '不计专注时长，也不进入专注记录' },
}

/* ================= 三模式数据 ================= */
export type GameMode = 'traveler' | 'knight' | 'abyss'

export type ModeChallenge = ChallengeInfo & {
  key: GameMode
  label: string
  character: string
  /** 休息（闭眼/睡觉）立绘 */
  restCharacter: string
  /** 门槛显示，如「无门槛」「85% 门槛」「100% 门槛」 */
  gate: string
}

export const modeChallenges: Record<GameMode, ModeChallenge> = {
  traveler: {
    key: 'traveler',
    label: '旅者',
    stage: '第一阶段',
    day: '第 3 / 7 天',
    quote: '走多远，算多远',
    soul: 100,
    soulMax: 120,
    threshold: '无门槛',
    gate: '无门槛',
    todayDone: 2,
    todayTotal: 3,
    mode: '旅者',
    character: '/assets/character-traveler.png',
    restCharacter: '/assets/rest-traveler.png',
  },
  knight: {
    key: 'knight',
    label: '骑士',
    stage: '第一阶段',
    day: '第 4 / 7 天',
    quote: '七日之后，誓言兑现',
    soul: 120,
    soulMax: 170,
    threshold: '85% 门槛',
    gate: '85% 门槛',
    todayDone: 2,
    todayTotal: 3,
    mode: '骑士',
    character: '/assets/character-knight.png',
    restCharacter: '/assets/rest-knight.png',
  },
  abyss: {
    key: 'abyss',
    label: '深渊',
    stage: '第二阶段',
    day: '第 3 / 5 天',
    quote: '深渊不许诺归途',
    soul: 140,
    soulMax: 250,
    threshold: '100% 门槛',
    gate: '100% 门槛',
    todayDone: 3,
    todayTotal: 4,
    mode: '深渊',
    character: '/assets/character-abyss.png',
    restCharacter: '/assets/rest-abyss.png',
  },
}

/** 各模式今日任务（旅者/骑士一致，深渊多一项且时长不同） */
export const modeTasks: Record<GameMode, Task[]> = {
  traveler: tasksForTraveler,
  knight: tasksForTraveler.map((t) => ({ ...t })),
  abyss: [
    { id: 'a1', title: '整理错题本', duration: '30 分钟', xp: 60, soul: 15, done: false },
    { id: 'a2', title: '背诵 20 个生词', duration: '15 分钟', xp: 20, soul: 5, done: true },
    { id: 'a3', title: '跟读复述 1 段', duration: '20 分钟', xp: 40, soul: 10, done: true },
    { id: 'a4', title: '精听 BBC 6 Minute', duration: '25 分钟', xp: 40, soul: 10, done: true },
  ],
}

/** 各模式结算页差异 */


/* ================= N03b 试炼确认（三模式） ================= */
export type TrialConfirm = {
  mode: GameMode
  modeLabel: string
  modeEn: string
  gate: string
  dark: boolean
  title: string
  sub: string
  changeLabel: string
  setupTitle: string
  setup: { label: string; value: string; accent?: boolean }[]
  termsTitle: string
  terms: { title: string; detail: string; tone: 'ok' | 'warn' }[]
  secondaryLabel: string
  primaryLabel: string
}

export const trialConfirms: Record<GameMode, TrialConfirm> = {
  traveler: {
    mode: 'traveler',
    modeLabel: '旅者',
    modeEn: 'TRAVELER',
    gate: '无门槛',
    dark: false,
    title: '道路已定，试炼将启',
    sub: '「旅途已启，愿你不忘为何出发。」',
    changeLabel: '更换模式 ›',
    setupTitle: '试炼设置',
    setup: [
      { label: '挑战周期', value: '7 天 · 3.12 – 3.18' },
      { label: '每日任务', value: '3 项 · 共 21 项' },
      { label: '达成门槛', value: '无 · 完成多少结算多少', accent: true },
      { label: '休息日', value: '3 天 / 轮' },
      { label: '暂停', value: '不限次 · 随时可停' },
    ],
    termsTitle: '契约与代价',
    terms: [
      { title: '达成', detail: '魂火全额结算，完成率只影响徽章。', tone: 'ok' },
      { title: '未达成', detail: '不扣魂火、不熄火，只记录缺项。', tone: 'warn' },
    ],
    secondaryLabel: '',
    primaryLabel: '确认，开始试炼',
  },
  knight: {
    mode: 'knight',
    modeLabel: '骑士',
    modeEn: 'KNIGHT',
    gate: '85% 门槛',
    dark: true,
    title: '立誓七日，毁约削去魂火。',
    sub: '道路已定。以下是你放弃予签的誓约。',
    changeLabel: '更换模式 ›',
    setupTitle: '誓约',
    setup: [
      { label: '周期', value: '7 天 · 每天 3 项' },
      { label: '门槛', value: '至少 18 / 21 项' },
      { label: '失败代价', value: '170 → 119', accent: true },
      { label: '成功结算', value: '170 魂火' },
    ],
    termsTitle: '',
    terms: [
      { title: '失败不是全失', detail: '损失 30% 未结算魂火，其中一半可在 72 小时内追回。已结算的称号与永久经验不受影响。', tone: 'warn' },
    ],
    secondaryLabel: '换个模式',
    primaryLabel: '确认，以骑士开始',
  },
  abyss: {
    mode: 'abyss',
    modeLabel: '深渊',
    modeEn: 'ABYSS',
    gate: '100% 门槛',
    dark: true,
    title: '深渊不予馈赠，只以代价回应觊觎。',
    sub: '道路已定。以下是你放弃予签的契约。',
    changeLabel: '更换模式 ›',
    setupTitle: '赌注',
    setup: [
      { label: '周期', value: '5 天 · 每天 4 项' },
      { label: '门槛', value: '20 项全部完成' },
      { label: '失败代价', value: '250 → 0', accent: true },
      { label: '成功结算', value: '250 魂火' },
    ],
    termsTitle: '',
    terms: [
      { title: '一次失败，全部归零', detail: '没有恢复流程，也没有找回入口；未结算魂火直接清零。永久经验、称号与历史记录不受影响。', tone: 'warn' },
    ],
    secondaryLabel: '换个模式',
    primaryLabel: '确认全部，以深渊开始',
  },
}

/* ================= 阶段进度（P14/P21/P28） ================= */
export type StageProgress = {
  mode: GameMode
  days: { label: string; state: 'done' | 'current' | 'todo' }[]
  done: number
  total: number
  rate: string
  remainHint: string
  rows: { label: string; value: string }[]
  daily: { label: string; value: string; muted?: boolean }[]
  cta: string
  accent: string
}

export const stageProgressData: Record<GameMode, StageProgress> = {
  traveler: {
    mode: 'traveler',
    days: [
      { label: '1', state: 'done' },
      { label: '2', state: 'done' },
      { label: '3', state: 'done' },
      { label: '4', state: 'current' },
      { label: '5', state: 'todo' },
      { label: '6', state: 'todo' },
      { label: '7', state: 'todo' },
    ],
    done: 14,
    total: 21,
    rate: '67%',
    remainHint: '还差 7 项',
    rows: [
      { label: '已完成任务', value: '14 / 21' },
      { label: '有效专注', value: '5 小时 40 分' },
      { label: '暂存魂火', value: '120 / 120' },
      { label: '裂痕', value: '0 / 2' },
    ],
    daily: [
      { label: '周一', value: '3 / 3' },
      { label: '周二', value: '2 / 3' },
      { label: '周三', value: '3 / 4' },
      { label: '周四', value: '0 / 4', muted: true },
    ],
    cta: '去完成今天的任务',
    accent: '#287d68',
  },
  knight: {
    mode: 'knight',
    days: [
      { label: '1', state: 'done' },
      { label: '2', state: 'done' },
      { label: '3', state: 'done' },
      { label: '4', state: 'done' },
      { label: '5', state: 'current' },
      { label: '6', state: 'todo' },
      { label: '7', state: 'todo' },
    ],
    done: 12,
    total: 21,
    rate: '57%',
    remainHint: '还差 9 项 · 门槛 85%',
    rows: [
      { label: '已完成任务', value: '12 / 21' },
      { label: '有效专注', value: '7 小时 20 分' },
      { label: '暂存魂火', value: '120 / 170' },
      { label: '裂痕', value: '0 / 2' },
    ],
    daily: [
      { label: '周一', value: '3 / 3' },
      { label: '周二', value: '2 / 3' },
      { label: '周三', value: '3 / 4' },
      { label: '周四', value: '0 / 4', muted: true },
    ],
    cta: '去完成今天的任务',
    accent: '#e0b45c',
  },
  abyss: {
    mode: 'abyss',
    days: [
      { label: '1', state: 'done' },
      { label: '2', state: 'done' },
      { label: '3', state: 'done' },
      { label: '4', state: 'current' },
      { label: '5', state: 'todo' },
    ],
    done: 15,
    total: 20,
    rate: '75%',
    remainHint: '还差 5 项 · 门槛 100%',
    rows: [
      { label: '已完成任务', value: '15 / 20' },
      { label: '有效专注', value: '6 小时 10 分' },
      { label: '暂存魂火', value: '140 / 250' },
      { label: '裂痕', value: '2 / 2' },
    ],
    daily: [
      { label: '周一', value: '3 / 3' },
      { label: '周二', value: '2 / 3' },
      { label: '周三', value: '3 / 4' },
      { label: '周四', value: '0 / 4', muted: true },
    ],
    cta: '去完成今天的任务',
    accent: '#7c3aed',
  },
}
