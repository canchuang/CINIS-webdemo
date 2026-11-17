import styles from './CheckinToast.module.css'
import type { GameMode } from '../data/content'

type Props = {
  mode: GameMode
  taskTitle: string
  duration: string
  xp: number
  soul: number
  onClose: () => void
}

/** 打卡/点火成功弹窗，配色随模式（旅者绿 / 骑士黄 / 深渊紫） */
export function CheckinToast({ mode, taskTitle, duration, xp, soul, onClose }: Props) {
  const title = mode === 'abyss' ? '点火成功' : '打卡成功'
  const cls = mode === 'knight' ? styles.knight : mode === 'abyss' ? styles.abyss : styles.traveler

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div className={`${styles.card} ${cls}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className={styles.flameWrap} aria-hidden="true">
          <span className={styles.glow} />
          <span className={styles.flame}>🔥</span>
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.sub}>
          {taskTitle} · {duration}
        </p>

        <div className={styles.rewards}>
          <span className={styles.xp}>+{xp} XP</span>
          <span className={styles.soul}>+{soul} 魂火</span>
        </div>

        <button type="button" className={styles.btn} onClick={onClose}>
          继续
        </button>
      </div>
    </div>
  )
}
