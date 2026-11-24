import styles from './NewGoalPage.module.css'
import { GoalForm } from './GoalForm'
import type { GoalDraft, Mode } from '../domain/engine'
export function NewGoalPage({
  mode,
  onBack,
  onNext,
  onOpenReminder,
}: {
  mode: Mode
  onBack: () => void
  onNext: (draft: GoalDraft) => void
  onOpenReminder: () => void
}) {
  return (
    <div className={styles.screen}>
      <div className={styles.top}>
        <button className={styles.back} onClick={onBack} aria-label="返回">
          ‹
        </button>
      </div>
      <h1 className={styles.title}>新建目标</h1>
      <GoalForm mode={mode} onSave={onNext} />
      <button className={styles.reminder} onClick={onOpenReminder}>
        提醒设置 ›
      </button>
    </div>
  )
}
