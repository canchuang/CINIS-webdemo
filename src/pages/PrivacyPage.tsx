import styles from './PrivacyPage.module.css'
import widgets from '../styles/widgets.module.css'
import { PageHeader } from '../components/PageHeader'
import { privacyInfo } from '../data/content'

type Props = { onBack: () => void }

/** P33 数据与隐私 */
export function PrivacyPage({ onBack }: Props) {
  const p = privacyInfo
  return (
    <div className={`${styles.page} darkSystem`}>
      <PageHeader title="数据与隐私" onBack={onBack} size="lg" />

      <h2 className={styles.lead}>{p.local.title}</h2>
      <p className={styles.leadSub}>{p.local.sub}</p>

      <h3 className={styles.section}>导出</h3>
      <ul className={styles.rows}>
        {p.exports.map((e) => (
          <li key={e.title}>
            <button type="button" className={styles.exportRow}>
              <span className={styles.exportText}>
                <span className={styles.exportTitle}>{e.title}</span>
                <span className={styles.exportSub}>{e.sub}</span>
              </span>
              <span className={widgets.arrow} aria-hidden="true">
                ›
              </span>
            </button>
          </li>
        ))}
      </ul>

      <h3 className={styles.section}>权限</h3>
      <ul className={styles.rows}>
        {p.perms.map((perm) => (
          <li key={perm.label} className={widgets.row}>
            <span className={widgets.rowLabel}>{perm.label}</span>
            <span className={widgets.rowValue}>{perm.value}</span>
          </li>
        ))}
      </ul>

      <h3 className={styles.section}>{p.clear.title}</h3>
      <p className={styles.clearSub}>{p.clear.sub}</p>
      <button type="button" className={widgets.btnDanger} style={{ marginTop: 12 }}>
        {p.clear.action}
      </button>

      <div className={styles.footBlock}>
        <p className={styles.footTitle}>{p.foot.title}</p>
        <p className={styles.footSub}>{p.foot.sub}</p>
      </div>
    </div>
  )
}

