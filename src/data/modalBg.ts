/**
 * 弹窗背景动效参数
 * 由「弹窗背景动效编辑器」(#modal-bg-editor) 实时调整，
 * 通过 localStorage 持久化，弹窗组件读取后呈现。
 */

export type ModalBgConfig = {
  /** 是否启用动效背景 */
  enabled: boolean
  /** 主光颜色（底部暖光） */
  glowColor: string
  /** 光晕强度 0~1 */
  glowOpacity: number
  /** 光晕大小倍率 0.5~2 */
  glowScale: number
  /** 呼吸起伏速度（秒/周期）0.5~8 */
  breathSpeed: number
  /** 呼吸幅度 0~0.6 */
  breathAmount: number
  /** 遮罩底色 */
  maskColor: string
  /** 遮罩不透明度 0~1 */
  maskOpacity: number
  /** 粒子数量 0~40 */
  particleCount: number
  /** 粒子上升速度（秒穿透全屏）1~12 */
  particleSpeed: number
  /** 粒子大小 px 1~8 */
  particleSize: number
  /** 粒子颜色 */
  particleColor: string
  /** 粒子不透明度 0~1 */
  particleOpacity: number
  /** 是否开启光晕上浮动画 */
  riseEnabled: boolean

  /* ===== 弹窗面板（sheet）本身的特效 ===== */
  /** 是否启用面板特效 */
  sheetFxEnabled: boolean
  /** 面板边缘辉光颜色 */
  sheetGlowColor: string
  /** 面板边缘辉光强度 0~1 */
  sheetGlowStrength: number
  /** 面板辉光扩散半径 px 0~60 */
  sheetGlowSpread: number
  /** 面板顶部高光线是否开启 */
  sheetTopLight: boolean
  /** 光泽扫过是否开启 */
  sheetSheen: boolean
  /** 光泽扫过周期（秒）0.8~8 */
  sheetSheenSpeed: number
  /** 光泽颜色 */
  sheetSheenColor: string
  /** 是否轻微浮动 */
  sheetFloat: boolean
  /** 浮动幅度 px 0~12 */
  sheetFloatAmount: number
  /** 浮动周期（秒）1~8 */
  sheetFloatSpeed: number
}

export const defaultModalBg: ModalBgConfig = {
  enabled: true,
  glowColor: '#F0AD53',
  glowOpacity: 0.9,
  glowScale: 1.15,
  breathSpeed: 3.6,
  breathAmount: 0.18,
  maskColor: '#16181D',
  maskOpacity: 0.55,
  particleCount: 14,
  particleSpeed: 6,
  particleSize: 3,
  particleColor: '#FFE0A8',
  particleOpacity: 0.75,
  riseEnabled: true,

  // 弹窗面板特效
  sheetFxEnabled: true,
  sheetGlowColor: '#F0AD53',
  sheetGlowStrength: 0.55,
  sheetGlowSpread: 26,
  sheetTopLight: true,
  sheetSheen: true,
  sheetSheenSpeed: 3.2,
  sheetSheenColor: '#FFFFFF',
  sheetFloat: true,
  sheetFloatAmount: 4,
  sheetFloatSpeed: 4.5,
}

const KEY = 'cinis:modal-bg-config:v3'

export function loadModalBg(): ModalBgConfig {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...defaultModalBg }
    const parsed = JSON.parse(raw)
    return { ...defaultModalBg, ...parsed }
  } catch {
    return { ...defaultModalBg }
  }
}

export function saveModalBg(cfg: ModalBgConfig) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cfg))
  } catch {
    /* ignore */
  }
}

export const MODAL_BG_STORAGE_KEY = KEY


