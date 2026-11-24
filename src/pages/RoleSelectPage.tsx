import { assetUrl } from '../data/assets'
import { useEffect, useState } from 'react'
import styles from './RoleSelectPage.module.css'
import { onboardingInfo } from '../data/content'
import type { GameMode } from '../data/content'
import {
  defaultCharSize,
  loadCharSize,
  type CharSizeConfig,
} from '../data/charSize'

const CARD_MODES: GameMode[] = ['traveler', 'knight', 'abyss']

type Props = { onConfirm: (mode: GameMode) => void }

/** P01b 角色选择：三卡单选，深色 */
export function RoleSelectPage({ onConfirm }: Props) {
  const r = onboardingInfo.roles
  const [picked, setPicked] = useState(2) // 默认深渊，与稿一致
  const [charSize, setCharSize] = useState<CharSizeConfig>(defaultCharSize)
  useEffect(() => {
    setCharSize(loadCharSize())
  }, [])

  const current = r.cards[picked]

  return (
    <div className={styles.screen}>
      <header className={styles.top}>
        <span className={styles.brand}>{r.brand}</span>
        <span className={styles.chapter}>{r.chapter}</span>
      </header>

      <h1 className={styles.title}>{r.title}</h1>
      <p className={styles.sub}>{r.sub}</p>

      <div className={styles.cards}>
        {r.cards.map((card, i) => {
          const active = i === picked
          return (
            <button
              key={card.name}
              type="button"
              className={`${styles.card} ${active ? styles.cardActive : ''}`}
              onClick={() => setPicked(i)}
              aria-pressed={active}
            >
              <span className={styles.numeral}>{card.numeral}</span>
              <span className={styles.figure} aria-hidden="true">
                <img
                  src={
                    [
                      assetUrl(`/assets/character-traveler.png`),
                      assetUrl(`/assets/character-knight.png`),
                      assetUrl(`/assets/character-abyss.png`),
                    ][i]
                  }
                  alt=""
                  style={{
                    transform: `scale(${CARD_MODES[i] ? charSize[CARD_MODES[i]] / 100 : 1})`,
                  }}
                />
              </span>
              <span className={styles.cardName}>{card.name}</span>
              <span className={styles.cardEn}>{card.en}</span>
              <span className={styles.cardTag}>{card.tag}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.quote}>
        <div className={styles.quoteHead}>
          <span className={styles.quoteName}>{current.name}</span>
          <span className={styles.selected}>已选择</span>
        </div>
        <p className={styles.quoteText}>{current.quote}</p>
      </div>

      <button
        type="button"
        className={styles.cta}
        onClick={() => onConfirm(CARD_MODES[picked])}
      >
        {r.cta}
      </button>
      <p className={styles.footer}>{r.footer}</p>
    </div>
  )
}
