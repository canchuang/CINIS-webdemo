import { assetUrl } from '../data/assets'
import styles from './KnightTerminalPage.module.css'

type Props = {
  onBack: () => void
  onChangeMode: () => void
  onRecover: () => void
}

/** P23 终止 · 骑士（FAILED · 誓约警戒） */
export function KnightTerminalPage({ onChangeMode, onRecover }: Props) {
  return (
    <div className={styles.screen}>
      <p className={styles.kicker}>FAILED · 誓约警戒</p>

      <div className={styles.hero}>
        <img src={assetUrl(`/assets/knight-fail.png`)} alt="骑士未能兑现誓约" />
      </div>

      <h1 className={styles.title}>誓约未能兑现</h1>
      <p className={styles.reason}>第 7 日判定：完成率 81%，未达 85% 门槛</p>

      <p className={styles.lossLabel}>本轮损失</p>
      <p className={styles.lossNum}>50</p>
      <p className={styles.lossNote}>
        只扣暂存魂火 30%（本轮 170 → 120）· 一半可追回
      </p>

      <ul className={styles.rows}>
        <li className={styles.row}>
          <span className={styles.rowLabel}>已得魂火</span>
          <span className={styles.rowValue}>170</span>
        </li>
        <li className={styles.row}>
          <span className={styles.rowLabel}>可追回</span>
          <span className={styles.rowValue}>25 · 72 小时内</span>
        </li>
        <li className={styles.row}>
          <span className={styles.rowLabel}>保留</span>
          <span className={styles.rowValue}>
            XP 420 · 全部称号 · 全部历史 · 等级
          </span>
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
        <button type="button" className={styles.btnPrimary} onClick={onRecover}>
          找回部分魂火 · 50%
        </button>
      </div>
      <p className={styles.foot}>失去的魂火可以追回，失去的决心也能重燃。</p>
    </div>
  )
}
