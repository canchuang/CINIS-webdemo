import { useState } from 'react'
import styles from './GoalsPage.module.css'
import { useAppState } from '../data/appStore'
import { RULES, isDone } from '../domain/engine'

const FILTERS = ['全部', '进行中', '待开始', '已记录'] as const
type Filter = (typeof FILTERS)[number]

export function GoalsPage({
  onOpen,
  onNew,
}: {
  onOpen: (id: string) => void
  onNew: () => void
}) {
  const state = useAppState()
  const allGoals = state.goals
    .filter((g) => !g.deletedAt)
    .map((g) => {
      const tasks = Object.values(state.plans)
        .flat()
        .filter((t) => t.goalId === g.id)
      const rate = tasks.length
        ? tasks.filter((t) => isDone(state, t.id)).length / tasks.length
        : 0
      return {
        ...g,
        progress: rate,
        weekly: g.scheduledDays.filter(Boolean).length,
        daily: g.dailyTasks,
      }
    })
  const [filter, setFilter] = useState<Filter>('全部')

  const visible = allGoals.filter((g) => {
    if (filter === '全部') return true
    if (filter === '已记录') return g.status === '已记录'
    return g.status === filter
  })

  const activeCount = allGoals.filter((g) => g.status === '进行中').length

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>目标</h1>

      <p className={styles.summary}>
        <strong>{activeCount}</strong>
        <span>个进行中 · 共 {allGoals.length} 个</span>
      </p>

      <div className={styles.filters} role="tablist" aria-label="目标筛选">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className={`${styles.filter} ${filter === f ? styles.filterActive : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {visible.map((g) => (
          <li
            key={g.id}
            className={`${styles.item} ${g.status === '待开始' ? styles.pending : ''}`}
          >
            <button
              type="button"
              className={styles.itemBtn}
              onClick={() => onOpen(g.id)}
            >
              <div className={styles.itemTop}>
                <h2 className={styles.itemTitle}>{g.title}</h2>
                <span className={styles.itemValue}>
                  {g.status === '待开始'
                    ? '待开始'
                    : `${Math.round(g.progress * 100)}%`}
                </span>
              </div>
              <p className={styles.itemMeta}>
                {RULES[g.mode].label} · 每周 {g.weekly} 天 · 每天 {g.daily} 项
              </p>
              <div className={styles.track} aria-hidden="true">
                <div
                  className={styles.fill}
                  style={{ width: `${g.progress * 100}%` }}
                />
              </div>
            </button>
          </li>
        ))}
        {visible.length === 0 && (
          <li className={styles.empty}>这个分类下还没有目标</li>
        )}
      </ul>

      <button type="button" className={styles.addBtn} onClick={onNew}>
        ＋ 新建目标
      </button>
    </div>
  )
}
