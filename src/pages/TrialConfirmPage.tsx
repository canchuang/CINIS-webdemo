import styles from './TrialConfirmPage.module.css'
import { RULES, type GoalDraft } from '../domain/engine'
import { trialConfirms, type GameMode } from '../data/content'

type Props = {
  mode: GameMode
  draft?: GoalDraft | null
  onBack: () => void
  onChangeMode?: () => void
  onConfirm: () => void
}

/** N03b 试炼确认（三模式，深/浅色）。「换个模式」跳角色选择页。 */
export function TrialConfirmPage({
  mode,
  draft,
  onBack,
  onChangeMode,
  onConfirm,
}: Props) {
  // 显示当前模式的试炼内容
  const cur: GameMode = mode
  const rule = RULES[cur]
  const t = {
    ...trialConfirms[cur],
    setup: [
      { label: '周期', value: `${rule.days} 天`, accent: false },
      {
        label: '执行计划',
        value: draft
          ? `每周 ${draft.scheduledDays.filter(Boolean).length} 天 · 每天 ${draft.dailyTasks} 项`
          : '以目标设置为准',
        accent: false,
      },
      {
        label: '结算门槛',
        value: rule.threshold ? `${rule.threshold * 100}%` : '无门槛',
        accent: false,
      },
      { label: '专注暂停', value: rule.focusRule, accent: false },
      {
        label: '未达标代价',
        value: `${rule.loss * 100}% 暂存魂火`,
        accent: true,
      },
    ],
    terms: [
      {
        title: '永久成长始终保留',
        detail:
          '任务完成后获得永久经验。阶段结束时按实际完成率结算魂火；快速打卡不计专注时长。',
        tone: 'ok',
      },
    ],
  }
  const cls = t.dark ? `${styles.screen} ${styles.dark}` : styles.screen
  const accentClass =
    cur === 'knight'
      ? styles.accentGold
      : cur === 'abyss'
        ? styles.accentPurple
        : styles.accentGreen

  return (
    <div className={`${cls} ${accentClass}`}>
      <div className={styles.top}>
        <button
          type="button"
          className={styles.back}
          onClick={onBack}
          aria-label="返回"
        >
          ‹
        </button>
        <span className={styles.modeEn}>{t.modeEn}</span>
      </div>

      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.sub}>{t.sub}</p>

      <div className={styles.modeCard}>
        <div className={styles.modeBadge}>缩略</div>
        <div className={styles.modeInfo}>
          <span className={styles.modeName}>{t.modeLabel} · 试炼</span>
          <button
            type="button"
            className={styles.change}
            onClick={() => onChangeMode?.()}
          >
            {t.changeLabel}
          </button>
        </div>
        <span className={styles.gate}>{t.gate}</span>
      </div>

      <h3 className={styles.sectionTitle}>{t.setupTitle}</h3>
      <ul className={styles.rows}>
        {t.setup.map((s) => (
          <li key={s.label} className={styles.row}>
            <span className={styles.rowLabel}>{s.label}</span>
            <span
              className={`${styles.rowValue} ${s.accent ? styles.rowAccent : ''}`}
            >
              {s.value}
            </span>
          </li>
        ))}
      </ul>

      {t.termsTitle && <h3 className={styles.sectionTitle}>{t.termsTitle}</h3>}
      <div className={styles.terms}>
        {t.terms.map((term) => (
          <div
            key={term.title}
            className={`${styles.term} ${term.tone === 'ok' ? styles.termOk : styles.termWarn}`}
          >
            <p className={styles.termTitle}>{term.title}</p>
            <p className={styles.termDetail}>{term.detail}</p>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        {t.secondaryLabel && (
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => onChangeMode?.()}
          >
            {t.secondaryLabel}
          </button>
        )}
        <button type="button" className={styles.btnPrimary} onClick={onConfirm}>
          {t.primaryLabel}
        </button>
      </div>
    </div>
  )
}
