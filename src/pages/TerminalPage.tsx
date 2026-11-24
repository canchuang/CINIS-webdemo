import styles from './TerminalPage.module.css'
import { PageHeader } from '../components/PageHeader'
import { useAppState } from '../data/appStore'
import { RULES, growth, type Mode } from '../domain/engine'
export function TerminalPage({
  mode = 'traveler',
  onBack,
  onChangeMode,
  onContinue,
}: {
  mode?: Mode
  onBack: () => void
  onChangeMode: () => void
  onContinue: () => void
}) {
  const s = useAppState(),
    g = growth(s),
    rule = RULES[mode]
  return (
    <div className={styles.page}>
      <PageHeader title="暂歇之后，还能再出发" onBack={onBack} />
      <div className={styles.card}>
        <p className={styles.cardTitle}>本次专注未完成</p>
        <p className={styles.cardSub}>本次不发放奖励。任务仍可重新安排专注。</p>
      </div>
      <p>
        {rule.label}阶段门槛：
        {rule.threshold ? `${rule.threshold * 100}%` : '无门槛'}
        。阶段结束时，未达标会损失 {rule.loss * 100}% 暂存魂火。
      </p>
      <p>
        已保留 {g.xp} XP、{g.titles.length} 个称号和全部历史记录。
      </p>
      <div className={styles.actions}>
        <button className={styles.btnSecondary} onClick={onChangeMode}>
          换个模式
        </button>
        <button className={styles.btnPrimary} onClick={onContinue}>
          回到今天
        </button>
      </div>
    </div>
  )
}
