import styles from './TaskDonePage.module.css'
import widgets from '../styles/widgets.module.css'
import { PageHeader } from '../components/PageHeader'
import { taskDoneInfo } from '../data/content'

type Props = { onBack: () => void; onNext: () => void; onHome: () => void }

/** P10 任务完成反馈 */
export function TaskDonePage({ onBack, onNext, onHome }: Props) {
  const t = taskDoneInfo
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
        <div className={styles.fill} style={{ width: `${t.todayRatio * 100}%` }} />
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
