import { useEffect, useRef, useState } from 'react'
import styles from './FocusPage.module.css'
import { focusState, modeChallenges, type GameMode } from '../data/content'
import { modeThemes } from '../styles/tokens'

type Props = { mode?: GameMode; onFinish: () => void; onGiveUp: () => void; onBack: () => void }

/** P13 / P20 / P27 专注计时：真实倒计时 */
export function FocusPage({ mode = 'traveler', onFinish, onGiveUp, onBack }: Props) {
  const total = 25 * 60
  const [left, setLeft] = useState(12 * 60 + 48)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | null>(null)
  const challenge = modeChallenges[mode]
  const theme = modeThemes[mode]

  useEffect(() => {
    if (paused) return
    timer.current = window.setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          window.clearInterval(timer.current!)
          return 0
        }
        return v - 1
      })
    }, 1000)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [paused])

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  const ratio = 1 - left / total

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button type="button" className={styles.back} onClick={onBack} aria-label="返回">
          ‹
        </button>
        <span className={styles.status} style={{ color: theme.accent }}>
          <span className={styles.statusDot} style={{ background: theme.accent }} aria-hidden="true" />
          {challenge.label} · 专注中
        </span>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <div
          className={styles.progressFill}
          style={{ width: `${ratio * 100}%`, background: theme.accent }}
        />
      </div>

      <h1 className={styles.task}>{mode === 'abyss' ? '整理错题本' : focusState.taskTitle}</h1>

      <div className={`${styles.character} ${paused ? styles.relax : styles.alert}`}>
        <span className={styles.aura} aria-hidden="true" />
        <img
          className={`${styles.figure} ${styles.figureBattle} ${paused ? styles.hide : ''}`}
          src={challenge.character}
          alt={`${challenge.label}战斗`}
        />
        <img
          className={`${styles.figure} ${styles.figureRest} ${paused ? '' : styles.hide}`}
          src={challenge.restCharacter}
          alt={`${challenge.label}休息`}
        />
        <span className={styles.mood}>{paused ? 'z z Z' : '·  ·'}</span>
      </div>

      <p className={styles.state} style={{ color: theme.accent }}>
        {paused ? '休息中 · 角色在调整呼吸' : '探索战斗 · 角色在守护这一轮'}
      </p>

      <div className={styles.clock} role="timer" aria-live="off">
        <span className={styles.time}>
          {mm}:{ss}
        </span>
      </div>

      <button type="button" className={styles.pause} onClick={() => setPaused((p) => !p)}>
        {paused ? '继续' : '暂停'}
      </button>

      <div className={styles.bottom}>
        <button
          type="button"
          className={styles.finish}
          style={{ background: theme.accent }}
          onClick={onFinish}
        >
          结束并结算
        </button>
        <button type="button" className={styles.giveUp} onClick={onGiveUp}>
          退出专注
        </button>
      </div>
    </div>
  )
}
