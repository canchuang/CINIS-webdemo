import styles from './PrivacyPage.module.css'
import widgets from '../styles/widgets.module.css'
import { PageHeader } from '../components/PageHeader'
import { appStore } from '../data/appStore'
export function PrivacyPage({ onBack }: { onBack: () => void }) {
  const download = () => {
    const blob = new Blob([appStore.export()], { type: 'application/json' }),
      url = URL.createObjectURL(blob),
      a = document.createElement('a')
    a.href = url
    a.download = `CINIS-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className={`${styles.page} darkSystem`}>
      <PageHeader title="数据与隐私" onBack={onBack} />
      <h2 className={styles.lead}>记录保存在当前浏览器</h2>
      <p>
        目标、提醒、任务、专注与成长自动保存。清理浏览器数据或更换设备不会自动同步。
      </p>
      <button className={widgets.btnPrimary} onClick={download}>
        导出全部记录与旧版备份
      </button>
      <h3 className={styles.section}>清空本机记录</h3>
      <p>清空后不可恢复，建议先导出备份。</p>
      <button
        className={widgets.btnDanger}
        onClick={() => {
          if (
            window.confirm(
              '清空当前版本的全部目标和记录？此操作不可撤销，请先导出备份。',
            )
          ) {
            appStore.reset()
            onBack()
          }
        }}
      >
        清空记录
      </button>
    </div>
  )
}
