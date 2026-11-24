/** 每个角色形象的显示大小（百分比），由「角色大小编辑器」#charSizeEditor 调节 */
import type { GameMode } from './content'

export type CharSizeConfig = Record<GameMode, number>

export const defaultCharSize: CharSizeConfig = {
  traveler: 100,
  knight: 100,
  abyss: 100,
}

const KEY = 'cinis:char-size-config:v1'

export function loadCharSize(): CharSizeConfig {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...defaultCharSize }
    return { ...defaultCharSize, ...JSON.parse(raw) }
  } catch {
    return { ...defaultCharSize }
  }
}

export function saveCharSize(cfg: CharSizeConfig) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cfg))
  } catch {
    /* ignore */
  }
}

export const CHAR_SIZE_STORAGE_KEY = KEY
