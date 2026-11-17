import styles from './ChooseModeSheet.module.css'
import { chooseModeInfo } from '../data/content'

type Props = { onClose: () => void; onFocus: () => void; onQuick: () => void }

/** 11A 完成方式弹层 */
export function ChooseModeSheet({ onClose, onFocus, onQuick }: Props) {
  const c = chooseModeInfo
  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.sheet}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="选择完成方式"
      >
        <div className={styles.grabber} aria-hidden="true" />

        <div className={styles.head}>
          <div>
            <p className={styles.task}>{c.task}</p>
            <p className={styles.meta}>{c.meta}</p>
          </div>
          <button type="button" className={styles.cancel} onClick={onClose}>
            取消
          </button>
        </div>

        <button type="button" className={styles.main} onClick={onFocus}>
          <span className={styles.mainTitle}>{c.focus.title}</span>
          <span className={styles.mainMeta}>⏱ {c.focus.meta}</span>
          <span className={styles.mainRule}>{c.focus.rule}</span>
          <span className={styles.mainArrow} aria-hidden="true">
            ›
          </span>
        </button>

        <button type="button" className={styles.quick} onClick={onQuick}>
          <span className={styles.quickTitle}>{c.quick.title}</span>
          <span className={styles.quickMeta}>{c.quick.meta}</span>
          <span className={styles.quickArrow} aria-hidden="true">
            ›
          </span>
        </button>
      </div>
    </div>
  )
}
