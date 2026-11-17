import { useEffect, useReducer, useState } from 'react'
import styles from './TodayPage.module.css'
import { modeTasks, modeChallenges, type GameMode } from '../data/content'
import { modeThemes } from '../styles/tokens'
import { TiltCard } from './TiltCard'
import { taskStore } from '../data/taskStore'
import { CheckinToast } from '../components/CheckinToast'

type Props = {
  mode?: GameMode
  onStartTask: (taskId: string) => void
  onSwitchMode?: () => void
}

export function TodayPage({ mode = 'traveler', onStartTask, onSwitchMode }: Props) {
  const challenge = modeChallenges[mode]
  const [tasks, setTasks] = useState(() => modeTasks[mode].map((t) => ({ ...t })))
  const theme = modeThemes[mode]
  // 订阅跨页任务状态：专注结算后会触发重渲染
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0)
  // 打卡成功弹窗
  const [toast, setToast] = useState<{ title: string; duration: string; xp: number; soul: number } | null>(
    null,
  )

  useEffect(() => {
    const unsub = taskStore.subscribe(() => {
      // 快速打卡产生的结果 -> 弹窗
      const ci = taskStore.takeCheckin()
      if (ci && ci.mode === mode) {
        const t = modeTasks[mode].find((x) => x.id === ci.id)
        if (t) setToast({ title: t.title, duration: t.duration, xp: t.xp, soul: t.soul })
      }
      forceUpdate()
    })
    return unsub
  }, [mode])

  // 切换模式时重置任务列表，否则会沿用上一个模式的任务
  useEffect(() => {
    setTasks(modeTasks[mode].map((t) => ({ ...t })))
  }, [mode])

  // 合并 store 里记录的完成态（来自专注结算）
  const merged = tasks.map((t) => ({
    ...t,
    done: t.done || taskStore.isDone(mode, t.id),
  }))

  const doneCount = merged.filter((t) => t.done).length
  const remaining = merged.length - doneCount
  // 魂火：基础值 + 已完成任务累计的魂火，封顶 soulMax
  const gained = merged.filter((t) => t.done).reduce((sum, t) => sum + t.soul, 0)
  const soulNow = Math.min(challenge.soulMax, challenge.soul + gained)
  const soulRatio = soulNow / challenge.soulMax

  const toggle = (task: { id: string; title: string; duration: string; xp: number; soul: number; done: boolean }) => {
    if (taskStore.isDone(mode, task.id)) return // 专注完成的不可反勾
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)))
    // 勾选（而非取消）时弹出打卡成功
    if (!task.done) {
      setToast({ title: task.title, duration: task.duration, xp: task.xp, soul: task.soul })
    }
  }

  const cardStyle = {
    '--card-bg': theme.card,
    '--card-text': theme.text,
    '--card-text2': theme.text2,
    '--card-accent': theme.accent,
    '--card-line': theme.line,
    '--card-glow': theme.glow,
  } as React.CSSProperties

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>3 月 12 日 · 周三</h1>
          <p className={styles.level}>
            <strong>Lv.08</strong>
            <span className={styles.xp}>680 / 800 XP · 微光段位</span>
          </p>
        </div>
        <button type="button" className={styles.switchBtn} onClick={onSwitchMode}>
          ⇄ 换模式
        </button>
      </header>

      <div className={styles.xpTrack} aria-hidden="true">
        <div className={styles.xpFill} style={{ width: '85%' }} />
      </div>

      <TiltCard className={styles.card} style={cardStyle}>
        <div className={styles.cardTop}>
          <span className={styles.cardStage}>
            {challenge.label} · {challenge.stage}
          </span>
          <span className={styles.cardDay}>{challenge.day}</span>
        </div>
        <h2 className={styles.cardQuote}>{challenge.quote}</h2>

        <div className={styles.soulRow}>
          <span className={styles.soulLabel}>魂火</span>
          <span className={styles.soulValue}>
            {soulNow}
            <em>/ {challenge.soulMax}</em>
          </span>
          <span className={styles.threshold}>{challenge.gate}</span>
        </div>

        <div className={styles.soulTrack} aria-hidden="true">
          <div className={styles.soulFill} style={{ width: `${soulRatio * 100}%` }} />
        </div>

        <div className={styles.cardFoot}>
          <span>
            今日 {doneCount} / {merged.length}
          </span>
          <span>{challenge.day}</span>
        </div>

        <div className={styles.character}>
          <div className={styles.charGlow} aria-hidden="true" />
          <img
            className={styles.charImg}
            src={challenge.character}
            alt={`${challenge.label}角色`}
          />
          {/* 眨眼：一块与背景同色的盖片，周期性压下模拟眼皮 */}
          <span className={styles.blink} aria-hidden="true" />
        </div>
      </TiltCard>

      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>今日任务</h2>
        <span className={styles.sectionMeta}>
          已完成 {doneCount} 项 · 还剩 {remaining} 项
        </span>
      </div>

      <ul className={styles.tasks}>
        {merged.map((task) => (
          <li key={task.id} className={`${styles.task} ${task.done ? styles.taskDone : ''}`}>
            <button
              type="button"
              className={styles.check}
              onClick={() => toggle(task)}
              aria-pressed={task.done}
              aria-label={`${task.done ? '取消完成' : '完成'}：${task.title}`}
              style={task.done ? { background: theme.accent, borderColor: 'transparent' } : undefined}
            >
              {task.done && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 7.4 5.5 10.4 11.5 3.9"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <div className={styles.taskBody}>
              <p className={styles.taskTitle}>{task.title}</p>
              <p className={styles.taskMeta}>
                {task.duration} · +{task.xp} XP · +{task.soul} 魂火
              </p>
            </div>
            {!task.done && (
              <button type="button" className={styles.startBtn} onClick={() => onStartTask(task.id)}>
                开始
              </button>
            )}
          </li>
        ))}
      </ul>

      {toast && (
        <CheckinToast
          mode={mode}
          taskTitle={toast.title}
          duration={toast.duration}
          xp={toast.xp}
          soul={toast.soul}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}



