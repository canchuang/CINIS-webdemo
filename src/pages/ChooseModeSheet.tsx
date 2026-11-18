import { useEffect, useState, type CSSProperties } from 'react'
import styles from './ChooseModeSheet.module.css'
import { chooseModeInfo, type GameMode } from '../data/content'
import { ModalBackdrop } from '../components/ModalBackdrop'
import { defaultModalBg, loadModalBg, type ModalBgConfig } from '../data/modalBg'
import { sheetFxStyle } from '../components/sheetFx'

type Props = { mode: GameMode; onClose: () => void; onFocus: () => void; onQuick: () => void }

/** 各模式的弹窗配色（对齐设计稿 11A/18A/25A） */
const SHEET_PALETTE: Record<GameMode, Record<string, string>> = {
  traveler: {
    '--sheet-ink': '#16211C',
    '--sheet-sub': '#6F8177',
    '--sheet-grabber': '#2E7D5B',
    '--sheet-main-bg': '#2E7D5B',
    '--sheet-main-text': '#FFFFFF',
    '--sheet-main-rule': '#CFE8DC',
    '--sheet-quick-bg': '#F2F7F2',
    '--sheet-quick-text': '#1B2A22',
    '--sheet-quick-desc': '#7E9187',
    '--sheet-cancel-bg': '#CDE9DC',
    '--sheet-cancel-text': '#17452F',
  },
  knight: {
    '--sheet-ink': '#1C1710',
    '--sheet-sub': '#6E6455',
    '--sheet-grabber': '#3A342B',
    '--sheet-main-bg': '#F0AD53',
    '--sheet-main-text': '#1A1206',
    '--sheet-main-rule': '#6B5424',
    '--sheet-quick-bg': '#F7EFD8',
    '--sheet-quick-text': '#2B241A',
    '--sheet-quick-desc': '#8A7A63',
    '--sheet-cancel-bg': '#F5C97E',
    '--sheet-cancel-text': '#241A05',
  },
  abyss: {
    '--sheet-ink': '#1F1A2B',
    '--sheet-sub': '#7A6F8C',
    '--sheet-grabber': '#6B6280',
    '--sheet-main-bg': '#EFE7FA',
    '--sheet-main-text': '#4C2C86',
    '--sheet-main-rule': '#7A5FA8',
    '--sheet-quick-bg': '#F4F1FA',
    '--sheet-quick-text': '#2A2238',
    '--sheet-quick-desc': '#8D82A3',
    '--sheet-cancel-bg': '#E7DEFA',
    '--sheet-cancel-text': '#3E2A62',
  },
}

/** 各模式「点火专注」下的规则文案 */
const FOCUS_RULE: Record<GameMode, string> = {
  traveler: '随时可暂停 · 无次数限制',
  knight: '本轮可暂停 1 次 · 每次 ≤ 10 分钟',
  abyss: '无暂停 · 中断即判负',
}

/** 11A / 18A / 25A 完成方式弹层 */
export function ChooseModeSheet({ mode, onClose, onFocus, onQuick }: Props) {
  const c = chooseModeInfo
  const [bg, setBg] = useState<ModalBgConfig>(defaultModalBg)
  useEffect(() => {
    setBg(loadModalBg())
  }, [])
  const fx = sheetFxStyle(bg)

  const style = { ...(SHEET_PALETTE[mode] as CSSProperties), ...fx.style }

  return (
    <div className={styles.overlay} role="presentation">
      <ModalBackdrop config={bg} onClick={onClose} />

      <div
        className={`${styles.sheet} ${fx.className}`}
        style={style}
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
          <span className={styles.mainRule}>{FOCUS_RULE[mode]}</span>
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
