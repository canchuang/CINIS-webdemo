import { useState } from 'react'
import styles from './MePage.module.css'
import { me } from '../data/content'

export function MePage({ onNavigate }: { onNavigate: (route: string) => void }) {
  const [incentive, setIncentive] = useState(true)
  const ratio = me.xp / me.xpMax

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>我的</h1>

      <div className={styles.profile}>
        <div className={styles.avatar} aria-hidden="true">
          {me.avatar}
        </div>
        <div className={styles.profileText}>
          <p className={styles.name}>{me.name}</p>
          <p className={styles.meta}>
            {me.title} · {me.level} · {me.xp} / {me.xpMax} XP
          </p>
        </div>
      </div>

      <div className={styles.xpTrack} aria-hidden="true">
        <div className={styles.xpFill} style={{ width: `${ratio * 100}%` }} />
      </div>
      <p className={styles.xpHint}>
        距 {me.nextTier} 还差 {me.toNextTier} XP
      </p>

      {me.groups.map((group) => (
        <section key={group.label} className={styles.group}>
          <h2 className={styles.groupTitle}>{group.label}</h2>
          <ul className={styles.rows}>
            {group.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.row}
                  onClick={() => onNavigate(item.to)}
                >
                  <span className={styles.rowText}>
                    <span className={styles.rowTitle}>{item.title}</span>
                    <span className={styles.rowDesc}>{item.desc}</span>
                  </span>
                  <span className={styles.chevron} aria-hidden="true">
                    ›
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className={styles.group}>
        <div className={styles.switchRow}>
          <span className={styles.rowText}>
            <span className={styles.rowTitle}>激励反馈</span>
            <span className={styles.rowDesc}>关闭后只记录，不弹任何仪式</span>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={incentive}
            aria-label="激励反馈"
            className={`${styles.switch} ${incentive ? styles.switchOn : ''}`}
            onClick={() => setIncentive((v) => !v)}
          >
            <span className={styles.knob} />
          </button>
        </div>
      </section>

      <div className={styles.footer}>
        <span>关于我们 · 版本 1.0</span>
        <span className={styles.chevron} aria-hidden="true">
          ›
        </span>
      </div>
    </div>
  )
}
