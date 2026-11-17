/**
 * 极简跨页任务状态（无第三方依赖）。
 * 专注计时「结束并结算」后，把对应任务标记为已完成，
 * 今日页读取时即显示完成态。
 */
type Listener = () => void

type State = {
  /** 已完成任务 id 集合（按模式区分） */
  done: Record<string, Set<string>>
  /** 当前正在专注的任务 id */
  focusingTaskId: string | null
  /** 最近一次打卡结果（用于今日页弹窗） */
  lastCheckin: { mode: string; id: string } | null
}

const state: State = {
  done: {},
  focusingTaskId: null,
  lastCheckin: null,
}

const listeners = new Set<Listener>()

function emit() {
  listeners.forEach((l) => l())
}

export const taskStore = {
  subscribe(l: Listener) {
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  },
  isDone(mode: string, id: string) {
    return state.done[mode]?.has(id) ?? false
  },
  markDone(mode: string, id: string) {
    if (!state.done[mode]) state.done[mode] = new Set()
    state.done[mode].add(id)
    emit()
  },
  /** 快速打卡：标记完成并记录一次打卡结果，今日页会据此弹窗 */
  quickCheckin(mode: string, id: string) {
    if (!state.done[mode]) state.done[mode] = new Set()
    state.done[mode].add(id)
    state.lastCheckin = { mode, id }
    emit()
  },
  takeCheckin() {
    const v = state.lastCheckin
    state.lastCheckin = null
    return v
  },
  markAllDone(mode: string, ids: string[]) {
    if (!state.done[mode]) state.done[mode] = new Set()
    ids.forEach((id) => state.done[mode].add(id))
    emit()
  },
  setFocusing(id: string | null) {
    state.focusingTaskId = id
  },
  getFocusing() {
    return state.focusingTaskId
  },
}
