import { assetUrl } from '../data/assets'
import styles from './AbyssRestartPage.module.css'
import { PageHeader } from '../components/PageHeader'

type Props = {
  onBack: () => void
  onAnother: () => void
  onFromAshes: () => void
}

/** P31 后续 · 深渊（重新开始，浅色） */
export function AbyssRestartPage({ onBack, onAnother, onFromAshes }: Props) {
  return (
    <div className={styles.page}>
      <PageHeader title="重新开始" onBack={onBack} backLabel="今日" size="lg" />

      <div className={styles.hero}>
        <img src={assetUrl(`/assets/abyss-restart.png`)} alt="深渊" />
      </div>

      <h2 className={styles.lead}>深渊不接受追回。</h2>
      <p className={styles.leadSub}>
        熄灭那一刻，未结算魂火直接归零。这一页只处理「怎么再来一次」。
      </p>

      <div className={styles.zeroCard}>
        <span className={styles.zeroLabel}>已归零</span>
        <p className={styles.zeroTitle}>250 魂火 · 本轮进度</p>
        <p className={styles.zeroSub}>没有恢复任务，也不存在「找回」入口</p>
      </div>

      <div className={styles.keepCard}>
        <span className={styles.keepLabel}>不变的只有这些</span>
        <p className={styles.keepValue}>
          永久经验 240 XP · 12 项记录 · 2 个称号
        </p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onAnother}
        >
          再来一轮深渊
        </button>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={onFromAshes}
        >
          从灰烬中再来一次
        </button>
      </div>
    </div>
  )
}
