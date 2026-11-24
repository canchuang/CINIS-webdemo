import { useMemo } from 'react'
import styles from './ModalBackdrop.module.css'
import type { ModalBgConfig } from '../data/modalBg'

type Props = { config: ModalBgConfig; onClick?: () => void; glowColorOverride?: string }

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * 弹窗背景动效层：暖色光晕呼吸 + 上升粒子 + 遮罩。
 * 参数全部来自 ModalBgConfig，可在编辑器里实时调。
 * glowColorOverride 可按模式覆盖光晕颜色（如旅者用绿色）。
 */
export function ModalBackdrop({ config: c, onClick, glowColorOverride }: Props) {
  const glowColor = glowColorOverride ?? c.glowColor
  // 粒子随机参数（只算一次，避免每次渲染重排）
  const particles = useMemo(
    () =>
      Array.from({ length: Math.max(0, Math.min(40, c.particleCount)) }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: -Math.random() * c.particleSpeed,
        duration: c.particleSpeed * (0.75 + Math.random() * 0.5),
        drift: (Math.random() - 0.5) * 30,
        scale: 0.7 + Math.random() * 0.6,
      })),
    [c.particleCount, c.particleSpeed],
  )

  if (!c.enabled) {
    return (
      <div
        className={styles.plainMask}
        style={{ background: c.maskColor, opacity: c.maskOpacity }}
        onClick={onClick}
      />
    )
  }

  return (
    <div className={styles.backdrop} onClick={onClick}>
      {/* 遮罩层（唯一压暗来源，避免重复叠加） */}
      <div className={styles.mask} style={{ background: c.maskColor, opacity: c.maskOpacity }} />

      {/* 底部暖光晕 */}
      <div
        className={`${styles.glow} ${c.riseEnabled ? styles.glowRise : ''}`}
        style={{
          background: `radial-gradient(circle at 50% 100%, ${glowColor} 0%, ${hexToRgba(glowColor, 0.55)} 38%, ${hexToRgba(glowColor, 0)} 72%)`,
          opacity: c.glowOpacity,
          ['--breath-speed' as string]: `${c.breathSpeed}s`,
          ['--breath-amount' as string]: c.breathAmount,
          ['--glow-scale' as string]: c.glowScale,
        }}
      />

      {/* 上升粒子 */}
      <div className={styles.particles} aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              left: `${p.left}%`,
              width: c.particleSize,
              height: c.particleSize,
              background: c.particleColor,
              opacity: c.particleOpacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ['--drift' as string]: `${p.drift}px`,
              ['--scale' as string]: p.scale,
            }}
          />
        ))}
      </div>
    </div>
  )
}
