import { useEffect, useState } from 'react'
import styles from './ChooseModeSheet.module.css'
import { chooseModeInfo } from '../data/content'
import { ModalBackdrop } from '../components/ModalBackdrop'
import { defaultModalBg, loadModalBg, type ModalBgConfig } from '../data/modalBg'
import { sheetFxStyle } from '../components/sheetFx'

type Props = { onClose: () => void; onFocus: () => void; onQuick: () => void }

/** 11A 完成方式弹层 */
export function ChooseModeSheet({ onClose, onFocus, onQuick }: Props) {
  const c = chooseModeInfo
  // 读取编辑器保存的背景参数
  const [bg, setBg] = useState<ModalBgConfig>(defaultModalBg)
  useEffect(() => {
    setBg(loadModalBg())
  }, [])
  const fx = sheetFxStyle(bg)

  return (
    <div className={styles.overlay} role="presentation">
      <ModalBackdrop config={bg} onClick={onClose} />

      <div
        className={`${styles.sheet} ${fx.className}`}
        style={fx.style}
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
