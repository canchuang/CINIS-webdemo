/**
 * 全息卡片特效配置（由「卡片特效编辑器」#cardFxEditor 调节）
 * 存 localStorage，HologramCard 读取后三个模式今日页同步生效。
 */
import type { CSSProperties } from 'react'

export type CardFxConfig = {
  enabled: boolean
  /** 最大倾斜角度（度） */
  maxTilt: number
  /** 倾斜过渡时长 ms */
  tiltMs: number
  /** 虹彩箔静止不透明度 */
  holoBase: number
  /** 虹彩箔倾斜增强量 */
  holoTilt: number
  /** 全息条纹静止不透明度 */
  foilBase: number
  /** 全息条纹倾斜增强量 */
  foilTilt: number
  /** 眩光静止强度 */
  glareBase: number
  /** 眩光倾斜增强 */
  glareTilt: number
  /** 彩虹描边静止不透明度 */
  borderBase: number
  /** 彩虹描边倾斜增强 */
  borderTilt: number
  /** 角色层深度抬升 px */
  depthZ: number
  /** 落影强度 0~1 */
  shadow: number
  /** 各层开关 */
  showFoil: boolean
  showGlare: boolean
  showGrain: boolean
  showBorder: boolean
}

export const defaultCardFx: CardFxConfig = {
  enabled: true,
  maxTilt: 10,
  tiltMs: 120,
  holoBase: 0.5,
  holoTilt: 0.5,
  foilBase: 0.16,
  foilTilt: 0.72,
  glareBase: 0.1,
  glareTilt: 0.28,
  borderBase: 0.15,
  borderTilt: 0.75,
  depthZ: 46,
  shadow: 0.45,
  showFoil: true,
  showGlare: true,
  showGrain: true,
  showBorder: true,
}

const KEY = 'cinis:card-fx-config:v1'

export function loadCardFx(): CardFxConfig {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...defaultCardFx }
    return { ...defaultCardFx, ...JSON.parse(raw) }
  } catch {
    return { ...defaultCardFx }
  }
}

export function saveCardFx(cfg: CardFxConfig) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cfg))
  } catch {
    /* ignore */
  }
}

/** 转成 CSS 变量，供 HologramCard 使用 */
export function cardFxVars(c: CardFxConfig): CSSProperties {
  return {
    ['--tilt-ms' as string]: `${c.tiltMs}ms`,
    ['--holo-base' as string]: c.holoBase,
    ['--holo-tilt' as string]: c.holoTilt,
    ['--foil-base' as string]: c.foilBase,
    ['--foil-tilt' as string]: c.foilTilt,
    ['--glare-base' as string]: c.glareBase,
    ['--glare-tilt' as string]: c.glareTilt,
    ['--border-base' as string]: c.showBorder ? c.borderBase : 0,
    ['--border-tilt' as string]: c.showBorder ? c.borderTilt : 0,
    ['--depth-z' as string]: `${c.depthZ}px`,
    ['--shadow-strength' as string]: c.shadow,
  } as CSSProperties
}

export const CARD_FX_STORAGE_KEY = KEY

