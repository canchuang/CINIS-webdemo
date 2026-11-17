import { useState } from 'react'
import styles from './NewGoalPage.module.css'

type Props = { onBack: () => void; onNext: () => void; onOpenReminder: () => void }

const WEEK = ['一', '二', '三', '四', '五', '六', '日']

/** N02 新建目标（深色） */
export function NewGoalPage({ onBack, onNext, onOpenReminder }: Props) {
  const [name, setName] = useState('晨间复盘')
  const [days, setDays] = useState([true, true, true, true, false, false, false])
  const [count, setCount] = useState(3)

  const dayCount = days.filter(Boolean).length
  const weekly = dayCount * count

  return (
    <div className={styles.screen}>
      <div className={styles.top}>
        <button type="button" className={styles.back} onClick={onBack} aria-label="返回">
          ‹
        </button>
      </div>

      <h1 className={styles.title}>新建目标</h1>

      <label className={styles.label} htmlFor="goal-name">
        目标名称
      </label>
      <input
        id="goal-name"
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className={styles.fieldHead}>
        <span className={styles.label}>执行频率</span>
        <span className={styles.hint}>每周 {dayCount} 天</span>
      </div>
      <div className={styles.days}>
        {WEEK.map((d, i) => (
          <button
            key={d}
            type="button"
            className={`${styles.day} ${days[i] ? styles.dayOn : ''}`}
            onClick={() => setDays((p) => p.map((v, idx) => (idx === i ? !v : v)))}
            aria-pressed={days[i]}
          >
            {d}
          </button>
        ))}
      </div>

      <div className={styles.fieldHead}>
        <span className={styles.label}>每天任务数</span>
        <span className={styles.hint}>共 {weekly} 项 / 周</span>
      </div>
      <div className={styles.stepper}>
        <button type="button" onClick={() => setCount((c) => Math.max(1, c - 1))} aria-label="减少">
          −
        </button>
        <span>{count}</span>
        <button type="button" onClick={() => setCount((c) => Math.min(9, c + 1))} aria-label="增加">
          ＋
        </button>
      </div>

      <div className={styles.fieldHead}>
        <span className={styles.label}>提醒设置</span>
        <span className={styles.hint}>可选</span>
      </div>
      <button type="button" className={styles.reminder} onClick={onOpenReminder}>
        07:30 · 每天一次 ›
      </button>

      <div className={styles.bottom}>
        <button type="button" className={styles.next} onClick={onNext}>
          下一步
        </button>
      </div>
    </div>
  )
}
