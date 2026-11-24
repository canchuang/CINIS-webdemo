import { decodeState } from '../domain/codec'
import { useSyncExternalStore } from 'react'
import { modeTasks } from './content'
import {
  MODES,
  RULES,
  activate,
  addGoal,
  abandonSession,
  complete,
  deleteGoal,
  editGoal,
  emptyState,
  growth,
  isDone,
  localDay,
  pauseSession,
  reconcile,
  resumeSession,
  settleSession,
  startSession,
  tasksFor,
  type GoalDraft,
  type Mode,
  type Reminder,
  type State,
} from '../domain/engine'

export const STATE_KEY = 'cinis:state:v3'
function readJSON(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null')
  } catch {
    return null
  }
}
function object(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : {}
}
function readState(): State | null {
  return decodeState(readJSON(STATE_KEY))
}
function initialState(): State {
  const stored = readState()
  if (stored) return reconcile(stored)
  const s = emptyState(),
    now = Date.now()
  const demo = object(readJSON('cinis:demo-state'))
  for (const key of [
    STATE_KEY,
    'cinis:demo-state',
    'cinis:growth',
    'cinis:focus-session',
  ]) {
    const v = readJSON(key)
    if (v) s.legacy[key] = v
  }
  // Preserve undated legacy completion/growth data as a backup, never invent dates or reward events.
  if (MODES.includes(demo.mode as Mode)) s.mode = demo.mode as Mode
  const reminder = object(object(readJSON('cinis:reminder')).data)
  if (typeof reminder.enabled === 'boolean')
    s.reminder.enabled = reminder.enabled
  if (
    typeof reminder.reminderTime === 'string' &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(reminder.reminderTime)
  )
    s.reminder.reminderTime = reminder.reminderTime
  if (Array.isArray(reminder.weekdays) && reminder.weekdays.length === 7)
    s.reminder.weekdays = reminder.weekdays.map(Boolean)
  if (Array.isArray(reminder.scenes) && reminder.scenes.length === 4)
    s.reminder.scenes = reminder.scenes.map(Boolean)
  const oldGoals = object(readJSON('cinis:goals')).data
  const drafts: (GoalDraft & { id: string })[] = []
  if (Array.isArray(oldGoals)) {
    s.legacy['cinis:goals'] = oldGoals
    for (const raw of oldGoals) {
      const g = object(raw)
      if (g.status === '已记录') continue
      const mode =
        MODES.find((m) => m === g.mode || RULES[m].label === g.mode) ??
        'traveler'
      if (typeof g.title === 'string')
        drafts.push({
          id: typeof g.id === 'string' ? g.id : crypto.randomUUID(),
          title: g.title,
          mode,
          scheduledDays:
            Array.isArray(g.scheduledDays) &&
            g.scheduledDays.length === 7 &&
            g.scheduledDays.some(Boolean)
              ? g.scheduledDays.map(Boolean)
              : Array(7).fill(true),
          dailyTasks: Number(g.dailyTasks) || 1,
          durationMin: 25,
        })
    }
  }
  // Existing demo task names become editable goals; demo pre-completed flags are deliberately not imported.
  if (!Array.isArray(oldGoals))
    for (const mode of MODES)
      for (const t of modeTasks[mode])
        drafts.push({
          id: `seed-${mode}-${t.id}`,
          title: t.title,
          mode,
          scheduledDays: Array(7).fill(true),
          dailyTasks: 1,
          durationMin: parseInt(t.duration) || 25,
        })
  for (const d of drafts) addGoal(s, d, d.id, now)
  // Only modes actually entered have a running stage.
  s.stages = { [s.mode]: localDay(now) }
  return reconcile(s)
}
let state = initialState()
const listeners = new Set<() => void>()
let error = ''
function persist() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state))
    error = ''
  } catch {
    error = '本机存储空间不足或不可用，请导出数据后重试。'
  }
}
function emit() {
  listeners.forEach((l) => l())
}
persist()
function transact<T>(fn: (s: State, now: number) => T): T {
  const next = structuredClone(readState() ?? state),
    now = Date.now()
  reconcile(next, now)
  const result = fn(next, now)
  reconcile(next, now)
  state = next
  persist()
  emit()
  return result
}
export const appStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot: () => state,
  getError: () => error,
  reconcile() {
    const next = reconcile(structuredClone(readState() ?? state))
    if (
      JSON.stringify({ ...state, updatedAt: 0 }) !==
      JSON.stringify({ ...next, updatedAt: 0 })
    ) {
      state = next
      persist()
      emit()
    }
  },
  setMode(mode: Mode) {
    transact((s, now) => activate(s, mode, now))
  },
  tasks(mode = state.mode) {
    return tasksFor(state, mode, localDay())
  },
  done(id: string) {
    return isDone(state, id)
  },
  createGoal(draft: GoalDraft) {
    return transact((s, now) => addGoal(s, draft, crypto.randomUUID(), now))
  },
  editGoal(id: string, draft: GoalDraft) {
    transact((s, now) => editGoal(s, id, draft, now))
  },
  deleteGoal(id: string) {
    transact((s, now) => deleteGoal(s, id, now))
  },
  check(id: string, kind: 'check' | 'quick') {
    return transact((s, now) => {
      const task = tasksFor(s, s.mode, localDay(now)).find((t) => t.id === id)
      if (!task) throw new Error('任务已过期，请刷新今日页')
      return complete(s, task, kind, now)
    })
  },
  start(taskId: string) {
    transact((s, now) => startSession(s, taskId, crypto.randomUUID(), now))
  },
  pause() {
    transact((s, now) => pauseSession(s, now))
  },
  resume() {
    transact((s, now) => resumeSession(s, now))
  },
  settle() {
    return transact((s, now) => settleSession(s, now))
  },
  abandon() {
    transact((s, now) => abandonSession(s, now))
  },
  saveReminder(patch: Partial<Reminder>) {
    transact((s) => {
      s.reminder = { ...s.reminder, ...patch }
    })
  },
  growth: () => growth(state),
  export() {
    return JSON.stringify(state, null, 2)
  },
  reset() {
    state = emptyState()
    persist()
    emit()
  },
}
export function useAppState() {
  return useSyncExternalStore(appStore.subscribe, appStore.getSnapshot)
}
/** Foreground + local-midnight reconciliation and cross-tab refresh. */
export function startStateLifecycle() {
  const refresh = () => appStore.reconcile()
  const storage = (e: StorageEvent) => {
    if (e.key === STATE_KEY) {
      const next = readState()
      if (next) {
        state = reconcile(next)
        emit()
      }
    }
  }
  window.addEventListener('focus', refresh)
  document.addEventListener('visibilitychange', refresh)
  window.addEventListener('storage', storage)
  const timer = window.setInterval(refresh, 1000)
  return () => {
    window.clearInterval(timer)
    window.removeEventListener('focus', refresh)
    document.removeEventListener('visibilitychange', refresh)
    window.removeEventListener('storage', storage)
  }
}
