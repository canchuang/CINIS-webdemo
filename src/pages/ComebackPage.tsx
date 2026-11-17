import { useState } from 'react'
import styles from './ComebackPage.module.css'
import { comebackInfo } from '../data/content'

type Props = { onBack: () => void; onRestart: () => void }

/** P39 重燃与回归（深紫） */
export function ComebackPage({ onBack, onRestart }: Props) {
  const c = comebackInfo
  const [picked, setPicked] = useState(0)

  return (
    <div className={styles.screen}>
      <div className={styles.top}>
        <button type="button" className={styles.back} onClick={onBack} aria-label="返回">
          ‹ 今日
        </button>
      </div>

      <h1 className={styles.title}>{c.title}</h1>
      <p className={styles.sub}>{c.sub}</p>

      <div className={styles.flameWrap} aria-hidden="true">
        <span className={styles.glow} />
        <span className={styles.flame}>🔥</span>
      </div>

      <h3 className={styles.section}>还在的东西</h3>
      <ul className={styles.rows}>
        {c.kept.map((k) => (
          <li key={k.label} className={styles.row}>
            <span className={styles.rowLabel}>{k.label}</span>
            <span className={styles.rowValue}>{k.value}</span>
          </li>
        ))}
      </ul>

      <h3 className={styles.section}>{c.howTo}</h3>
      <ul className={styles.options}>
        {c.options.map((o, i) => {
          const active = i === picked
          return (
            <li key={o.title}>
              <button
                type="button"
                className={`${styles.option} ${active ? styles.optionActive : ''}`}
                onClick={() => setPicked(i)}
                aria-pressed={active}
              >
                <span className={styles.optTitle}>{o.title}</span>
                <span className={styles.optSub}>{o.sub}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <button type="button" className={styles.cta} onClick={onRestart}>
        {c.primary}
      </button>
      <p className={styles.foot}>{c.foot}</p>
    </div>
  )
}
