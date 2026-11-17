import styles from './GrowthPage.module.css'
import { growthStats } from '../data/content'

const DAYS = ['一', '二', '三', '四', '五', '六', '日']

type Props = { onOpenCharacter: () => void; onOpenAchievements: () => void }

export function GrowthPage({ onOpenCharacter, onOpenAchievements }: Props) {
  const g = growthStats
  const max = Math.max(...g.weekly)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>成长</h1>

      <div className={styles.hero}>
        <img
          src="/assets/growth-scene.png"
          alt="骑士与训练场"
          className={styles.heroImg}
          width={342}
          height={150}
        />
      </div>

      <div className={styles.rankRow}>
        <span className={styles.rank}>{g.character}</span>
        <button type="button" className={styles.link} onClick={onOpenCharacter}>
          角色档案 ›
        </button>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>成就</h2>
          <button type="button" className={styles.link} onClick={onOpenAchievements}>
            查看成就墙 ›
          </button>
        </div>
        <ul className={styles.badges}>
          {['/assets/badge-1.png', '/assets/badge-2.png', '/assets/badge-3.png'].map((src, i) => (
            <li key={src} className={styles.badge}>
              <img src={src} alt={`已获成就 ${i + 1}`} width={56} height={56} draggable={false} />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>近七轮</h2>
        <p className={styles.avgRow}>
          <strong className={styles.avg}>{g.avg}</strong>
          <span className={styles.avgUnit}>% 平均完成率</span>
          <span className={styles.delta}>较上七轮 {g.delta}</span>
        </p>

        <div className={styles.chart} role="img" aria-label={`近七轮平均完成率 ${g.avg}%`}>
          {g.weekly.map((v, i) => {
            const h = Math.max(8, Math.round((v / max) * 96))
            const highlight = v >= 0.7
            return (
              <div key={DAYS[i]} className={styles.barCol}>
                <div
                  className={`${styles.bar} ${highlight ? styles.barStrong : ''}`}
                  style={{ height: h }}
                />
                <span className={styles.barLabel}>{DAYS[i]}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>累计</h2>
        <ul className={styles.rows}>
          {g.totals.map((r) => (
            <li key={r.label} className={styles.row}>
              <span className={styles.rowLabel}>{r.label}</span>
              <span className={styles.rowValue}>{r.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>本周</h2>
        <ul className={styles.rows}>
          {g.week.map((r) => (
            <li key={r.label} className={styles.row}>
              <span className={styles.rowLabel}>{r.label}</span>
              <span className={styles.rowValue}>{r.value}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
