/**
 * CINIS 设计令牌
 * 色值与字号来源：Figma 文件「图形界面设计」页 CINIS
 * （figma_spec phase=style 读取的真实值，非估测）
 */

export const colors = {
  // 基础
  bg: '#F5F7FB',
  surface: '#FFFFFF',
  ink: '#16181D',
  ink2: '#5F6773',
  mute: '#98A2B3',
  disabled: '#B6BCC7',
  line: '#E4E7EC',
  line2: '#EEF0F4',

  // 品牌
  primary: '#FF7A1A',
  primarySoft: '#FFF1E6',
  primaryDim: 'rgba(255, 122, 26, 0.15)',

  // 状态
  positive: '#287D68',
  gold: '#F5C66A',
  danger: '#C4344B',
  ember: '#FF873F',
} as const

/** 三模式主题：卡片底色 / 主文字 / 次文字 / 强调 / 分隔 / 光效 */
export type ModeTheme = {
  card: string
  text: string
  text2: string
  accent: string
  line: string
  glow: string
}

export const modeThemes: Record<'traveler' | 'knight' | 'abyss', ModeTheme> = {
  traveler: {
    card: '#15211C',
    text: '#EFEAE1',
    text2: '#8FA79B',
    accent: '#287D68',
    line: '#2A3A32',
    glow: 'rgba(40, 125, 104, 0.25)',
  },
  knight: {
    card: '#1A1B2E',
    text: '#EDEAF5',
    text2: '#9AA0C0',
    accent: '#E0B45C',
    line: '#2C2E48',
    glow: 'rgba(224, 180, 92, 0.22)',
  },
  abyss: {
    card: '#1B1230',
    text: '#F2EBFF',
    text2: '#A594C7',
    accent: '#7C3AED',
    line: '#31244D',
    glow: 'rgba(124, 58, 237, 0.3)',
  },
}

export const font = {
  family:
    '"OPPO Sans 4.0", -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif',
  size: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 15,
    lg: 16,
    xl: 20,
    display: 26,
    hero: 28,
  },
} as const

export const radius = {
  chip: 9,
  card: 16,
  nav: 35,
  pill: 999,
} as const

/** 页面栅格：Figma 稿为 390 × 844 */
export const layout = {
  width: 390,
  height: 844,
  pad: 24,
  navHeight: 70,
  homeBarHeight: 34,
} as const

