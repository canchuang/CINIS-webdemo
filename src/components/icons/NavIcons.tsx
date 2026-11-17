/**
 * 导航图标（面性 / 实心版）
 * 形状参考 Figma 导出 SVG，改为填充式，配合选中态放大。
 */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true as const,
  ...props,
})

/** 今日：实心魂火 */
export function IconToday(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.6c3.1 2.1 5.4 5.3 5.4 9 0 3.2-2.4 5.9-5.4 5.9s-5.4-2.7-5.4-5.9c0-2 .8-3.8 2-5.3.2 1.3.9 2.3 1.9 2.7-.2-1.9.3-4 1.5-6.4Z" />
      <path d="M9.4 19.6h5.2c.5 0 .9.4.9.9s-.4.9-.9.9H9.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9Z" />
    </svg>
  )
}

/** 目标：实心同心靶 */
export function IconGoals(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 0 0 0-19.2Zm0 3.4a6.2 6.2 0 1 1 0 12.4 6.2 6.2 0 0 1 0-12.4Z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

/** 成长：实心面积折线 */
export function IconGrowth(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.4 19.5 8.6 12.4l3.9 3 6-8.6 1.6 1.2-7.4 10.5-3.9-3-4 5.5H3.4Z" />
    </svg>
  )
}

/** 我的：实心人形 */
export function IconMe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="7.4" r="4" />
      <path d="M4.2 20.6c0-4.3 3.5-7.2 7.8-7.2s7.8 2.9 7.8 7.2c0 .5-.4.9-.9.9H5.1c-.5 0-.9-.4-.9-.9Z" />
    </svg>
  )
}
