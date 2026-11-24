import { localDay, weekday, type Reminder } from './engine.ts'
export function reminderDue(r: Reminder, now: number) {
  if (
    !r.enabled ||
    !r.weekdays[weekday(localDay(now))] ||
    r.lastNotifiedDay === localDay(now)
  )
    return false
  const d = new Date(now),
    [h, m] = r.reminderTime.split(':').map(Number)
  const target = h * 60 + m - r.advanceMinutes
  const minute = d.getHours() * 60 + d.getMinutes()
  return minute >= target && minute < target + 1
}
