import styles from './StageProgressPage.module.css'
import { PageHeader } from '../components/PageHeader'
import { useAppState } from '../data/appStore'
import {
  RULES,
  localDay,
  shiftDay,
  dayDistance,
  roundStats,
  type Mode,
} from '../domain/engine'
export function StageProgressPage({
  mode,
  onBack,
  onSettings,
  onGoTasks,
}: {
  mode: Mode
  onBack: () => void
  onSettings?: () => void
  onGoTasks: () => void
}) {
  const s = useAppState(),
    start = s.stages[mode] ?? localDay(),
    end = shiftDay(start, RULES[mode].days - 1),
    p = roundStats(s, mode, start, end),
    day = Math.max(1, dayDistance(start, localDay()) + 1)
  return (
    <div className={styles.page}>
      <PageHeader title="阶段进度" onBack={onBack} />
      <p>
        {RULES[mode].label} · 第 {day} / {RULES[mode].days} 天
      </p>
      <p>
        {start} — {end}
      </p>
      <div className={styles.bigRow}>
        <span className={styles.big}>
          {p.done}
          <em> / {p.total}</em>
        </span>
        <span>已生成任务完成率 {Math.round(p.rate * 100)}%</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${p.rate * 100}%` }} />
      </div>
      <p>
        {RULES[mode].threshold
          ? `阶段门槛 ${RULES[mode].threshold * 100}%`
          : '无门槛 · 按实际完成结算'}
      </p>
      <p>
        暂存魂火 {p.earnedSoul} · 有效专注 {Math.floor(p.focusedMs / 60000)}{' '}
        分钟
      </p>
      <p>后续执行日的任务会逐日生成，休息日不计入任务总数。</p>
      <button className="primaryAction" onClick={onGoTasks}>
        去完成今天的任务
      </button>
      {onSettings && <button onClick={onSettings}>查看目标设置</button>}
    </div>
  )
}
