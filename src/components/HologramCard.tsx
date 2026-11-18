import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import styles from './HologramCard.module.css'

type Props = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** 最大倾斜角度 */
  maxTilt?: number
  /** 深度浮雕图（可选）：作为视差遮罩，暗=低 亮=高 */
  depth?: string
}

type Tilt = { rx: number; ry: number; px: number; py: number; active: boolean }

/**
 * 全息卡片：在可拖拽 3D 倾斜的基础上叠加
 *  · 随手指移动的虹彩渐变（holographic foil）
 *  · 跟随光标的眩光高光（glare）
 *  · 角色层的深度视差（translateZ）
 *  · 倾斜时的 RGB 色散边缘
 */
export function HologramCard({ children, className = '', style, maxTilt = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<Tilt>({ rx: 0, ry: 0, px: 0.5, py: 0.5, active: false })

  const target = useRef<Tilt>({ rx: 0, ry: 0, px: 0.5, py: 0.5, active: false })
  const current = useRef<Tilt>({ rx: 0, ry: 0, px: 0.5, py: 0.5, active: false })
  const raf = useRef<number | null>(null)
  const lastMove = useRef(0)

  const loop = useCallback(() => {
    const t = target.current
    const c = current.current
    const k = t.active ? 0.24 : 0.12
    c.rx += (t.rx - c.rx) * k
    c.ry += (t.ry - c.ry) * k
    c.px += (t.px - c.px) * k
    c.py += (t.py - c.py) * k
    c.active = t.active

    setTilt({ rx: c.rx, ry: c.ry, px: c.px, py: c.py, active: c.active })

    const settled =
      Math.abs(t.rx - c.rx) < 0.02 &&
      Math.abs(t.ry - c.ry) < 0.02 &&
      Math.abs(t.px - c.px) < 0.002 &&
      Math.abs(t.py - c.py) < 0.002 &&
      !t.active
    if (settled) {
      current.current = { rx: 0, ry: 0, px: 0.5, py: 0.5, active: false }
      setTilt({ rx: 0, ry: 0, px: 0.5, py: 0.5, active: false })
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
    const nx = Math.min(1, Math.max(0, (clientX - r.left) / r.width))
    const ny = Math.min(1, Math.max(0, (clientY - r.top) / r.height))
    const px = (nx - 0.5) * 2
    const py = (ny - 0.5) * 2
    target.current = {
      ry: px * maxTilt,
      rx: -py * maxTilt,
      px: nx,
      py: ny,
      active: true,
    }
  }

  const release = () => {
    target.current = { ...target.current, rx: 0, ry: 0, active: false }
    start()
  }

  // 色散强度随倾斜角度变化
  const ab = (Math.abs(tilt.rx) + Math.abs(tilt.ry)) / (maxTilt * 2)

  return (
    <div className={styles.stage}>
      <span
        className={styles.shadow}
        aria-hidden="true"
        style={{
          transform: `translate(${(-tilt.ry * 0.9).toFixed(1)}px, ${(Math.abs(tilt.rx) * 0.5 + 6).toFixed(
            1,
          )}px) scale(${1 + Math.abs(tilt.rx + tilt.ry) * 0.004})`,
        }}
      />
      <div
        ref={ref}
        className={`${styles.card} ${className}`}
        style={
          {
            ...style,
            transform: `perspective(900px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(
              2,
            )}deg) scale(${tilt.active ? 1.02 : 1})`,
            '--hx': `${(tilt.px * 100).toFixed(1)}%`,
            '--hy': `${(tilt.py * 100).toFixed(1)}%`,
            '--ab': ab.toFixed(3),
          } as CSSProperties
        }
        onPointerDown={(e) => {
          ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
          compute(e.clientX, e.clientY)
          start()
        }}
        onPointerMove={(e) => {
          if (!target.current.active) return
          const now = performance.now()
          if (now - lastMove.current < 12) return
          lastMove.current = now
          compute(e.clientX, e.clientY)
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
      >
        {/* 卡片本体 */}
        <div className={styles.content}>{children}</div>

        {/* 虹彩箔层：随光标移动的彩虹渐变 */}
        <span className={styles.holo} aria-hidden="true" />
        {/* 全息箔条纹 */}
        <span className={styles.foil} aria-hidden="true" />
        {/* 眩光：跟随光标的高光 */}
        <span className={styles.glare} aria-hidden="true" />
        {/* 细密光栅：全息颗粒感 */}
        <span className={styles.grain} aria-hidden="true" />
      </div>
    </div>
  )
}


