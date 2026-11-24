import { assetUrl } from '../data/assets'
import styles from './SettlePage.module.css'
import { useAppState } from '../data/appStore'
import { RULES, type Mode } from '../domain/engine'
export function SettlePage({
  mode = 'traveler',
  onContinue,
  onSkip,
  onViewProgress,
}: {
  mode?: Mode
  onContinue: () => void
  onSkip: () => void
  onViewProgress?: () => void
  onBackHome?: () => void
}) {
  const s = useAppState(),
    r = s.rounds.filter((r) => r.mode === mode).at(-1)
  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <span className={styles.crumb}>魂火结算 · {RULES[mode].label}</span>
        <button onClick={onSkip}>跳过</button>
      </div>
      <div className={styles.hero}>
        <img src={assetUrl(`/assets/settle-${mode}.png`)} alt="" />
      </div>
      <h1 className={styles.title}>
        {r
          ? r.passed
            ? '这段征途，已被记住。'
            : '火焰暂歇，经历仍在。'
          : '本阶段尚未结束'}
      </h1>
      {r ? (
        <>
          <p className={styles.sub}>
            {r.start} — {r.end} · {r.done}/{r.total} 项
          </p>
          <p className={styles.soul}>{r.bankedSoul} 魂火</p>
          <p>
            完成率 {Math.round(r.rate * 100)}% · 损失暂存魂火 {r.lostSoul}
          </p>
          <p>永久经验、称号与历史始终保留。</p>
        </>
      ) : (
        <p className={styles.sub}>阶段结束后自动核算，并保留一次结算记录。</p>
      )}
      <button className="primaryAction" onClick={onContinue}>
        继续征途
      </button>
      {onViewProgress && <button onClick={onViewProgress}>查看当前阶段</button>}
    </div>
  )
}
