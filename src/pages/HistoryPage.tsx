import { useState } from 'react'
import styles from './HistoryPage.module.css'
import { PageHeader } from '../components/PageHeader'
import { historyInfo } from '../data/content'

type Props = { onBack: () => void }

/** P38 历史记录 */
export function HistoryPage({ onBack }: Props) {
  const h = historyInfo
  const [filter, setFilter] = useState(0)

  const visible = h.rows.filter((r) => {
    if (filter === 0) return true
    if (filter === 1) return r.tone === 'pos'
    if (filter === 2) return r.tone === 'neg'
    return r.sub.includes('恢复')
  })

  return (
    <div className={`${styles.page} darkSystem`}>
      <PageHeader
        title="历史记录"
        onBack={onBack}
        size="lg"
        right={<span className={styles.rounds}><strong>{h.totalRounds}</strong> 轮</span>}
      />
      <p className={styles.summary}>{h.summary}</p>

      <div className={styles.filters} role="tablist">
        {h.filters.map((f, i) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === i}
            className={`${styles.filter} ${filter === i ? styles.filterOn : ''}`}
            onClick={() => setFilter(i)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.colHead}>
        <span>轮次</span>
        <span>完成</span>
        <span>魂火</span>
      </div>

      <ul className={styles.list}>
        {visible.map((r) => (
          <li key={r.date} className={styles.item}>
            <div className={styles.itemHead}>
              <span className={styles.date}>{r.date}</span>
              <span className={`${styles.soul} ${r.tone === 'neg' ? styles.soulNeg : ''}`}>{r.soul}</span>
            </div>
            <div className={styles.itemBody}>
              <div className={styles.itemLeft}>
                <span className={styles.itemName}>{r.name}</span>
                <span className={styles.itemSub}>{r.sub}</span>
              </div>
              <div className={styles.barWrap}>
                <div className={styles.barCol}>
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.barFill} ${r.tone === 'neg' ? styles.barNeg : ''}`}
                      style={{ width: `${(r.done / r.total) * 100}%` }}
                    />
                  </div>
                  <span className={styles.barText}>
                    {r.done}/{r.total}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
        {visible.length === 0 && <li className={styles.empty}>这个分类下暂无记录</li>}
      </ul>

      <div className={styles.totals}>
        {h.totals.map((t) => (
          <div key={t.label} className={styles.total}>
            <span className={styles.totalLabel}>{t.label}</span>
            <span className={styles.totalValue}>{t.value}</span>
          </div>
        ))}
      </div>

      <p className={styles.foot}>{h.foot}</p>
    </div>
  )
}

