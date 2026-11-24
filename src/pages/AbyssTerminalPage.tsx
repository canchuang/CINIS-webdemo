import { assetUrl } from '../data/assets'
import styles from './AbyssTerminalPage.module.css'

type Props = {
  onBack: () => void
  onChangeMode: () => void
  onRestart: () => void
}

/** P30 终止 · 深渊（THE FLAME HAS FADED） */
export function AbyssTerminalPage({ onChangeMode, onRestart }: Props) {
  return (
    <div className={styles.screen}>
      <p className={styles.kicker}>THE FLAME HAS FADED</p>

      <div className={styles.hero}>
        <img src={assetUrl(`/assets/abyss-fail.png`)} alt="深渊契约已断" />
      </div>

      <h1 className={styles.title}>契约已断</h1>
      <p className={styles.reason}>第 5 日判定：未修复裂痕已满 3 次</p>

      <p className={styles.lossLabel}>本轮未结算魂火</p>
      <p className={styles.lossNum}>
        250 <span aria-hidden="true">→</span> 0
      </p>

      <ul className={styles.rows}>
        <li className={styles.keepHead}>以下全部保留</li>
        <li className={styles.row}>
          <span className={styles.rowLabel}>永久经验</span>
          <span className={styles.rowValue}>240 XP</span>
        </li>
        <li className={styles.row}>
          <span className={styles.rowLabel}>任务记录 · 称号</span>
          <span className={styles.rowValue}>12 项 · 全部保留</span>
        </li>
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onChangeMode}
        >
          换个模式
        </button>
        <button type="button" className={styles.btnPrimary} onClick={onRestart}>
          重新开始一轮
        </button>
      </div>
      <p className={styles.foot}>深渊不做交换，只承认你重启的勇气。</p>
    </div>
  )
}
