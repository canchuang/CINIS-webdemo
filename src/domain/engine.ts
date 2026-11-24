/** Pure, serializable domain state. All timestamps are epoch ms; day keys are local dates. */
export type Mode = 'traveler' | 'knight' | 'abyss'
export const MODES: Mode[] = ['traveler', 'knight', 'abyss']
export const RULES = {
  traveler: {
    label: '旅者',
    days: 7,
    threshold: 0,
    loss: 0,
    maxTasks: 5,
    pauses: Infinity,
    pauseMs: Infinity,
    focusRule: '随时可暂停 · 无次数限制',
  },
  knight: {
    label: '骑士',
    days: 7,
    threshold: 0.85,
    loss: 0.3,
    maxTasks: 5,
    pauses: 1,
    pauseMs: 10 * 60_000,
    focusRule: '本次专注可暂停 1 次 · 最长 10 分钟',
  },
  abyss: {
    label: '深渊',
    days: 5,
    threshold: 1,
    loss: 1,
    maxTasks: 4,
    pauses: 0,
    pauseMs: 0,
    focusRule: '专注不可暂停 · 退出即中断',
  },
} as const
export function localDay(now = Date.now()) {
  const d = new Date(now)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
export function shiftDay(day: string, delta: number) {
  const [y, m, d] = day.split('-').map(Number)
  return localDay(new Date(y, m - 1, d + delta, 12).getTime())
}
export function dayDistance(from: string, to: string) {
  const utc = (s: string) => {
    const [y, m, d] = s.split('-').map(Number)
    return Date.UTC(y, m - 1, d)
  }
  return Math.round((utc(to) - utc(from)) / 86_400_000)
}
export function weekday(day: string) {
  const [y, m, d] = day.split('-').map(Number)
  return (new Date(y, m - 1, d, 12).getDay() + 6) % 7
}
export type Goal = {
  id: string
  title: string
  mode: Mode
  scheduledDays: boolean[]
  dailyTasks: number
  durationMin: number
  startDate: string
  deletedAt?: string
  status: '进行中' | '待开始' | '已记录'
  createdAt: number
  updatedAt: number
}
export type Task = {
  id: string
  goalId: string
  title: string
  mode: Mode
  day: string
  durationMin: number
  xp: number
  soul: number
}
export type Completion = {
  task: Task
  kind: 'check' | 'quick' | 'focus'
  at: number
  focusedMs: number
  sessionId?: string
}
export type Session = {
  id: string
  task: Task
  status:
    'running' | 'paused' | 'due' | 'completed' | 'interrupted' | 'abandoned'
  startedAt: number
  deadlineAt: number
  remainingMs: number
  pausedAt: number | null
  pauses: number
  updatedAt: number
  reason?: string
}
export type Round = {
  id: string
  mode: Mode
  start: string
  end: string
  total: number
  done: number
  rate: number
  earnedSoul: number
  bankedSoul: number
  lostSoul: number
  passed: boolean
  focusedMs: number
  settledAt: number
}
export type Reminder = {
  enabled: boolean
  reminderTime: string
  weekdays: boolean[]
  scenes: boolean[]
  advanceMinutes: number
  lastNotifiedDay?: string
}
export type State = {
  v: 3
  mode: Mode
  goals: Goal[]
  plans: Record<string, Task[]>
  completions: Completion[]
  session: Session | null
  stages: Partial<Record<Mode, string>>
  rounds: Round[]
  reminder: Reminder
  legacy: Record<string, unknown>
  updatedAt: number
}
export type GoalDraft = Pick<
  Goal,
  'title' | 'mode' | 'scheduledDays' | 'dailyTasks' | 'durationMin'
>
export function emptyState(now = Date.now()): State {
  return {
    v: 3,
    mode: 'traveler',
    goals: [],
    plans: {},
    completions: [],
    session: null,
    stages: {},
    rounds: [],
    reminder: {
      enabled: false,
      reminderTime: '21:00',
      weekdays: [true, true, true, true, true, false, false],
      scenes: [true, true, true, false],
      advanceMinutes: 0,
    },
    legacy: {},
    updatedAt: now,
  }
}
export function normalizeGoal(draft: GoalDraft): GoalDraft {
  if (!MODES.includes(draft.mode)) throw new Error('请选择有效模式')
  const title = draft.title.trim().slice(0, 80)
  if (!title) throw new Error('请填写目标名称')
  if (draft.scheduledDays.length !== 7 || !draft.scheduledDays.some(Boolean))
    throw new Error('请至少选择一个执行日')
  return {
    ...draft,
    title,
    scheduledDays: draft.scheduledDays.map(Boolean),
    dailyTasks: Math.max(
      1,
      Math.min(RULES[draft.mode].maxTasks, Math.floor(draft.dailyTasks) || 1),
    ),
    durationMin: Math.max(
      1,
      Math.min(180, Math.floor(draft.durationMin) || 25),
    ),
  }
}
const planKey = (mode: Mode, day: string) => `${day}:${mode}`
export function ensurePlan(s: State, mode: Mode, day: string) {
  const key = planKey(mode, day)
  if (s.plans[key]) return s.plans[key]
  const tasks: Task[] = []
  for (const g of s.goals) {
    if (
      g.mode !== mode ||
      g.status !== '进行中' ||
      g.startDate > day ||
      (g.deletedAt && g.deletedAt <= day) ||
      !g.scheduledDays[weekday(day)]
    )
      continue
    for (let i = 0; i < g.dailyTasks; i++)
      tasks.push({
        id: `${day}:${mode}:${g.id}:${i}`,
        goalId: g.id,
        title:
          g.dailyTasks > 1 ? `${g.title} · ${i + 1}/${g.dailyTasks}` : g.title,
        mode,
        day,
        durationMin: g.durationMin,
        xp: 40,
        soul: 10,
      })
  }
  s.plans[key] = tasks
  return tasks
}
export function tasksFor(s: State, mode: Mode, day: string) {
  return s.plans[planKey(mode, day)] ?? []
}
export function isDone(s: State, id: string) {
  return s.completions.some((c) => c.task.id === id)
}
export function roundStats(s: State, mode: Mode, start: string, end: string) {
  const tasks = Object.values(s.plans)
    .flat()
    .filter((t) => t.mode === mode && t.day >= start && t.day <= end)
  const ids = new Set(tasks.map((t) => t.id))
  const records = s.completions.filter((c) => ids.has(c.task.id))
  const total = tasks.length,
    done = records.length,
    rate = total ? done / total : 0
  const earnedSoul = records.reduce((n, c) => n + c.task.soul, 0)
  const passed = total > 0 && rate >= RULES[mode].threshold
  const bankedSoul = Math.floor(
    earnedSoul * (passed ? 1 : 1 - RULES[mode].loss),
  )
  return {
    total,
    done,
    rate,
    earnedSoul,
    bankedSoul,
    lostSoul: earnedSoul - bankedSoul,
    passed,
    focusedMs: records.reduce((n, c) => n + c.focusedMs, 0),
  }
}
/** Freeze each day's planned tasks. Missed days count; rest days add no denominator. */
export function reconcile(s: State, now = Date.now()) {
  const today = localDay(now)
  for (const mode of MODES) {
    let start = s.stages[mode]
    if (!start || start > today) continue
    for (let day = start; day <= today; day = shiftDay(day, 1))
      ensurePlan(s, mode, day)
    while (shiftDay(start, RULES[mode].days) <= today) {
      const end = shiftDay(start, RULES[mode].days - 1),
        id = `${mode}:${start}`
      const open = s.session
      // Keep a final-day overnight focus attributable to its original round until resolved.
      if (
        open &&
        ['running', 'paused', 'due'].includes(open.status) &&
        open.task.mode === mode &&
        open.task.day >= start &&
        open.task.day <= end
      )
        break
      if (!s.rounds.some((r) => r.id === id)) {
        const stats = roundStats(s, mode, start, end)
        if (stats.total)
          s.rounds.push({ id, mode, start, end, ...stats, settledAt: now })
      }
      start = shiftDay(end, 1)
      s.stages[mode] = start
    }
  }
  const session = s.session
  if (session && ['running', 'paused', 'due'].includes(session.status)) {
    if (
      session.status === 'paused' &&
      session.pausedAt !== null &&
      now - session.pausedAt > RULES[session.task.mode].pauseMs
    ) {
      session.status = 'interrupted'
      session.reason = '暂停时间已超过本模式上限'
    } else if (session.status === 'running' && now >= session.deadlineAt) {
      session.status = 'due'
      session.remainingMs = 0
    }
    // A paused or still-running session may cross midnight. It always belongs to its start day.
  }
  s.updatedAt = now
  return s
}
export function activate(s: State, mode: Mode, now: number) {
  if (
    s.session &&
    ['running', 'paused', 'due'].includes(s.session.status) &&
    s.session.task.mode !== mode
  )
    throw new Error('请先完成或退出当前专注，再切换模式')
  s.mode = mode
  s.stages[mode] ??= localDay(now)
  reconcile(s, now)
}
export function addGoal(s: State, draft: GoalDraft, id: string, now: number) {
  const d = normalizeGoal(draft),
    day = localDay(now)
  const g: Goal = {
    ...d,
    id,
    startDate: day,
    status: '进行中',
    createdAt: now,
    updatedAt: now,
  }
  const existing = [...ensurePlan(s, g.mode, day)]
  s.goals.unshift(g)
  s.stages[g.mode] ??= day
  // A new goal appears today; existing frozen tasks are retained.
  const key = planKey(g.mode, day)
  const old = existing
  delete s.plans[key]
  const generated = ensurePlan(s, g.mode, day).filter((t) => t.goalId === g.id)
  s.plans[key] = [...old, ...generated]
  reconcile(s, now)
  return g
}
export function editGoal(s: State, id: string, draft: GoalDraft, now: number) {
  const g = s.goals.find((g) => g.id === id && !g.deletedAt)
  if (!g) throw new Error('目标不存在或已删除')
  if (draft.mode !== g.mode) throw new Error('编辑目标时不能改变模式')
  reconcile(s, now)
  Object.assign(g, normalizeGoal(draft), { updatedAt: now })
}
export function deleteGoal(s: State, id: string, now: number) {
  reconcile(s, now)
  const g = s.goals.find((g) => g.id === id)
  if (g) {
    g.deletedAt = shiftDay(localDay(now), 1)
    g.status = '已记录'
    g.updatedAt = now
  }
}
export function complete(
  s: State,
  task: Task,
  kind: Completion['kind'],
  now: number,
  session?: Session,
) {
  if (isDone(s, task.id)) return false
  const known = tasksFor(s, task.mode, task.day).find((t) => t.id === task.id)
  if (!known) throw new Error('任务不在计划中')
  if (
    kind !== 'focus' &&
    s.session?.task.id === task.id &&
    ['running', 'paused', 'due'].includes(s.session.status)
  )
    throw new Error('请先完成或退出该任务的专注')
  if (kind === 'focus') {
    if (!session || session.task.id !== task.id || session.status !== 'due')
      throw new Error('专注尚未完成')
  } else if (task.day !== localDay(now)) throw new Error('只能打卡今天的任务')
  s.completions.push({
    task: { ...known },
    kind,
    at: now,
    focusedMs: kind === 'focus' ? task.durationMin * 60_000 : 0,
    ...(session ? { sessionId: session.id } : {}),
  })
  return true
}
export function startSession(
  s: State,
  taskId: string,
  id: string,
  now: number,
) {
  reconcile(s, now)
  if (s.session && ['running', 'paused', 'due'].includes(s.session.status)) {
    if (s.session.task.id === taskId) return s.session
    throw new Error('已有专注待完成，请先恢复或退出')
  }
  const task = tasksFor(s, s.mode, localDay(now)).find((t) => t.id === taskId)
  if (!task || isDone(s, task.id)) throw new Error('任务不存在或已完成')
  s.session = {
    id,
    task: { ...task },
    status: 'running',
    startedAt: now,
    deadlineAt: now + task.durationMin * 60_000,
    remainingMs: task.durationMin * 60_000,
    pausedAt: null,
    pauses: 0,
    updatedAt: now,
  }
  return s.session
}
export function pauseSession(s: State, now: number) {
  reconcile(s, now)
  const q = s.session
  if (!q || q.status !== 'running') throw new Error('当前无法暂停')
  if (q.pauses >= RULES[q.task.mode].pauses)
    throw new Error('本模式暂停次数已用完')
  q.remainingMs = Math.max(0, q.deadlineAt - now)
  q.pausedAt = now
  q.pauses++
  q.status = 'paused'
  q.updatedAt = now
}
export function resumeSession(s: State, now: number) {
  reconcile(s, now)
  const q = s.session
  if (!q || q.status !== 'paused') throw new Error('当前会话已无法继续')
  q.deadlineAt = now + q.remainingMs
  q.pausedAt = null
  q.status = 'running'
  q.updatedAt = now
}
export function settleSession(s: State, now: number) {
  reconcile(s, now)
  const q = s.session
  if (!q || q.status !== 'due') return false
  // A round already finalized at midnight cannot receive a late reward.
  if (
    s.rounds.some(
      (r) =>
        r.mode === q.task.mode && q.task.day >= r.start && q.task.day <= r.end,
    )
  ) {
    q.status = 'interrupted'
    q.reason = '所属阶段已结算，本次不重复发放奖励'
    return false
  }
  const ok = complete(s, q.task, 'focus', now, q)
  q.status = 'completed'
  q.updatedAt = now
  return ok
}
export function abandonSession(s: State, now: number) {
  if (
    s.session &&
    ['running', 'paused', 'due', 'interrupted'].includes(s.session.status)
  ) {
    s.session.status = 'abandoned'
    s.session.updatedAt = now
    s.session.reason = '主动退出专注'
  }
}
export function growth(s: State) {
  const legacy = s.legacy['cinis:growth'] as
    | { data?: { xp?: number; level?: string; unlockedTitles?: string[] } }
    | undefined
  const base = legacy?.data
  const baseXp = typeof base?.xp === 'number' && base.xp >= 0 ? base.xp : 0
  const baseLevel = Math.max(
    1,
    parseInt(String(base?.level ?? '').replace(/\D/g, '')) || 1,
  )
  const xp = baseXp + s.completions.reduce((n, c) => n + c.task.xp, 0)
  const activeDays = new Set(s.completions.map((c) => c.task.day)).size
  const titles = new Set<string>(
    (base?.unlockedTitles ?? []).filter((t) => typeof t === 'string'),
  )
  if (s.completions.length) titles.add('初燃者')
  for (const r of s.rounds)
    if (r.passed)
      titles.add(
        r.mode === 'traveler'
          ? '旅途初行者'
          : r.mode === 'knight'
            ? '誓约骑士'
            : '深渊行者',
      )
  return {
    xp,
    level: Math.floor(xp / 800) + baseLevel,
    levelXp: xp % 800,
    xpMax: 800,
    activeDays,
    titles: [...titles],
    completed: s.completions.length,
    focusedMs: s.completions.reduce((n, c) => n + c.focusedMs, 0),
    soul: s.rounds.reduce((n, r) => n + r.bankedSoul, 0),
    passed: s.rounds.filter((r) => r.passed).length,
  }
}
