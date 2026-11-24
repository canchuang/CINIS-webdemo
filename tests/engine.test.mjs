import test from 'node:test'
import assert from 'node:assert/strict'
import {
  emptyState,
  localDay,
  shiftDay,
  weekday,
  activate,
  addGoal,
  editGoal,
  deleteGoal,
  reconcile,
  tasksFor,
  complete,
  growth,
  startSession,
  pauseSession,
  resumeSession,
  settleSession,
  abandonSession,
  RULES,
  MODES,
} from '../src/domain/engine.ts'
import { reminderDue } from '../src/domain/reminder.ts'
process.env.TZ = 'Asia/Shanghai'
const at = (s) => new Date(s.includes('+') ? s : s + '+08:00').getTime()
const start = at('2026-11-23T23:50:00')
function setup(
  mode = 'traveler',
  now = start,
  days = Array(7).fill(true),
  durationMin = 20,
) {
  const s = emptyState(now)
  activate(s, mode, now)
  addGoal(
    s,
    {
      title: '专注设计',
      mode,
      scheduledDays: days,
      dailyTasks: 1,
      durationMin,
    },
    'goal-' + mode,
    now,
  )
  return s
}
for (const mode of MODES) {
  test(`${mode}: all completion entrances are idempotent and survive reload`, () => {
    const s = setup(mode),
      t = tasksFor(s, mode, localDay(start))[0]
    assert.equal(complete(s, t, 'check', start), true)
    assert.equal(complete(s, t, 'quick', start), false)
    const reloaded = reconcile(JSON.parse(JSON.stringify(s)), start)
    assert.equal(growth(reloaded).completed, 1)
    assert.equal(growth(reloaded).xp, 40)
  })
  test(`${mode}: local midnight creates independent tasks and preserves history`, () => {
    const s = setup(mode),
      t = tasksFor(s, mode, localDay(start))[0]
    complete(s, t, 'quick', start)
    const tomorrow = at('2026-11-24T00:05:00')
    reconcile(s, tomorrow)
    const next = tasksFor(s, mode, localDay(tomorrow))[0]
    assert.notEqual(t.id, next.id)
    assert.equal(s.completions.length, 1)
    assert.equal(
      s.completions.some((c) => c.task.id === next.id),
      false,
    )
    reconcile(s, tomorrow)
    assert.equal(s.completions.length, 1)
  })
  test(`${mode}: overnight focus uses original task day and rewards once`, () => {
    const s = setup(mode),
      t = tasksFor(s, mode, localDay(start))[0]
    startSession(s, t.id, 'session', start)
    const q = reconcile(
      JSON.parse(JSON.stringify(s)),
      at('2026-11-24T00:15:00'),
    )
    assert.equal(q.session.status, 'due')
    assert.equal(settleSession(q, at('2026-11-24T00:15:00')), true)
    assert.equal(settleSession(q, at('2026-11-24T00:16:00')), false)
    assert.equal(q.completions[0].task.day, '2026-11-23')
    assert.equal(growth(q).focusedMs, 1200000)
  })
  test(`${mode}: interrupted focus cannot issue a reward`, () => {
    const s = setup(mode),
      t = tasksFor(s, mode, localDay(start))[0]
    startSession(s, t.id, 's', start)
    abandonSession(s, start + 1000)
    assert.equal(settleSession(s, start + 2000), false)
    assert.equal(growth(s).xp, 0)
  })
  test(`${mode}: round settlement counts missed days, executes loss, never deletes XP`, () => {
    const s = setup(mode),
      t = tasksFor(s, mode, localDay(start))[0]
    complete(s, t, 'quick', start)
    const end = at(shiftDay(localDay(start), RULES[mode].days) + 'T10:00:00')
    reconcile(s, end)
    reconcile(s, end)
    assert.equal(s.rounds.length, 1)
    assert.equal(s.rounds[0].total, RULES[mode].days)
    assert.equal(s.rounds[0].passed, mode === 'traveler')
    assert.equal(
      s.rounds[0].bankedSoul,
      mode === 'traveler' ? 10 : mode === 'knight' ? 7 : 0,
    )
    assert.equal(growth(s).xp, 40)
  })
}
test('UTC+8 early morning has correct local date', () =>
  assert.equal(localDay(at('2026-11-24T00:05:00')), '2026-11-24'))
test('day shifting uses calendar dates across DST', () => {
  process.env.TZ = 'America/New_York'
  assert.equal(shiftDay('2026-03-07', 2), '2026-03-09')
  assert.equal(shiftDay('2026-10-31', 2), '2026-11-02')
  process.env.TZ = 'Asia/Shanghai'
})
test('same names/goal slots cannot share completion state across modes', () => {
  const s = setup('traveler')
  activate(s, 'knight', start)
  addGoal(
    s,
    {
      title: '专注设计',
      mode: 'knight',
      scheduledDays: Array(7).fill(true),
      dailyTasks: 1,
      durationMin: 20,
    },
    'knight',
    start,
  )
  complete(s, tasksFor(s, 'traveler', localDay(start))[0], 'check', start)
  assert.equal(
    s.completions.some(
      (c) => c.task.id === tasksFor(s, 'knight', localDay(start))[0].id,
    ),
    false,
  )
  assert.equal(growth(s).xp, 40)
})
test('knight permits one pause, rejects second, and enforces ten-minute limit after refresh', () => {
  const s = setup('knight'),
    t = tasksFor(s, 'knight', localDay(start))[0]
  startSession(s, t.id, 's', start)
  pauseSession(s, start + 1000)
  resumeSession(s, start + 2000)
  assert.throws(() => pauseSession(s, start + 3000), /次数/)
  const p = setup('knight'),
    task = tasksFor(p, 'knight', localDay(start))[0]
  startSession(p, task.id, 'q', start)
  pauseSession(p, start + 1000)
  reconcile(p, start + 601001)
  assert.equal(p.session.status, 'interrupted')
  assert.equal(settleSession(p, start + 602000), false)
})
test('abyss cannot pause; traveler can pause repeatedly', () => {
  const a = setup('abyss')
  startSession(a, tasksFor(a, 'abyss', localDay(start))[0].id, 'a', start)
  assert.throws(() => pauseSession(a, start + 1000), /次数/)
  const t = setup()
  startSession(t, tasksFor(t, 'traveler', localDay(start))[0].id, 't', start)
  for (let i = 0; i < 3; i++) {
    pauseSession(t, start + 1000 + i * 2000)
    resumeSession(t, start + 2000 + i * 2000)
  }
  assert.equal(t.session.pauses, 3)
})
test('active focus blocks replacing task or switching mode; early settlement blocked', () => {
  const s = setup()
  startSession(s, tasksFor(s, 'traveler', localDay(start))[0].id, 's', start)
  assert.throws(() => activate(s, 'knight', start + 1), /退出/)
  assert.throws(() => startSession(s, 'other', 'other', start + 1), /已有/)
  assert.equal(settleSession(s, start + 1000), false)
})
test('edits affect tomorrow; historical and current plans remain stable', () => {
  const s = setup(),
    t = tasksFor(s, 'traveler', localDay(start))[0]
  complete(s, t, 'check', start)
  editGoal(
    s,
    'goal-traveler',
    {
      title: '新名称',
      mode: 'traveler',
      scheduledDays: Array(7).fill(true),
      dailyTasks: 2,
      durationMin: 30,
    },
    start,
  )
  assert.equal(tasksFor(s, 'traveler', localDay(start)).length, 1)
  reconcile(s, start + 86400000)
  assert.equal(tasksFor(s, 'traveler', localDay(start + 86400000)).length, 2)
  assert.equal(s.completions[0].task.title, '专注设计')
  deleteGoal(s, 'goal-traveler', start + 86400000)
  reconcile(s, start + 2 * 86400000)
  assert.equal(
    tasksFor(s, 'traveler', localDay(start + 2 * 86400000)).length,
    0,
  )
  assert.equal(growth(s).xp, 40)
})
test('rest days generate no tasks; new goal appears alongside existing frozen tasks', () => {
  const s = setup(),
    day = localDay(start)
  addGoal(
    s,
    {
      title: '新目标',
      mode: 'traveler',
      scheduledDays: Array(7).fill(true),
      dailyTasks: 2,
      durationMin: 25,
    },
    'new',
    start,
  )
  assert.equal(tasksFor(s, 'traveler', day).length, 3)
  const days = Array(7).fill(false)
  days[(weekday(day) + 1) % 7] = true
  const rest = setup('traveler', start, days)
  assert.equal(tasksFor(rest, 'traveler', day).length, 0)
})
test('final-day overnight focus defers round settlement until resolved', () => {
  const s = setup('abyss'),
    last = at('2026-11-27T23:50:00')
  reconcile(s, last)
  const t = tasksFor(s, 'abyss', localDay(last))[0]
  startSession(s, t.id, 'late', last)
  reconcile(s, last + 30 * 60000)
  assert.equal(s.rounds.length, 0)
  assert.equal(settleSession(s, last + 30 * 60000), true)
  reconcile(s, last + 30 * 60000)
  assert.equal(s.rounds.length, 1)
  assert.equal(s.rounds[0].done, 1)
})
test('legacy XP and titles retained without inventing task records', () => {
  const s = emptyState()
  s.legacy['cinis:growth'] = {
    v: 1,
    data: { xp: 680, level: 'Lv.08', unlockedTitles: ['旧称号'] },
  }
  const g = growth(s)
  assert.equal(g.xp, 680)
  assert.equal(g.level, 8)
  assert.deepEqual(g.titles, ['旧称号'])
  assert.equal(s.completions.length, 0)
})
test('reminders respect weekdays, exact local time, and per-day deduplication', () => {
  const s = emptyState(),
    r = {
      ...s.reminder,
      enabled: true,
      reminderTime: '21:00',
      weekdays: Array(7).fill(true),
    }
  assert.equal(reminderDue(r, at('2026-11-24T20:59:00')), false)
  assert.equal(reminderDue(r, at('2026-11-24T21:00:00')), true)
  assert.equal(
    reminderDue(
      { ...r, lastNotifiedDay: '2026-11-24' },
      at('2026-11-24T21:00:00'),
    ),
    false,
  )
})
test('quick completion cannot bypass an ongoing focus', () => {
  const s = setup()
  const t = tasksFor(s, 'traveler', localDay(start))[0]
  startSession(s, t.id, 's', start)
  assert.throws(() => complete(s, t, 'quick', start + 1), /退出/)
  assert.equal(growth(s).xp, 0)
})
