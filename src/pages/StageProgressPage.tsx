import styles from './StageProgressPage.module.css'
import { PageHeader } from '../components/PageHeader'
import { stageProgressData, type GameMode } from '../data/content'

type Props = {
  mode: GameMode
  onBack: () => void
  onSettings?: () => void
  onGoTasks: () => void
}

/** 阶段进度（P14/P21/P28，三模式） */
export function StageProgressPage({ mode, onBack, onSettings, onGoTasks }: Props) {
  const d = stageProgressData[mode]
  const pct = Math.round((d.done / d.total) * 100)

  return (
    <div className={styles.page}>
      <PageHeader
        title="阶段进度"
        onBack={onBack}
        backLabel="今日"
        size="lg"
        right={
          <button type="button" className={styles.settings} onClick={onSettings}>
            挑战设置
          </button>
        }
      />

      {/* 天点阵 */}
      <div className={styles.dots}>
        {d.days.map((day) => (
          <div key={day.label} className={styles.dotCol}>
            <span
              className={`${styles.dot} ${day.state === 'done' ? styles.dotDone : ''} ${
                day.state === 'current' ? styles.dotCurrent : ''
              }`}
              style={
                day.state === 'done' || day.state === 'current'
                  ? { background: d.accent, borderColor: d.accent }
                  : undefined
              }
            />
            <span className={styles.dotLabel}>{day.label}</span>
          </div>
        ))}
      </div>
      <p className={styles.dayHint}>
        第 {d.days.findIndex((x) => x.state === 'current') + 1} 天
      </p>

      {/* 大数字 + 进度条 */}
      <div className={styles.bigRow}>
        <span className={styles.big}>
          {d.done} <em>/ {d.total}</em>
        </span>
        <span className={styles.rateBlock}>
          <span className={styles.rate}>{d.rate}</span>
          <span className={styles.remain}>{d.remainHint}</span>
        </span>
      </div>
      <div className={styles.track} aria-hidden="true">
        <div className={styles.fill} style={{ width: `${pct}%`, background: d.accent }} />
      </div>

      <h3 className={styles.section}>本轮数据</h3>
      <ul className={styles.rows}>
        {d.rows.map((r) => (
          <li key={r.label} className={styles.row}>
            <span className={styles.rowLabel}>{r.label}</span>
            <span className={styles.rowValue}>{r.value}</span>
          </li>
        ))}
      </ul>

      <h3 className={styles.section}>按日</h3>
      <ul className={styles.rows}>
        {d.daily.map((r) => (
          <li key={r.label} className={styles.row}>
            <span className={styles.rowLabel}>{r.label}</span>
            <span className={`${styles.rowValue} ${r.muted ? styles.rowMuted : ''}`}>{r.value}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.cta}
        style={{ background: d.accent }}
        onClick={onGoTasks}
      >
        {d.cta}
      </button>
    </div>
  )
}
