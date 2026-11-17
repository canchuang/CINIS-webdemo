import { useState } from 'react'
import styles from './GoalEditPage.module.css'
import widgets from '../styles/widgets.module.css'
import { PageHeader } from '../components/PageHeader'
import { goalDetail } from '../data/content'

type Props = { onBack: () => void; onSave: () => void }

/** P07 编辑目标 */
export function GoalEditPage({ onBack, onSave }: Props) {
  const g = goalDetail
  const [days, setDays] = useState(g.weekdays.map((d) => d.on))
  const [count, setCount] = useState(3)

  const toggleDay = (i: number) => {
    setDays((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  const dayCount = days.filter(Boolean).length

  return (
    <div className={styles.page}>
      <PageHeader title="编辑目标" onBack={onBack} size="lg" />

      <div className={styles.field}>
        <span className={styles.label}>名称</span>
        <p className={styles.name}>{g.title}</p>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldHead}>
          <span className={styles.label}>执行频率</span>
          <span className={styles.hint}>每周 {dayCount} 天</span>
        </div>
        <div className={styles.days}>
          {g.weekdays.map((d, i) => (
            <button
              key={d.label}
              type="button"
              className={`${styles.day} ${days[i] ? styles.dayOn : ''}`}
              onClick={() => toggleDay(i)}
              aria-pressed={days[i]}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldHead}>
          <span className={styles.label}>每天任务数</span>
          <span className={styles.hint}>{count} 项 / 天</span>
        </div>
        <div className={styles.stepper}>
          <button type="button" className={styles.stepBtn} onClick={() => setCount((c) => Math.max(1, c - 1))} aria-label="减少">
            −
          </button>
          <span className={styles.stepValue}>{count}</span>
          <button type="button" className={styles.stepBtn} onClick={() => setCount((c) => Math.min(9, c + 1))} aria-label="增加">
            +
          </button>
        </div>
      </div>

      <ul className={styles.rows}>
        {g.settings
          .filter((s) => ['remind', 'rest', 'standard'].includes(s.key))
          .map((s) => (
            <li key={s.key}>
              <button type="button" className={widgets.row}>
                <span className={widgets.rowLabel}>{s.label}</span>
                <span className={widgets.rowValue}>
                  {s.label === '提醒' ? '21:00' : s.value}
                  <span className={widgets.arrow} aria-hidden="true">
                    ›
                  </span>
                </span>
              </button>
            </li>
          ))}
      </ul>

      <p className={styles.notice}>
        <strong>改动只影响之后的任务</strong>
        已完成的记录、已结算魂火与当前阶段门槛不会重算。
      </p>

      <button type="button" className={widgets.btnDanger} style={{ marginTop: 18 }}>
        删除这个目标
      </button>
      <div style={{ height: 10 }} />
      <button type="button" className={widgets.btnPrimary} onClick={onSave}>
        保存修改
      </button>
    </div>
  )
}
