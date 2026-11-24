import styles from './GoalDetailPage.module.css'
import { PageHeader } from '../components/PageHeader'
import { useAppState } from '../data/appStore'
import { RULES, isDone, localDay, tasksFor } from '../domain/engine'
type Props = {
  goalId: string | null
  onBack: () => void
  onEdit: () => void
  onEnter: (id: string) => void
}
export function GoalDetailPage({ goalId, onBack, onEdit, onEnter }: Props) {
  const s = useAppState(),
    g = s.goals.find((g) => g.id === goalId && !g.deletedAt)
  if (!g)
    return (
      <div className={styles.page}>
        <PageHeader title="目标详情" onBack={onBack} />
        <p>目标不存在或已删除</p>
      </div>
    )
  const today = tasksFor(s, g.mode, localDay()).filter((t) => t.goalId === g.id)
  const all = Object.values(s.plans)
      .flat()
      .filter((t) => t.goalId === g.id),
    done = all.filter((t) => isDone(s, t.id)).length,
    rate = all.length ? done / all.length : 0
  return (
    <div className={styles.page}>
      <PageHeader title="目标详情" onBack={onBack} size="lg" />
      <p className={styles.status}>
        {RULES[g.mode].label} · 每周 {g.scheduledDays.filter(Boolean).length} 天
      </p>
      <h2 className={styles.goalTitle}>{g.title}</h2>
      <div className={styles.progressRow}>
        <span className={styles.big}>
          {Math.round(rate * 100)}
          <em>% 计划完成</em>
        </span>
      </div>
      <p>
        {done} / {all.length} 项 · 每项 {g.durationMin} 分钟
      </p>
      <h3 className={styles.sectionLabel}>今天的任务</h3>
      <ul className={styles.tasks}>
        {today.map((t) => (
          <li key={t.id} className={styles.task}>
            <span className={styles.taskTitle}>{t.title}</span>
            <span className={styles.taskState}>
              {isDone(s, t.id) ? '已完成' : '待完成'}
            </span>
          </li>
        ))}
      </ul>
      {today.length === 0 && <p>今天是休息日</p>}
      <div className={styles.actions}>
        <button className={styles.btnEdit} onClick={onEdit}>
          编辑目标
        </button>
        {today.find((t) => !isDone(s, t.id)) && (
          <button
            className={styles.btnEnter}
            onClick={() => onEnter(today.find((t) => !isDone(s, t.id))!.id)}
          >
            进入
          </button>
        )}
      </div>
    </div>
  )
}
