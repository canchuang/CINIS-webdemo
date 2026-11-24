import styles from './GoalEditPage.module.css'
import widgets from '../styles/widgets.module.css'
import { PageHeader } from '../components/PageHeader'
import { appStore, useAppState } from '../data/appStore'
import { GoalForm } from './GoalForm'
export function GoalEditPage({
  goalId,
  onBack,
  onSave,
}: {
  goalId: string | null
  onBack: () => void
  onSave: () => void
}) {
  const state = useAppState(),
    g = state.goals.find((g) => g.id === goalId && !g.deletedAt)
  return (
    <div className={styles.page}>
      <PageHeader title="编辑目标" onBack={onBack} size="lg" />
      {g ? (
        <>
          <GoalForm
            key={g.id}
            mode={g.mode}
            initial={g}
            onSave={(draft) => {
              appStore.editGoal(g.id, draft)
              onSave()
            }}
            label="保存修改"
          />
          <p className={styles.notice}>
            修改和删除从明天生效，今天的任务与已完成记录会保留。
          </p>
          <button
            className={widgets.btnDanger}
            onClick={() => {
              if (window.confirm(`删除「${g.title}」？历史记录会保留。`)) {
                appStore.deleteGoal(g.id)
                onSave()
              }
            }}
          >
            删除这个目标
          </button>
        </>
      ) : (
        <p>请从目标页选择一个目标。</p>
      )}
    </div>
  )
}
