import { useState } from 'react'
import styles from './AchievementsPage.module.css'
import { achievementsInfo } from '../data/content'

type Props = { onBack: () => void }

/** P36 成就墙（深色殿堂） */
export function AchievementsPage({ onBack }: Props) {
  const a = achievementsInfo
  const [tab, setTab] = useState(0)

  return (
    <div className={styles.screen}>
      <div className={styles.top}>
        <button type="button" className={styles.back} onClick={onBack} aria-label="返回">
          ‹
        </button>
      </div>

      <h1 className={styles.title}>成就墙</h1>

      <button type="button" className={styles.total}>
        已获得 {a.total} 枚 ›
      </button>

      <div className={styles.spotlight}>
        <div className={styles.spotRow}>
          {a.badges.slice(0, 3).map((b, i) => (
            <div key={b.name} className={`${styles.spotItem} ${i === 1 ? styles.spotActive : ''}`}>
              <img src={b.src} alt={b.name} />
            </div>
          ))}
        </div>
        <p className={styles.spotName}>{a.spotlight.name}</p>
      </div>

      <ul className={styles.titles}>
        {a.titles.map((t) => (
          <li key={t.name} className={`${styles.titleItem} ${styles[t.tone]}`}>
            {t.name}
          </li>
        ))}
        <li className={styles.titleArrow} aria-hidden="true">
          ›
        </li>
      </ul>

      <div className={styles.tabs} role="tablist">
        {a.tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === i}
            className={`${styles.tab} ${tab === i ? styles.tabOn : ''}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={styles.secHead}>
        <span className={styles.secLabel}>{a.sectionLabel}</span>
        <span className={styles.secMeta}>{a.sectionMeta}</span>
      </div>

      <ul className={styles.grid}>
        {a.badges.map((b) => (
          <li key={b.name} className={styles.cell}>
            <div className={styles.cellBadge}>
              <img src={b.src} alt="" />
            </div>
            <span className={styles.cellName}>{b.name}</span>
          </li>
        ))}
      </ul>

      <p className={styles.foot}>{a.foot}</p>
    </div>
  )
}
