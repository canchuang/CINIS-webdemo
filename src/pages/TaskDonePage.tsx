import styles from './TaskDonePage.module.css'
import widgets from '../styles/widgets.module.css'
import { PageHeader } from '../components/PageHeader'
import { useAppState } from '../data/appStore'
import { growth, isDone, localDay, shiftDay, tasksFor } from '../domain/engine'

type Props = { onBack: () => void; onNext: () => void; onHome: () => void }

/** P10 任务完成反馈 */
export function TaskDonePage({ onBack, onNext, onHome }: Props) {
  const state = useAppState(),
    c = state.completions.at(-1),
    g = growth(state)
  const tasks = tasksFor(state, state.mode, localDay()),
    done = tasks.filter((t) => isDone(state, t.id)).length
  const activeDays = new Set(state.completions.map((c) => c.task.day))
  let streak = 0,
    day = activeDays.has(localDay()) ? localDay() : shiftDay(localDay(), -1)
  while (activeDays.has(day)) {
    streak++
    day = shiftDay(day, -1)
  }
  const t = {
    title: c?.task.title ?? '暂无完成记录',
    meta: c
      ? `${c.task.day} · 有效专注 ${Math.floor(c.focusedMs / 60000)} 分钟`
      : '从今日页开始第一项任务',
    xp: c ? `+${c.task.xp} XP` : '0 XP',
    xpRange: `累计 ${g.xp} XP`,
    soul: c ? `+${c.task.soul}` : '0',
    soulRange: '阶段结束后统一结算',
    todayText: `今日 ${done} / ${tasks.length}`,
    todayRatio: tasks.length ? done / tasks.length : 0,
    remainText: `还剩 ${tasks.length - done} 项`,
    streak,
    streakHint: '按任务归属日期统计',
  }
  return (
    <div className={styles.page}>
      <PageHeader title="已记录" onBack={onBack} size="lg" />

      <h2 className={styles.headline}>{t.title}</h2>
      <p className={styles.meta}>{t.meta}</p>

      <ul className={styles.rewards}>
        <li className={styles.reward}>
          <span className={styles.rLabel}>永久经验</span>
          <span className={styles.rMain}>
            {t.xp}
            <em>{t.xpRange}</em>
          </span>
        </li>
        <li className={styles.reward}>
          <span className={styles.rLabel}>本轮魂火</span>
          <span className={`${styles.rMain} ${styles.soul}`}>
            {t.soul}
            <em>{t.soulRange}</em>
          </span>
        </li>
      </ul>

      <div className={styles.todayRow}>
        <span className={styles.todayText}>{t.todayText}</span>
      </div>
      <div className={styles.track} aria-hidden="true">
        <div
          className={styles.fill}
          style={{ width: `${t.todayRatio * 100}%` }}
        />
      </div>
      <p className={styles.remain}>{t.remainText}</p>

      <div className={styles.streak}>
        <span className={styles.streakLabel}>连续记录</span>
        <p className={styles.streakNum}>
          <strong>{t.streak}</strong>
          <span>天</span>
          <em>{t.streakHint}</em>
        </p>
      </div>

      <div className={widgets.actions}>
        <button type="button" className={widgets.btnPrimary} onClick={onNext}>
          继续下一项
        </button>
        <button type="button" className={widgets.btnSecondary} onClick={onHome}>
          回到今日
        </button>
      </div>
    </div>
  )
}
