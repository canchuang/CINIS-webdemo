import { useEffect, useState, type CSSProperties } from 'react'
import styles from './ChooseModeSheet.module.css'
import { chooseModeInfo, modeTasks, type GameMode } from '../data/content'
import { ModalBackdrop } from '../components/ModalBackdrop'
import { defaultModalBg, loadModalBg, type ModalBgConfig } from '../data/modalBg'
import { sheetFxStyle } from '../components/sheetFx'
import { taskStore } from '../data/taskStore'

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
    '--sheet-ink': '#F4F0FA',
    '--sheet-sub': '#A79FC0',
    '--sheet-grabber': '#8B7FB0',
    '--sheet-main-bg': '#6342AE',
    '--sheet-main-text': '#FFFFFF',
    '--sheet-main-rule': '#D9CCF5',
    '--sheet-quick-bg': '#3A3150',
    '--sheet-quick-text': '#F1ECFA',
    '--sheet-quick-desc': '#A79FC0',
    '--sheet-cancel-bg': '#4E4269',
    '--sheet-cancel-text': '#EDE7F8',
  },
}

/** 各模式的弹窗面板底色（覆盖编辑器里的全局面板色） */
const SHEET_BG: Partial<Record<GameMode, string>> = {
  traveler: '#CCE0CE',
  abyss: 'linear-gradient(to bottom, #382F4C 0%, #241E33 100%)',
}

/** 各模式边缘光晕颜色 */
const GLOW_COLOR: Partial<Record<GameMode, string>> = {
  traveler: '#43A47F',
  abyss: '#7C3AED',
}

/** 各模式「点火专注」下的规则文案 */
const FOCUS_RULE: Record<GameMode, string> = {
  traveler: '随时可暂停 · 无次数限制',
  knight: '本轮可暂停 1 次 · 每次 ≤ 10 分钟',
  abyss: '本轮仅 1 次暂停 · 单次 ≤ 2 天',
}

/** 11A / 18A / 25A 完成方式弹层 */
export function ChooseModeSheet({ mode, onClose, onFocus, onQuick }: Props) {
  const c = chooseModeInfo
  const [bg, setBg] = useState<ModalBgConfig>(defaultModalBg)
  useEffect(() => {
    setBg(loadModalBg())
  }, [])
  const fx = sheetFxStyle(bg)

  // 当前被点击的任务（决定弹窗头部与专注卡信息）
  const focusingId = taskStore.getFocusing()
  const task =
    modeTasks[mode].find((t) => t.id === focusingId) ??
    modeTasks[mode].find((t) => !t.done) ??
    modeTasks[mode][0]
  const headerTitle = task?.title ?? c.task
  const headerMeta = task
    ? `${task.duration} · +${task.xp} XP · +${task.soul} 魂火`
    : c.meta
  const focusMeta = task
    ? `⏱ ${task.duration.replace(/\s*分钟/, ' min')} · +${task.xp} XP`
    : `⏱ ${c.focus.meta}`

  const style = { ...(SHEET_PALETTE[mode] as CSSProperties), ...fx.style }
  // 面板底色按模式覆盖（旅者浅绿 / 深渊深紫；骑士沿用编辑器奶油色）
  const bgOverride = SHEET_BG[mode]
  if (bgOverride) {
    ;(style as Record<string, string>)['--sheet-bg'] = bgOverride
  }

  return (
    <div className={styles.overlay} role="presentation">
      <ModalBackdrop config={bg} onClick={onClose} glowColorOverride={GLOW_COLOR[mode]} />

      <div
        className={`${styles.sheet} ${fx.className} ${mode === 'abyss' ? styles.sheetDark : ''}`}
        style={style}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="选择完成方式"
      >
        <div className={styles.grabber} aria-hidden="true" />

        <div className={styles.head}>
          <div>
            <p className={styles.task}>{headerTitle}</p>
            <p className={styles.meta}>{headerMeta}</p>
          </div>
          <button type="button" className={styles.cancel} onClick={onClose}>
            取消
          </button>
        </div>

        <button type="button" className={styles.main} onClick={onFocus}>
          <span className={styles.mainTitle}>{c.focus.title}</span>
          <span className={styles.mainMeta}>{focusMeta}</span>
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
