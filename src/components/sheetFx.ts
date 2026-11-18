/**
 * 弹窗面板（sheet）特效样式与工具函数。
 * 通过 CSS 变量 + 条件类名，让同一套特效可复用到任意 sheet。
 */
import type { CSSProperties } from 'react'
import type { ModalBgConfig } from '../data/modalBg'
import fx from './sheetFx.module.css'

export function sheetFxStyle(c: ModalBgConfig): { className: string; style: CSSProperties } {
  if (!c.sheetFxEnabled) return { className: '', style: {} }

  const cls = [fx.fx]
  if (c.sheetTopLight) cls.push(fx.topLight)
  if (c.sheetSheen) cls.push(fx.sheen)
  if (c.sheetFloat) cls.push(fx.float)

  // 辉光：用 --glow-color 与强度/扩散变量驱动 box-shadow
  const glowAlpha = Math.round(c.sheetGlowStrength * 255)
    .toString(16)
    .padStart(2, '0')
  const glow = `${c.sheetGlowColor}${glowAlpha}`

  const style = {
    ['--sheet-glow' as string]: glow,
    ['--sheet-glow-spread' as string]: `${c.sheetGlowSpread}px`,
    ['--sheet-sheen-speed' as string]: `${c.sheetSheenSpeed}s`,
    ['--sheet-sheen-color' as string]: c.sheetSheenColor,
    ['--sheet-float-amount' as string]: `${c.sheetFloatAmount}px`,
    ['--sheet-float-speed' as string]: `${c.sheetFloatSpeed}s`,
  } as CSSProperties

  return { className: cls.join(' '), style }
}
