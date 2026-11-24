import { useState } from 'react'
import styles from './CharacterFilePage.module.css'
import { PageHeader } from '../components/PageHeader'
import { useAppState } from '../data/appStore'
import { RULES, growth, type Mode } from '../domain/engine'
import { characterFileInfo } from '../data/content'

type Props = { mode?: Mode; onBack: () => void }

/** P37B 角色档案 */
export function CharacterFilePage({ mode = 'traveler', onBack }: Props) {
  const state = useAppState(),
    g = growth(state)
  const looks = characterFileInfo.looks
  const [look, setLook] = useState(
    ['traveler', 'knight', 'abyss'].indexOf(mode),
  )
  const names = ['初火', '行装', '誓约', '余烬', '长明']
  const stage =
    g.activeDays >= 60 && state.rounds.some((r) => r.rate === 1)
      ? 4
      : state.rounds.some((r) => r.mode === 'abyss')
        ? 3
        : g.passed >= 3
          ? 2
          : g.passed >= 1
            ? 1
            : 0
  const c = {
    ...characterFileInfo,
    heroSrc: looks[look].src,
    name: `${looks[look].name} · L${stage} ${names[stage]}`,
    rounds: `已完成 ${g.passed} 轮`,
    stages: names.map((name, i) => ({
      code: `L${i}`,
      name,
      done: i <= stage,
      current: i === stage,
    })),
    titleValue: g.titles.at(-1) ?? '尚未获得称号',
    titleCount: `${g.titles.length} 个`,
    looks,
  }

  return (
    <div className={`${styles.page} darkSystem`}>
      <PageHeader title="角色档案" onBack={onBack} backLabel="成长" size="lg" />

      <div className={styles.hero}>
        <img src={c.heroSrc} alt={`${RULES[mode].label}装扮预览`} />
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
            <span
              className={`${styles.stageName} ${s.current ? styles.stageCurrent : ''}`}
            >
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
