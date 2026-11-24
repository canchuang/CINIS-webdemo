import { useState } from 'react'
import styles from './NewGoalPage.module.css'
import widgets from '../styles/widgets.module.css'
import { RULES, type GoalDraft, type Mode } from '../domain/engine'
const WEEK = ['一', '二', '三', '四', '五', '六', '日']
export function GoalForm({
  mode,
  initial,
  onSave,
  label = '下一步',
}: {
  mode: Mode
  initial?: GoalDraft
  onSave: (draft: GoalDraft) => void
  label?: string
}) {
  const [name, setName] = useState(initial?.title ?? ''),
    [days, setDays] = useState(initial?.scheduledDays ?? Array(7).fill(true)),
    [count, setCount] = useState(initial?.dailyTasks ?? 1),
    [duration, setDuration] = useState(initial?.durationMin ?? 25),
    [error, setError] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!name.trim() || !days.some(Boolean)) {
          setError('请填写名称，并至少选择一个执行日')
          return
        }
        try {
          onSave({
            title: name,
            mode,
            scheduledDays: days,
            dailyTasks: count,
            durationMin: duration,
          })
        } catch (e) {
          setError((e as Error).message)
        }
      }}
    >
      <label className={styles.label} htmlFor="goal-name">
        目标名称
      </label>
      <input
        id="goal-name"
        className={styles.input}
        value={name}
        required
        maxLength={80}
        onChange={(e) => setName(e.target.value)}
      />
      <div className={styles.fieldHead}>
        <span className={styles.label}>执行频率</span>
        <span className={styles.hint}>
          {RULES[mode].label} · 每周 {days.filter(Boolean).length} 天
        </span>
      </div>
      <div className={styles.days}>
        {WEEK.map((d, i) => (
          <button
            key={d}
            type="button"
            className={`${styles.day} ${days[i] ? styles.dayOn : ''}`}
            aria-pressed={days[i]}
            onClick={() => setDays(days.map((v, j) => (j === i ? !v : v)))}
          >
            {d}
          </button>
        ))}
      </div>
      <label className={styles.fieldHead}>
        每天任务数{' '}
        <input
          aria-label="每天任务数"
          type="number"
          min={1}
          max={RULES[mode].maxTasks}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </label>
      <label className={styles.fieldHead}>
        每项专注分钟{' '}
        <input
          aria-label="每项专注分钟"
          type="number"
          min={1}
          max={180}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </label>
      {error && <p role="alert">{error}</p>}
      <button className={widgets.btnPrimary} type="submit">
        {label}
      </button>
    </form>
  )
}
