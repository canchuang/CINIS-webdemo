import { assetUrl } from '../data/assets'
import styles from './GrowthPage.module.css'
import { useAppState } from '../data/appStore'
import { RULES, growth, type Mode } from '../domain/engine'
const SCENES: Record<Mode, string> = {
  traveler: assetUrl(`/assets/traveler-resting-scene.png`),
  knight: assetUrl(`/assets/growth-scene.png`),
  abyss: assetUrl(`/assets/character-abyss.png`),
}
export function GrowthPage({
  mode = 'traveler',
  onOpenCharacter,
  onOpenAchievements,
}: {
  mode?: Mode
  onOpenCharacter: () => void
  onOpenAchievements: () => void
}) {
  const state = useAppState(),
    g = growth(state),
    rounds = state.rounds.slice(-7),
    avg = rounds.length
      ? Math.round(
          (rounds.reduce((n, r) => n + r.rate, 0) / rounds.length) * 100,
        )
      : 0
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>成长</h1>
      <div className={styles.hero}>
        <img
          src={SCENES[mode]}
          alt={`${RULES[mode].label}成长场景`}
          className={styles.heroImg}
          width={342}
          height={150}
        />
      </div>
      <div className={styles.rankRow}>
        <span className={styles.rank}>
          当前身份 · {RULES[mode].label} · Lv.{g.level}
        </span>
        <button className={styles.link} onClick={onOpenCharacter}>
          角色档案 ›
        </button>
      </div>
      <p>
        {g.levelXp} / {g.xpMax} XP · 三种身份共享成长
      </p>
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>成就</h2>
          <button className={styles.link} onClick={onOpenAchievements}>
            查看成就墙 ›
          </button>
        </div>
        {g.titles.length ? (
          <p>{g.titles.join(' · ')}</p>
        ) : (
          <p>完成第一个任务，点亮「初燃者」。</p>
        )}
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>近七轮</h2>
        <p className={styles.avgRow}>
          <strong className={styles.avg}>{avg}</strong>
          <span className={styles.avgUnit}>% 平均完成率</span>
        </p>
        {rounds.length ? (
          <div
            className={styles.chart}
            role="img"
            aria-label={`最近 ${rounds.length} 轮平均完成率 ${avg}%`}
          >
            {rounds.map((r) => (
              <div key={r.id} className={styles.barCol}>
                <div
                  className={`${styles.bar} ${styles.barStrong}`}
                  style={{ height: Math.max(3, r.rate * 96) }}
                />
                <span className={styles.barLabel}>{r.end.slice(5)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>完成一轮后，这里会出现真实记录。</p>
        )}
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>累计</h2>
        <ul className={styles.rows}>
          {[
            ['完成任务', `${g.completed} 项`],
            ['永久经验', `${g.xp} XP`],
            ['成功轮次', `${g.passed} / ${state.rounds.length}`],
            ['已结算魂火', `${g.soul}`],
            ['有效专注', `${Math.floor(g.focusedMs / 60000)} 分钟`],
            ['活跃天数', `${g.activeDays} 天`],
          ].map(([k, v]) => (
            <li key={k} className={styles.row}>
              <span className={styles.rowLabel}>{k}</span>
              <span className={styles.rowValue}>{v}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
