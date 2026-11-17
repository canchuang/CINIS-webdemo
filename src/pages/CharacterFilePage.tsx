import { useState } from 'react'
import styles from './CharacterFilePage.module.css'
import { PageHeader } from '../components/PageHeader'
import { characterFileInfo } from '../data/content'

type Props = { onBack: () => void }

/** P37B 角色档案 */
export function CharacterFilePage({ onBack }: Props) {
  const c = characterFileInfo
  const [look, setLook] = useState(c.looks.findIndex((l) => l.active))

  return (
    <div className={`${styles.page} darkSystem`}>
      <PageHeader title="角色档案" onBack={onBack} backLabel="成长" size="lg" />

      <div className={styles.hero}>
        <img src={c.heroSrc} alt="骑士立绘" />
      </div>

      <div className={styles.nameRow}>
        <h2 className={styles.name}>{c.name}</h2>
        <span className={styles.rounds}>{c.rounds}</span>
      </div>

      <h3 className={styles.section}>成长阶段</h3>
      <div className={styles.track}>
        {c.stages.map((s) => (
          <div key={s.code} className={styles.stage}>
            <span
              className={`${styles.node} ${s.done ? styles.nodeDone : ''} ${s.current ? styles.nodeCurrent : ''}`}
              aria-hidden="true"
            />
            <span className={`${styles.stageName} ${s.current ? styles.stageCurrent : ''}`}>
              {s.code} {s.name}
            </span>
          </div>
        ))}
      </div>

      <h3 className={styles.section}>三套装扮</h3>
      <div className={styles.looks}>
        {c.looks.map((l, i) => (
          <button
            key={l.name}
            type="button"
            className={`${styles.look} ${i === look ? styles.lookActive : ''}`}
            onClick={() => setLook(i)}
            aria-pressed={i === look}
          >
            <img src={l.src} alt="" />
            <span>{l.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.titleRow}>
        <span className={styles.titleLabel}>{c.titleLabel}</span>
        <span className={styles.titleValue}>{c.titleValue}</span>
        <span className={styles.titleCount}>
          {c.titleCount}
          <span aria-hidden="true"> ›</span>
        </span>
      </div>
    </div>
  )
}

