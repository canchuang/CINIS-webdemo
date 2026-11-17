import { useState } from 'react'
import styles from './RekindlePage.module.css'
import { PageHeader } from '../components/PageHeader'
import { rekindleInfo } from '../data/content'

type Props = { onBack: () => void; onChangeMode: () => void; onIgnite: () => void }

/** P17 后续（从一簇小火开始） */
export function RekindlePage({ onBack, onChangeMode, onIgnite }: Props) {
  const r = rekindleInfo
  const [picked, setPicked] = useState(r.options.findIndex((o) => o.selected))

  return (
    <div className={styles.page}>
      <PageHeader title={r.title} onBack={onBack} backLabel="今日" size="lg" />

      <ul className={styles.options}>
        {r.options.map((o, i) => {
          const active = i === picked
          return (
            <li key={o.title}>
              <button
                type="button"
                className={`${styles.option} ${active ? styles.optionActive : ''}`}
                onClick={() => setPicked(i)}
                aria-pressed={active}
              >
                <span className={`${styles.radio} ${active ? styles.radioOn : ''}`} aria-hidden="true" />
                <span className={styles.optText}>
                  <span className={styles.optTitle}>{o.title}</span>
                  <span className={styles.optSub}>{o.sub}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className={styles.actions}>
        <button type="button" className={styles.btnSecondary} onClick={onChangeMode}>
          {r.secondary}
        </button>
        <button type="button" className={styles.btnPrimary} onClick={onIgnite}>
          {r.primary}
        </button>
      </div>
    </div>
  )
}
