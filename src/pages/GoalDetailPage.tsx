import styles from './GoalDetailPage.module.css'
import widgets from '../styles/widgets.module.css'
import { PageHeader } from '../components/PageHeader'
import { goalDetail } from '../data/content'

type Props = {
  onBack: () => void
  onEdit: () => void
  onEnter: () => void
}

/** P06 目标详情 */
export function GoalDetailPage({ onBack, onEdit, onEnter }: Props) {
  const g = goalDetail
  return (
    <div className={styles.page}>
      <PageHeader title="目标详情" onBack={onBack} size="lg" />

      <p className={styles.status}>
        <span className={styles.dot} aria-hidden="true" />
        {g.mode} · 第 {g.dayIndex} 天
      </p>
      <h2 className={styles.goalTitle}>{g.title}</h2>

      <div className={styles.progressRow}>
        <span className={styles.big}>
          {Math.round(g.progress * 100)}
          <em>% 本轮完成</em>
        </span>
        <span className={styles.remain}>还差 {g.toTarget} 项达标</span>
      </div>
      <div className={styles.track} aria-hidden="true">
        <div className={styles.fill} style={{ width: `${g.progress * 100}%` }} />
      </div>

      <h3 className={styles.sectionLabel}>设置</h3>
      <ul className={styles.rows}>
        {g.settings.map((s) => (
          <li key={s.key}>
            <button type="button" className={widgets.row}>
              <span className={widgets.rowLabel}>{s.label}</span>
              <span className={widgets.rowValue}>
                {s.value}
                <span className={widgets.arrow} aria-hidden="true">
                  ›
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <h3 className={styles.sectionLabel}>今天的任务</h3>
      <ul className={styles.tasks}>
        {g.todayTasks.map((t) => (
          <li key={t.title} className={styles.task}>
            <span className={styles.taskTitle}>{t.title}</span>
            <span
              className={`${styles.taskState} ${
                t.state === '已完成' ? styles.stateDone : styles.stateDoing
              }`}
            >
              {t.state}
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button type="button" className={styles.btnEdit} onClick={onEdit}>
          编辑目标
        </button>
        <button type="button" className={styles.btnEnter} onClick={onEnter}>
          进入
        </button>
      </div>
    </div>
  )
}
