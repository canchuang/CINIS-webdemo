import { useEffect, useRef, useState } from 'react'
import styles from './TimePickerSheet.module.css'

type Props = {
  initialHour?: number
  initialMinute?: number
  onClose: () => void
  onConfirm: (hour: number, minute: number) => void
}

const ITEM_H = 44 // 每格高度（px），与 CSS 保持一致

/**
 * 提醒时间滚轮弹窗（N02b）
 * 真实滚轮：滚动吸附 + 数字随滚动翻转（3D rotateX），松手自动对齐到最近整格。
 */
export function TimePickerSheet({ initialHour = 4, initialMinute = 23, onClose, onConfirm }: Props) {
  const [hour, setHour] = useState(initialHour)
  const [minute, setMinute] = useState(initialMinute)
  const hourRef = useRef<HTMLDivElement>(null)
  const minRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 初始滚动到对应位置
    const setScroll = (el: HTMLDivElement | null, val: number) => {
      if (el) el.scrollTop = val * ITEM_H
    }
    setScroll(hourRef.current, hour)
    setScroll(minRef.current, minute)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 滚动结束后吸附并取值（防抖模拟 scrollend） */
  const handleSettle = (el: HTMLDivElement, max: number, setter: (v: number) => void) => {
    const idx = Math.round(el.scrollTop / ITEM_H)
    const clamped = Math.max(0, Math.min(max, idx))
    el.scrollTo({ top: clamped * ITEM_H, behavior: 'smooth' })
    setter(clamped)
  }

  // 每个滚轮各自的防抖定时器
  const settleTimers = useRef<{ hour: number | null; min: number | null }>({ hour: null, min: null })

  const onColScroll = (
    which: 'hour' | 'min',
    el: HTMLDivElement,
    max: number,
    setter: (v: number) => void,
  ) => {
    paint(el)
    if (settleTimers.current[which]) window.clearTimeout(settleTimers.current[which]!)
    settleTimers.current[which] = window.setTimeout(() => {
      handleSettle(el, max, setter)
    }, 120)
  }

  /** 滚动过程中根据每项与中心的距离做 3D 翻转与淡出 */
  const paint = (el: HTMLDivElement) => {
    const center = el.scrollTop + el.clientHeight / 2
    const children = el.querySelectorAll<HTMLElement>('[data-item]')
    children.forEach((c) => {
      const itemCenter = c.offsetTop + ITEM_H / 2
      const dist = Math.abs(itemCenter - center) / ITEM_H // 距中心的格数
      const rot = Math.max(-70, Math.min(70, (itemCenter - center) / ITEM_H * 38))
      const scale = Math.max(0.6, 1 - dist * 0.22)
      const op = Math.max(0.12, 1 - dist * 0.42)
      c.style.transform = `rotateX(${-rot}deg) scale(${scale})`
      c.style.opacity = String(op)
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className={styles.head}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="关闭">
            ✕
          </button>
          <span className={styles.title}>提醒时间</span>
          <button type="button" className={styles.ok} onClick={() => onConfirm(hour, minute)} aria-label="确定">
            ✓
          </button>
        </div>

        <div className={styles.wheelRow}>
          <div className={styles.highlight} aria-hidden="true" />

          {/* 时 */}
          <div
            className={styles.col}
            ref={hourRef}
            onScroll={(e) => onColScroll('hour', e.currentTarget, 23, setHour)}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} data-item className={styles.item}>
                {String(i).padStart(2, '0')}
              </div>
            ))}
          </div>
          <span className={styles.unit}>时</span>

          {/* 分 */}
          <div
            className={styles.col}
            ref={minRef}
            onScroll={(e) => onColScroll('min', e.currentTarget, 59, setMinute)}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <div key={i} data-item className={styles.item}>
                {String(i).padStart(2, '0')}
              </div>
            ))}
          </div>
          <span className={styles.unit}>分</span>
        </div>

        <div className={styles.rows}>
          <button type="button" className={styles.row}>
            <span>重复</span>
            <span className={styles.rowVal}>每天一次 ›</span>
          </button>
          <button type="button" className={styles.row}>
            <span>开始日期</span>
            <span className={styles.rowVal}>3 月 12 日 ›</span>
          </button>
          <button type="button" className={styles.row}>
            <span>稍后提醒</span>
            <span className={styles.rowVal}>10 分钟 ›</span>
          </button>
        </div>
      </div>
    </div>
  )
}

