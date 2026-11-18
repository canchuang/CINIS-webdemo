/**
 * 底部导航栏外观配置（由「导航栏生成器」#navBarEditor 调节）
 * 通过 localStorage 持久化，BottomNav 读取后全局生效（所有页面同步）。
 */

import type { CSSProperties } from 'react'

export type NavBarConfig = {
  /** 是否启用自定义外观（关闭则恢复默认白底） */
  enabled: boolean
  /** 背景色 */
  bgColor: string
  /** 背景不透明度 0~1（越低越透，能看见背后的高斯模糊） */
  opacity: number
  /** 高斯模糊（backdrop-filter）px 0~40 */
  blur: number
  /** 阴影颜色 */
  shadowColor: string
  /** 阴影不透明度 0~1 */
  shadowOpacity: number
  /** 阴影模糊 px 0~60 */
  shadowBlur: number
  /** 阴影纵向位移 px 0~30 */
  shadowY: number
  /** 描边不透明度 0~1 */
  borderOpacity: number
}

export const defaultNavBar: NavBarConfig = {
  enabled: true,
  bgColor: '#FFFFFF',
  opacity: 0.72,
  blur: 18,
  shadowColor: '#16181D',
  shadowOpacity: 0.1,
  shadowBlur: 28,
  shadowY: 8,
  borderOpacity: 0.6,
}

const KEY = 'cinis:nav-bar-config:v1'

export function loadNavBar(): NavBarConfig {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...defaultNavBar }
    return { ...defaultNavBar, ...JSON.parse(raw) }
  } catch {
    return { ...defaultNavBar }
  }
}

export function saveNavBar(cfg: NavBarConfig) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cfg))
  } catch {
    /* ignore */
  }
}

/** 颜色 + 透明度 → rgba() */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** 生成应用到 nav 容器的内联样式 */
export function navBarStyle(c: NavBarConfig): CSSProperties {
  if (!c.enabled) return {}
  return {
    background: withAlpha(c.bgColor, c.opacity),
    backdropFilter: c.blur > 0 ? `blur(${c.blur}px) saturate(1.4)` : undefined,
    WebkitBackdropFilter: c.blur > 0 ? `blur(${c.blur}px) saturate(1.4)` : undefined,
    borderColor: withAlpha(c.bgColor === '#FFFFFF' ? '#000000' : '#FFFFFF', c.borderOpacity * 0.12),
    boxShadow: `0 ${c.shadowY}px ${c.shadowBlur}px ${withAlpha(c.shadowColor, c.shadowOpacity)}`,
  }
}

export const NAV_BAR_STORAGE_KEY = KEY

