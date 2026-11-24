import { useEffect, useState } from 'react'
import styles from './TodayPage.module.css'
import { modeChallenges, type GameMode } from '../data/content'
import { modeThemes } from '../styles/tokens'
import { HologramCard } from '../components/HologramCard'
import {
  defaultCharSize,
  loadCharSize,
  type CharSizeConfig,
} from '../data/charSize'
import { appStore, useAppState } from '../data/appStore'
import {
  growth,
  localDay,
  isDone,
  roundStats,
  shiftDay,
  RULES,
  type Task,
} from '../domain/engine'
import { CheckinToast } from '../components/CheckinToast'

type Props = {
  mode?: GameMode
  onStartTask: (taskId: string) => void
  onSwitchMode?: () => void
}

export function TodayPage({
  mode = 'traveler',
  onStartTask,
  onSwitchMode,
}: Props) {
  const state = useAppState(),
    stats = growth(state),
    challenge = modeChallenges[mode]
  const theme = modeThemes[mode]
  const [toast, setToast] = useState<{
    title: string
    duration: string
    xp: number
    soul: number
  } | null>(null)
  const [charSize, setCharSize] = useState<CharSizeConfig>(defaultCharSize)
  useEffect(() => {
    const load = () => setCharSize(loadCharSize())
    load()
    window.addEventListener('focus', load)
    window.addEventListener('storage', load)
    return () => {
      window.removeEventListener('focus', load)
      window.removeEventListener('storage', load)
    }
  }, [])
  const tasks = appStore.tasks(mode)
  const merged = tasks.map((t) => ({
    ...t,
    duration: `${t.durationMin} 分钟`,
    done: isDone(state, t.id),
  }))
  const doneCount = merged.filter((t) => t.done).length,
    remaining = merged.length - doneCount
  const start = state.stages[mode] ?? localDay(),
    end = shiftDay(start, RULES[mode].days - 1)
  const progress = roundStats(state, mode, start, end)
  const soulNow = progress.earnedSoul,
    soulMax = Math.max(1, progress.total * 10),
    soulRatio = soulNow / soulMax
  const toggle = (task: Task) => {
    if (isDone(state, task.id)) return
    if (appStore.check(task.id, 'check'))
      setToast({
        title: task.title,
        duration: '快速记录 · 不计专注时长',
        xp: task.xp,
        soul: task.soul,
      })
  }
  const cardStyle = {
    '--card-bg': theme.card,
    '--card-text': theme.text,
    '--card-text2': theme.text2,
    '--card-accent': theme.accent,
    '--card-line': theme.line,
    '--card-glow': theme.glow,
  } as React.CSSProperties

  // 各模式强调色（旅者绿 / 骑士蓝 / 深渊紫）
  const accent =
    mode === 'traveler' ? '#2E7D5B' : mode === 'abyss' ? '#7C3AED' : '#3B6FF5'
  // 勾选成功图标：随模式色系（旅者绿 / 骑士金 / 深渊紫）
  const checkColor =
    mode === 'traveler' ? '#2E9E82' : mode === 'knight' ? '#E0B45C' : '#7C3AED'

  return (
    <div
      className={styles.page}
      style={{ ['--today-accent' as string]: accent }}
    >
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {new Intl.DateTimeFormat('zh-CN', {
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            }).format(new Date())}
          </h1>
          <p className={styles.level}>
            <strong>Lv.{stats.level}</strong>
            <span className={styles.xp}>
              {stats.levelXp} / {stats.xpMax} XP · 持续成长
            </span>
          </p>
        </div>
        <button
          type="button"
          className={styles.switchBtn}
          onClick={onSwitchMode}
        >
          ⇄ 换模式
        </button>
      </header>

      <div className={styles.xpTrack} aria-hidden="true">
        <div
          className={styles.xpFill}
          style={{ width: `${(stats.levelXp / stats.xpMax) * 100}%` }}
        />
      </div>

      <HologramCard className={styles.card} style={cardStyle}>
        <div className={styles.cardTop}>
          <span className={styles.cardStage}>{challenge.label} · 本轮挑战</span>
          <span className={styles.cardDay}>{localDay()}</span>
        </div>
        <h2 className={styles.cardQuote}>{challenge.quote}</h2>

        <div className={styles.soulRow}>
          <span className={styles.soulLabel}>魂火</span>
          <span className={styles.soulValue}>
            {soulNow}
            <em>/ {progress.total * 10}</em>
          </span>
          <span className={styles.threshold}>{challenge.gate}</span>
        </div>

        <div className={styles.soulTrack} aria-hidden="true">
          <div
            className={styles.soulFill}
            style={{ width: `${soulRatio * 100}%` }}
          />
        </div>

        <div className={styles.cardFoot}>
          <span>
            今日 {doneCount} / {merged.length}
          </span>
          <span>{localDay()}</span>
        </div>

        <div className={styles.character}>
          <div className={styles.charGlow} aria-hidden="true" />
          <img
            className={styles.charImg}
            src={challenge.character}
            alt={`${challenge.label}角色`}
            style={{ width: `${(128 * charSize[mode]) / 100}px` }}
          />
          {/* 眨眼：一块与背景同色的盖片，周期性压下模拟眼皮 */}
          <span className={styles.blink} aria-hidden="true" />
        </div>
      </HologramCard>

      <button
        className="resumeSession"
        onClick={() => {
          window.location.hash = 'stageProgress'
        }}
      >
        查看阶段进度
      </button>
      {state.rounds.some((r) => r.mode === mode) && (
        <button
          onClick={() => {
            window.location.hash = 'settle'
          }}
        >
          查看最近结算 ›
        </button>
      )}
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>今日任务</h2>
        <span className={styles.sectionMeta}>
          已完成 {doneCount} 项 · 还剩 {remaining} 项
        </span>
      </div>

      {state.session &&
        ['running', 'paused', 'due'].includes(state.session.status) && (
          <button
            className="resumeSession"
            onClick={() => onStartTask(state.session!.task.id)}
          >
            恢复专注 · {state.session.task.title}
          </button>
        )}
      {merged.length === 0 && (
        <p className={styles.sectionMeta}>
          今天没有计划任务。可以休息，或到目标页新建目标。
        </p>
      )}
      <ul className={styles.tasks}>
        {merged.map((task) => (
          <li
            key={task.id}
            className={`${styles.task} ${task.done ? styles.taskDone : ''}`}
          >
            <button
              type="button"
              className={styles.check}
              onClick={() => toggle(task)}
              disabled={
                task.done ||
                (state.session?.task.id === task.id &&
                  ['running', 'paused', 'due'].includes(state.session.status))
              }
              aria-pressed={task.done}
              aria-label={`${task.done ? '已完成' : '完成'}：${task.title}`}
              style={
                task.done
                  ? { background: checkColor, borderColor: 'transparent' }
                  : undefined
              }
            >
              {task.done && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
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
            <div
              className={styles.taskBody}
              onClick={() => {
                if (!task.done) onStartTask(task.id)
              }}
              style={{ cursor: task.done ? 'default' : 'pointer' }}
            >
              <p className={styles.taskTitle}>{task.title}</p>
              <p className={styles.taskMeta}>
                {task.duration} · +{task.xp} XP · +{task.soul} 魂火
              </p>
            </div>
            {task.done && <span className={styles.taskDoneLabel}>已完成</span>}
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
