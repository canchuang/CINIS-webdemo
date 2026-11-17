import { useState } from 'react'
import styles from './ReminderPage.module.css'
import { PageHeader } from '../components/PageHeader'
import { reminderInfo } from '../data/content'
import { TimePickerSheet } from '../components/TimePickerSheet'

type Props = { onBack: () => void }

/** P32 提醒设置 */
export function ReminderPage({ onBack }: Props) {
  const r = reminderInfo
  const [main, setMain] = useState(r.mainToggle.on)
  const [time, setTime] = useState(r.activeTime)
  const [scenes, setScenes] = useState(r.scenes.map((s) => s.on))
  const [pickerOpen, setPickerOpen] = useState(false)

  const toggleScene = (i: number) => setScenes((p) => p.map((v, idx) => (idx === i ? !v : v)))

  // 打开滚轮时用当前选中时间初始化
  const [h0, m0] = time.split(':').map((x) => parseInt(x, 10))

  return (
    <div className={`${styles.page} darkSystem`}>
      <PageHeader title="提醒设置" onBack={onBack} size="lg" />

      <div className={styles.mainRow}>
        <div className={styles.mainText}>
          <p className={styles.mainTitle}>{r.mainToggle.title}</p>
          <p className={styles.mainSub}>{r.mainToggle.sub}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={main}
          aria-label="每日提醒"
          className={`${styles.switch} ${main ? styles.switchOn : ''}`}
          onClick={() => setMain((v) => !v)}
        >
          <span className={styles.knob} />
        </button>
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

      <h3 className={styles.section}>提醒场景</h3>
      <ul className={styles.scenes}>
        {r.scenes.map((s, i) => (
          <li key={s.title} className={styles.scene}>
            <div className={styles.sceneText}>
              <p className={styles.sceneTitle}>{s.title}</p>
              <p className={styles.sceneSub}>{s.sub}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={scenes[i]}
              aria-label={s.title}
              className={`${styles.switch} ${scenes[i] ? styles.switchOn : ''}`}
              onClick={() => toggleScene(i)}
            >
              <span className={styles.knob} />
            </button>
          </li>
        ))}
      </ul>

      <h3 className={styles.section}>{r.dnd.title}</h3>
      <p className={styles.dndValue}>{r.dnd.value}</p>

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

