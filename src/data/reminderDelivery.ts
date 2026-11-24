import { appStore } from './appStore'
import { reminderDue } from '../domain/reminder'
import { localDay } from '../domain/engine'
/** Browser must be open; this is deliberately not represented as background push. */
export function startReminderDelivery() {
  const check = () => {
    const now = Date.now(),
      r = appStore.getSnapshot().reminder
    if (
      typeof Notification === 'undefined' ||
      Notification.permission !== 'granted' ||
      !reminderDue(r, now)
    )
      return
    try {
      new Notification('CINIS · 今日约定', {
        body: '留一点时间，完成今天的任务。',
        tag: `cinis-${localDay(now)}`,
      })
      appStore.saveReminder({ lastNotifiedDay: localDay(now) })
    } catch {
      /* Permission/platform failures never mark a delivery successful. */
    }
  }
  const timer = window.setInterval(check, 15_000)
  window.addEventListener('focus', check)
  return () => {
    window.clearInterval(timer)
    window.removeEventListener('focus', check)
  }
}
