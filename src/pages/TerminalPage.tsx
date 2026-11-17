import styles from './TerminalPage.module.css'
import { PageHeader } from '../components/PageHeader'
import { terminalInfo } from '../data/content'

type Props = { onBack: () => void; onChangeMode: () => void; onContinue: () => void }

/** P16 终止（旅者：无损失） */
export function TerminalPage({ onBack, onChangeMode, onContinue }: Props) {
  const t = terminalInfo
  return (
    <div className={styles.page}>
      <PageHeader title="进度停在这里" onBack={onBack} backLabel="今日" size="lg" />

      <div className={styles.card}>
        <p className={styles.cardTitle}>{t.card.title}</p>
        <p className={styles.cardSub}>{t.card.sub}</p>
      </div>

      <div className={styles.keepHead}>
        <span className={styles.keepLabel}>{t.keepLabel}</span>
        <span className={styles.keepHint}>{t.keepHint}</span>
      </div>
      <ul className={styles.rows}>
        {t.rows.map((r) => (
          <li key={r.label} className={styles.row}>
            <span className={styles.rowLabel}>{r.label}</span>
            <span className={styles.rowValue}>{r.value}</span>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button type="button" className={styles.btnSecondary} onClick={onChangeMode}>
          {t.secondary}
        </button>
        <button type="button" className={styles.btnPrimary} onClick={onContinue}>
          {t.primary}
        </button>
      </div>
    </div>
  )
}
