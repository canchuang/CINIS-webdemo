import { assetUrl } from '../data/assets'
import styles from './KnightRecoverPage.module.css'

type Props = { onBack: () => void; onRest: () => void; onAccept: () => void }

/** P24 后续 · 骑士（REKINDLE · 重燃） */
export function KnightRecoverPage({ onRest, onAccept }: Props) {
  return (
    <div className={styles.screen}>
      <p className={styles.kicker}>REKINDLE · 重燃</p>

      <div className={styles.hero}>
        <img src={assetUrl(`/assets/knight-sleep.png`)} alt="骑士沉睡" />
      </div>

      <h1 className={styles.title}>余火未熄</h1>
      <p className={styles.sub}>损失 50 · 其中 25 可在 72 小时内追回</p>

      <ul className={styles.rows}>
        <li className={styles.row}>
          <span className={styles.rowLabel}>恢复任务</span>
          <span className={styles.rowValue}>1 项 · 追回 25</span>
        </li>
        <li className={styles.row}>
          <span className={styles.rowLabel}>任务来源</span>
          <span className={styles.rowValue}>本轮未完成的 4 项</span>
        </li>
        <li className={styles.row}>
          <span className={styles.rowLabel}>追回去向</span>
          <span className={styles.rowValue}>直接进入已结算</span>
        </li>
        <li className={styles.row}>
          <span className={styles.rowLabel}>截止</span>
          <span className={styles.rowValue}>72 小时内</span>
        </li>
      </ul>

      <div className={styles.actions}>
        <button type="button" className={styles.btnSecondary} onClick={onRest}>
          先休息，明天再说
        </button>
        <button type="button" className={styles.btnPrimary} onClick={onAccept}>
          接受恢复挑战
        </button>
      </div>
      <p className={styles.foot}>未追回的部分永久失去，不叠加任何惩罚。</p>
    </div>
  )
}
