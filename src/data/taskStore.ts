/** Compatibility adapter for visual editors. Product pages use appStore directly. */
import { appStore } from './appStore'
let focusing: string | null = null
export const taskStore = {
  subscribe: appStore.subscribe,
  isDone: (_mode: string, id: string) => appStore.done(id),
  getFocusing: () =>
    focusing ?? appStore.getSnapshot().session?.task.id ?? null,
  setFocusing: (id: string | null) => {
    focusing = id
  },
  quickCheckin: (_mode: string, id: string) => appStore.check(id, 'quick'),
  markDone: (_mode: string, id: string) => appStore.check(id, 'check'),
}
