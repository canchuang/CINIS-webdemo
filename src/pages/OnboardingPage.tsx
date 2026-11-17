import styles from './OnboardingPage.module.css'
import { onboardingInfo } from '../data/content'

type Props = { onNext: () => void; onBack: () => void }

/** P02 首次引导：解释「两种成长」 */
export function OnboardingPage({ onNext, onBack }: Props) {
  const c = onboardingInfo.concept
  return (
    <div className={styles.screen}>
      <div className={styles.top}>
        <button type="button" className={styles.back} onClick={onBack} aria-label="返回">
          ‹
        </button>
        <span className={styles.brand}>{c.brand}</span>
        <span className={styles.spacer} />
      </div>

      <h1 className={styles.title}>
        {c.title[0]}
        <br />
        {c.title[1]}
      </h1>
      <p className={styles.sub}>{c.sub}</p>

      <div className={styles.blocks}>
        {c.blocks.map((b, i) => (
          <div key={b.title} className={`${styles.block} ${i === 1 ? styles.blockSoft : ''}`}>
            <h2 className={styles.blockTitle}>{b.title}</h2>
            <p className={styles.blockItems}>{b.items}</p>
            <p className={styles.blockNote}>{b.note}</p>
          </div>
        ))}
      </div>

      <button type="button" className={styles.cta} onClick={onNext}>
        {c.cta}
      </button>
    </div>
  )
}
