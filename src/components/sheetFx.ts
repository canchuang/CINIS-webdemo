/**
 * 弹窗面板（sheet）特效：磨砂暖白背景。
 * 用 CSS 变量驱动渐变底色 + backdrop-filter 模糊，让背后暖光自然透上来。
 */
import type { CSSProperties } from 'react'
import type { ModalBgConfig } from '../data/modalBg'
import fx from './sheetFx.module.css'

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function sheetFxStyle(c: ModalBgConfig): { className: string; style: CSSProperties } {
  if (!c.sheetFxEnabled) return { className: '', style: {} }

  const top = hexToRgba(c.sheetBgTop, c.sheetBgOpacity)
  const bottom = hexToRgba(c.sheetBgBottom, c.sheetBgOpacity)

  const style = {
    ['--sheet-bg' as string]: `linear-gradient(to bottom, ${top} 0%, ${bottom} 100%)`,
    ['--sheet-blur' as string]: `${c.sheetBlur}px`,
  } as CSSProperties

  return { className: fx.frost, style }
}
