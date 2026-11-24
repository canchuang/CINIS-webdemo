import { useEffect, useState } from 'react'
import styles from './FocusPage.module.css'
import { modeChallenges, type GameMode } from '../data/content'
import { modeThemes } from '../styles/tokens'
import { appStore, useAppState } from '../data/appStore'
import { RULES } from '../domain/engine'

type Props = {
  mode?: GameMode
  onFinish: () => void
  onGiveUp: () => void
  onBack: () => void
}
export function FocusPage({
  mode = 'traveler',
  onFinish,
  onGiveUp,
  onBack,
}: Props) {
  const state = useAppState(),
    q = state.session
  const [now, setNow] = useState(Date.now()),
    [message, setMessage] = useState('')
  useEffect(() => {
    const t = window.setInterval(() => {
      appStore.reconcile()
      setNow(Date.now())
    }, 250)
    return () => window.clearInterval(t)
  }, [])
  if (!q)
    return (
      <div className={styles.screen}>
        <h1 className={styles.task}>没有正在进行的专注</h1>
        <button onClick={onBack}>返回今日任务</button>
      </div>
    )
  const activeMode = q.task.mode ?? mode,
    theme = modeThemes[activeMode],
    challenge = modeChallenges[activeMode],
    rules = RULES[activeMode]
  const paused = q.status === 'paused',
    due = q.status === 'due',
    failed = ['interrupted', 'abandoned'].includes(q.status)
  const left =
    due || failed ? 0 : paused ? q.remainingMs : Math.max(0, q.deadlineAt - now)
  const sec = Math.ceil(left / 1000),
    mm = String(Math.floor(sec / 60)).padStart(2, '0'),
    ss = String(sec % 60).padStart(2, '0')
  const act = (fn: () => void) => {
    try {
      fn()
      setMessage('')
    } catch (e) {
      setMessage((e as Error).message)
    }
  }
  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button
          className={styles.back}
          onClick={onBack}
          aria-label="返回今日页，保留专注"
        >
          ‹
        </button>
        <span className={styles.status} style={{ color: theme.accent }}>
          {challenge.label} ·{' '}
          {due ? '待结算' : failed ? '已中断' : paused ? '休息中' : '专注中'}
        </span>
      </div>
      <div className={styles.progress}>
        <div
          className={styles.progressFill}
          style={{
            width: `${Math.min(100, (1 - left / (q.task.durationMin * 60_000)) * 100)}%`,
            background: theme.accent,
          }}
        />
      </div>
      <h1 className={styles.task}>{q.task.title}</h1>
      <p className={styles.state}>{rules.focusRule}</p>
      <div
        className={`${styles.character} ${paused ? styles.relax : styles.alert}`}
      >
        <span className={styles.aura} />
        <img
          className={styles.figure}
          src={paused ? challenge.restCharacter : challenge.character}
          alt={`${challenge.label}${paused ? '休息' : '专注'}`}
        />
      </div>
      <div className={styles.clock} role="timer">
        <span className={styles.time}>
          {mm}:{ss}
        </span>
      </div>
      <p className={styles.state} role="status">
        {message ||
          (failed
            ? q.reason
            : due
              ? '时间已到，确认后记录一次完成'
              : `计划 ${q.task.durationMin} 分钟 · 已暂停 ${q.pauses} 次`)}
      </p>
      {rules.pauses > 0 && !due && !failed && (
        <button
          className={styles.pause}
          disabled={!paused && q.pauses >= rules.pauses}
          onClick={() => act(paused ? appStore.resume : appStore.pause)}
        >
          {paused ? '继续' : '暂停'}
        </button>
      )}
      <div className={styles.bottom}>
        <button
          className={styles.finish}
          style={{ background: theme.accent }}
          disabled={!due}
          onClick={onFinish}
        >
          {due
            ? '确认完成'
            : failed
              ? '本次未完成，不发放奖励'
              : '计时完成后结算'}
        </button>
        <button
          className={styles.giveUp}
          onClick={() => {
            if (
              failed ||
              window.confirm('退出本次专注？已完成的记录与永久经验会保留。')
            )
              onGiveUp()
          }}
        >
          退出专注
        </button>
      </div>
    </div>
  )
}
