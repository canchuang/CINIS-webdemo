import type { ComponentType, SVGProps } from 'react'
import { IconGoals, IconGrowth, IconMe, IconToday } from '../components/icons/NavIcons'

export type TabKey = 'today' | 'goals' | 'growth' | 'me'

export type Tab = {
  key: TabKey
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const TABS: Tab[] = [
  { key: 'today', label: '今日', Icon: IconToday },
  { key: 'goals', label: '目标', Icon: IconGoals },
  { key: 'growth', label: '成长', Icon: IconGrowth },
  { key: 'me', label: '我的', Icon: IconMe },
]
