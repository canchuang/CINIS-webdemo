import { useState } from 'react'
import styles from './ReminderPage.module.css'
import { PageHeader } from '../components/PageHeader'
import { reminderInfo } from '../data/content'
import { appStore, useAppState } from '../data/appStore'
import { TimePickerSheet } from '../components/TimePickerSheet'

type Props = { onBack: () => void }

/** P32 提醒设置 */
export function ReminderPage({ onBack }: Props) {
  const r = reminderInfo,
    state = useAppState(),
    reminder = state.reminder
  const main = reminder.enabled,
    time = reminder.reminderTime
  const [pickerOpen, setPickerOpen] = useState(false)
  const [permission, setPermission] = useState('')
  const setTime = (time: string) =>
    appStore.saveReminder({ reminderTime: time })
  const toggleMain = async () => {
    if (main) {
      appStore.saveReminder({ enabled: false })
      return
    }
    appStore.saveReminder({ enabled: true })
    if (typeof Notification === 'undefined') {
      setPermission('此浏览器不支持通知，已保存提醒设置。')
      return
    }
    try {
      const p = await Notification.requestPermission()
      setPermission(
        p === 'granted' ? '通知权限已开启' : '未获得通知权限，已保存提醒设置。',
      )
    } catch {
      setPermission('当前环境无法申请通知权限。')
    }
  }
  // 打开滚轮时用当前选中时间初始化
  const [h0, m0] = time.split(':').map((x) => parseInt(x, 10))

  return (
    <div className={`${styles.page} darkSystem`}>
      <PageHeader title="提醒设置" onBack={onBack} size="lg" />

      <div className={styles.mainRow}>
        <div className={styles.mainText}>
          <p className={styles.mainTitle}>每日任务提醒</p>
          <p className={styles.mainSub}>按所选时间与执行日提醒</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={main}
          aria-label="每日提醒"
          className={`${styles.switch} ${main ? styles.switchOn : ''}`}
          onClick={toggleMain}
        >
          <span className={styles.knob} />
        </button>
      </div>

      <p className={styles.mainSub} role="status">
        {permission ||
          '提醒设置自动保存。通知仅在网页保持打开时尝试发送，关闭网页后不会定时推送。'}
      </p>
      <h3 className={styles.section}>重复</h3>
      <div className={styles.times}>
        {['一', '二', '三', '四', '五', '六', '日'].map((d, i) => (
          <button
            key={d}
            type="button"
            aria-pressed={reminder.weekdays[i]}
            className={`${styles.time} ${reminder.weekdays[i] ? styles.timeOn : ''}`}
            onClick={() =>
              appStore.saveReminder({
                weekdays: reminder.weekdays.map((v, j) => (j === i ? !v : v)),
              })
            }
          >
            {d}
          </button>
        ))}
      </div>
      <h3 className={styles.section}>时间</h3>
      <div className={styles.times}>
        {r.times.map((t) => (
          <button
            key={t}
            type="button"
            className={`${styles.time} ${time === t ? styles.timeOn : ''}`}
            onClick={() => {
              setTime(t)
              setPickerOpen(true)
            }}
            aria-pressed={time === t}
          >
            {t}
          </button>
        ))}
      </div>

      {pickerOpen && (
        <TimePickerSheet
          initialHour={h0}
          initialMinute={m0}
          onClose={() => setPickerOpen(false)}
          onConfirm={(h, m) => {
            const next = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
            setTime(next)
            setPickerOpen(false)
          }}
        />
      )}
    </div>
  )
}
