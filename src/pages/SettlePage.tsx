import styles from './SettlePage.module.css'
import { modeSettle, type SettleMode } from '../data/settle'
import { modeThemes } from '../styles/tokens'
import type { GameMode } from '../data/content'

type Props = {
  mode?: GameMode
  onContinue: () => void
  onSkip: () => void
  onViewProgress?: () => void
  onBackHome?: () => void
}

/** P15 / P22 / P29 阶段结算（深色，按模式换色与文案） */
export function SettlePage({ mode = 'traveler', onContinue, onSkip, onViewProgress, onBackHome }: Props) {
  const s: SettleMode = modeSettle[mode]
  const theme = modeThemes[mode]

  // 数值颜色：旅者/骑士 金，深渊 白（与稿一致）
  const soulColor = mode === 'abyss' ? '#FFFFFF' : '#F5C66A'
  // 强调行颜色：深渊/骑士 绿 +1000 XP，旅者按稿为绿色经验
  const accentColor = mode === 'traveler' ? '#6FCF97' : '#4ADE80'
  // 页面底色：旅者深绿 #15211C（P15），骑士/深渊暖黑 #17130F
  const screenBg = mode === 'traveler' ? '#15211C' : '#17130F'
  // 旅者稿中立绘无卡片背景，其余模式保留卡片
  const heroCard = mode !== 'traveler'
  // 主按钮：旅者 #438D7B
  const ctaBg = mode === 'knight' ? '#F0AD53' : mode === 'traveler' ? '#438D7B' : theme.accent
  const ctaColor = mode === 'knight' ? '#17130F' : '#F3EDE2'

  return (
    <div className={styles.screen} style={{ background: screenBg }}>
      <div className={styles.topBar}>
        <span className={styles.crumb}>
          魂火结算 · {s.mode} · {s.duration}
        </span>
        <button type="button" className={styles.skip} onClick={onSkip}>
          跳过
        </button>
      </div>

      <div className={`${styles.hero} ${heroCard ? '' : styles.heroPlain}`}>
        <img src={s.hero} alt="" />
      </div>

      <h1 className={styles.title}>{s.title}</h1>
      <p className={styles.sub}>{s.subtitle}</p>

      <p className={styles.label}>结算魂火 · 一次性</p>
      <p className={styles.soul} style={{ color: soulColor }}>
        {s.soul}
        <span aria-hidden="true">🔥</span>
      </p>

      <ul className={styles.rows}>
        {s.rows.map((r) => (
          <li key={r.label} className={styles.row}>
            <span className={styles.rowLabel}>{r.label}</span>
            <span
              className={styles.rowValue}
              style={
                r.accent
                  ? { color: accentColor, fontWeight: 700 }
                  : r.copper
                    ? { color: '#C08A52', fontWeight: 700 }
                    : undefined
              }
            >
              {r.value}
            </span>
          </li>
        ))}
      </ul>

      {s.badge && (
        <div className={styles.badge} style={{ borderColor: theme.glow }}>
          <p className={styles.badgeTitle} style={{ color: '#F5C66A' }}>
            {s.badge.title}
          </p>
          <p className={styles.badgeSub}>{s.badge.sub}</p>
        </div>
      )}

      <div className={styles.actions}>
        {s.backLabel && (
          <button type="button" className={styles.btnBack} onClick={onBackHome ?? onContinue}>
            {s.backLabel}
          </button>
        )}
        <button
          type="button"
          className={styles.cta}
          style={{ background: ctaBg, color: ctaColor }}
          onClick={onContinue}
        >
          继续征途
        </button>
      </div>

      {onViewProgress && (
        <button type="button" className={styles.progressLink} onClick={onViewProgress}>
          查看阶段进度 ›
        </button>
      )}
      <p className={styles.foot}>称号与经验不因后续失败收回。</p>
    </div>
  )
}

