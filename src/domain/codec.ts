import { MODES, type State } from './engine.ts'
const obj = (x: unknown): x is Record<string, unknown> =>
  !!x && typeof x === 'object' && !Array.isArray(x)
const finite = (x: unknown): x is number =>
  typeof x === 'number' && Number.isFinite(x)
const day = (x: unknown): x is string =>
  typeof x === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x)
function task(x: unknown) {
  return (
    obj(x) &&
    typeof x.id === 'string' &&
    typeof x.goalId === 'string' &&
    typeof x.title === 'string' &&
    MODES.includes(x.mode as never) &&
    day(x.day) &&
    finite(x.durationMin) &&
    x.durationMin > 0 &&
    finite(x.xp) &&
    x.xp >= 0 &&
    finite(x.soul) &&
    x.soul >= 0
  )
}
export function decodeState(raw: unknown): State | null {
  if (
    !obj(raw) ||
    raw.v !== 3 ||
    !MODES.includes(raw.mode as never) ||
    !Array.isArray(raw.goals) ||
    !Array.isArray(raw.completions) ||
    !Array.isArray(raw.rounds) ||
    !obj(raw.plans) ||
    !obj(raw.stages) ||
    !obj(raw.reminder) ||
    !obj(raw.legacy)
  )
    return null
  if (
    !raw.goals.every(
      (g) =>
        obj(g) &&
        typeof g.id === 'string' &&
        typeof g.title === 'string' &&
        MODES.includes(g.mode as never) &&
        day(g.startDate) &&
        Array.isArray(g.scheduledDays) &&
        g.scheduledDays.length === 7 &&
        finite(g.dailyTasks) &&
        g.dailyTasks >= 1 &&
        g.dailyTasks <= 5 &&
        finite(g.durationMin) &&
        g.durationMin > 0 &&
        g.durationMin <= 180,
    )
  )
    return null
  if (!Object.values(raw.plans).every((p) => Array.isArray(p) && p.every(task)))
    return null
  if (
    !raw.completions.every(
      (c) =>
        obj(c) &&
        task(c.task) &&
        finite(c.at) &&
        finite(c.focusedMs) &&
        c.focusedMs >= 0 &&
        ['check', 'quick', 'focus'].includes(c.kind as string),
    )
  )
    return null
  if (
    !raw.rounds.every(
      (r) =>
        obj(r) &&
        typeof r.id === 'string' &&
        MODES.includes(r.mode as never) &&
        day(r.start) &&
        day(r.end) &&
        [
          'total',
          'done',
          'rate',
          'earnedSoul',
          'bankedSoul',
          'lostSoul',
          'focusedMs',
          'settledAt',
        ].every((k) => finite(r[k])) &&
        typeof r.passed === 'boolean',
    )
  )
    return null
  if (!Object.values(raw.stages).every(day)) return null
  const r = raw.reminder
  if (
    typeof r.enabled !== 'boolean' ||
    typeof r.reminderTime !== 'string' ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(r.reminderTime) ||
    !Array.isArray(r.weekdays) ||
    r.weekdays.length !== 7 ||
    !Array.isArray(r.scenes) ||
    !finite(r.advanceMinutes)
  )
    return null
  if (raw.session !== null) {
    const q = raw.session
    if (
      !obj(q) ||
      typeof q.id !== 'string' ||
      !task(q.task) ||
      ![
        'running',
        'paused',
        'due',
        'completed',
        'interrupted',
        'abandoned',
      ].includes(q.status as string) ||
      !['startedAt', 'deadlineAt', 'remainingMs', 'pauses', 'updatedAt'].every(
        (k) => finite(q[k]),
      ) ||
      (q.pausedAt !== null && !finite(q.pausedAt))
    )
      return null
  }
  return raw as State
}
