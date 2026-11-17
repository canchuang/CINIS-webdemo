import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import styles from './TiltCard.module.css'

type Props = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** 最大倾斜角度 */
  maxTilt?: number
}

type Tilt = { rx: number; ry: number; active: boolean }

/**
 * 可触摸的 3D 倾斜卡片。
 * 手指按下并在卡片上滑动时，卡片随触点位置实时倾斜（按哪边、哪边压下去）；
 * 松手后弹性回正。倾斜值经 requestAnimationFrame 插值，跟手且不卡顿。
 */
export function TiltCard({ children, className = '', style, maxTilt = 9 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<Tilt>({ rx: 0, ry: 0, active: false })

  // 目标值（手指位置决定）与当前值（屏幕渲染），用 rAF 让它平滑靠近
  const target = useRef<Tilt>({ rx: 0, ry: 0, active: false })
  const current = useRef<Tilt>({ rx: 0, ry: 0, active: false })
  const raf = useRef<number | null>(null)
  const lastMove = useRef(0)

  const loop = useCallback(() => {
    const t = target.current
    const c = current.current
    // 缓动系数：按下时跟手快，回弹时慢一些
    const k = t.active ? 0.28 : 0.14
    c.rx += (t.rx - c.rx) * k
    c.ry += (t.ry - c.ry) * k
    // active 立即生效，避免回弹途中再次按下闪烁
    c.active = t.active

    setTilt({ rx: c.rx, ry: c.ry, active: c.active })

    const settled =
      Math.abs(t.rx - c.rx) < 0.02 && Math.abs(t.ry - c.ry) < 0.02 && !t.active
    if (settled) {
      // 完全回正，停掉循环
      current.current = { rx: 0, ry: 0, active: false }
      setTilt({ rx: 0, ry: 0, active: false })
      raf.current = null
      return
    }
    raf.current = requestAnimationFrame(loop)
  }, [])

  const start = useCallback(() => {
    if (raf.current == null) raf.current = requestAnimationFrame(loop)
  }, [loop])

  useEffect(() => {
    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current)
    }
  }, [])

  const compute = (clientX: number, clientY: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = Math.min(1, Math.max(-1, (clientX - r.left) / r.width - 0.5)) * 2
    const py = Math.min(1, Math.max(-1, (clientY - r.top) / r.height - 0.5)) * 2
    // 按左边(px<0) → 右边翘起
    target.current = {
      ry: px * maxTilt,
      rx: -py * maxTilt,
      active: true,
    }
  }

  const release = () => {
    target.current = { rx: 0, ry: 0, active: false }
    start()
  }

  return (
    <div className={styles.stage}>
      <span
        className={styles.shadow}
        aria-hidden="true"
        style={{
          // 阴影朝倾斜的反方向轻微位移，制造卡片"浮起"的物理感
          transform: `translate(${(-tilt.ry * 0.9).toFixed(1)}px, ${(Math.abs(tilt.rx) * 0.5).toFixed(
            1,
          )}px) scale(${1 + Math.abs(tilt.rx + tilt.ry) * 0.004})`,
        }}
      />
      <div
        ref={ref}
        className={`${styles.card} ${className}`}
        style={{
          ...style,
          transform: `perspective(900px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(
            2,
          )}deg) scale(${tilt.active ? 1.02 : 1})`,
        }}
        onPointerDown={(e) => {
          ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
          compute(e.clientX, e.clientY)
          start()
        }}
        onPointerMove={(e) => {
          if (!target.current.active) return
          // 轻节流，避免高频 move 抖动
          const now = performance.now()
          if (now - lastMove.current < 12) return
          lastMove.current = now
          compute(e.clientX, e.clientY)
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
      >
        {children}
      </div>
    </div>
  )
}
