import type { ReactNode } from 'react'
import styles from './Screen.module.css'

type Props = {
  children: ReactNode
  /** 是否显示底部导航留白 */
  withNav?: boolean
}

/** 手机屏幕外壳：状态栏 + 可滚动内容区 + 安全区 */
export function Screen({ children, withNav = true }: Props) {
  return (
    <div className={styles.screen}>
      <StatusBar />
      <main className={`${styles.content} ${withNav ? styles.withNav : ''}`}>{children}</main>
      <div className={styles.homeBar} aria-hidden="true" />
    </div>
  )
}

function StatusBar() {
  return (
    <div className={styles.statusBar} aria-hidden="true">
      <span className={styles.time}>9:41</span>
      <span className={styles.icons}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor" />
          <rect x="5" y="5" width="3" height="7" rx="1" fill="currentColor" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor" />
        </svg>
        <svg width="42" height="12" viewBox="0 0 42 12" fill="none">
          <rect x="0.5" y="0.5" width="34" height="11" rx="3" stroke="currentColor" />
          <rect x="2.5" y="2.5" width="26" height="7" rx="1.5" fill="currentColor" />
          <path d="M37 4v4a2.5 2.5 0 0 0 0-4Z" fill="currentColor" />
        </svg>
      </span>
    </div>
  )
}
