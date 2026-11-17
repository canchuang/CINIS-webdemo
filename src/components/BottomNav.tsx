import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './BottomNav.module.css'
import { TABS, type TabKey } from '../data/tabs'

type Props = {
  active: TabKey
  onChange: (key: TabKey) => void
}

/**
 * 底部导航
 * 浅蓝玻璃块：点击后 Q 弹形变一下，再以「先加速后减速」曲线滑到目标 icon。
 */
export function BottomNav({ active, onChange }: Props) {
  const listRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ x: 0, width: 0 })

  const measure = useCallback(() => {
    const list = listRef.current
    if (!list) return
    const el = list.querySelector<HTMLElement>(`[data-tab="${active}"]`)
    if (!el) return
    setIndicator({ x: el.offsetLeft, width: el.offsetWidth })
  }, [active])

  useEffect(() => {
    measure()
    // 字体加载会改变文字宽度，首帧后补测一次
    const id = window.setTimeout(measure, 80)
    window.addEventListener('resize', measure, { passive: true })
    return () => {
      window.clearTimeout(id)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const [popping, setPopping] = useState(false)
  const popTimer = useRef<number | null>(null)

  const handleClick = (key: TabKey) => {
    if (key === active) return
    // 指示器 Q 弹；先移除再加，保证动画能重播
    setPopping(false)
    if (popTimer.current) window.clearTimeout(popTimer.current)
    requestAnimationFrame(() => {
      setPopping(true)
      popTimer.current = window.setTimeout(() => setPopping(false), 740)
    })
    onChange(key)
  }

  return (
    <nav className={styles.nav} aria-label="主导航">
      <div className={styles.list} ref={listRef}>
        <span
          className={`${styles.indicator} ${popping ? styles.pop : ''}`}
          style={{
            transform: `translate3d(${indicator.x}px, 0, 0)`,
            width: indicator.width || undefined,
          }}
          aria-hidden="true"
        />
        {TABS.map(({ key, label, Icon }) => {
          const isActive = key === active
          return (
            <button
              key={key}
              type="button"
              data-tab={key}
              className={`${styles.item} ${isActive ? styles.active : ''}`}
              onClick={() => handleClick(key)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={styles.icon}>
                <Icon />
              </span>
              <span className={styles.label}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
