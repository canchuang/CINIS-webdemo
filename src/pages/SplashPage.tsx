import styles from './SplashPage.module.css'
import { onboardingInfo } from '../data/content'

type Props = { onStart: () => void }

/** P01 启动页：深色、大字品牌 */
export function SplashPage({ onStart }: Props) {
  const s = onboardingInfo.splash
  return (
    <button type="button" className={styles.screen} onClick={onStart} aria-label="进入 CINIS">
      <span className={styles.watermark} aria-hidden="true">
        燃
      </span>
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.ember} aria-hidden="true">
        🔥
      </span>

      <p className={styles.eyebrow}>{s.eyebrow}</p>
      <h1 className={styles.brand}>{s.brand}</h1>

      <div className={styles.foot}>
        <span className={styles.tagline}>{s.tagline}</span>
        <span className={styles.version}>{s.version}</span>
      </div>
    </button>
  )
}
