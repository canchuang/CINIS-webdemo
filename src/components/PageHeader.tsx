import type { ReactNode } from 'react'
import styles from './PageHeader.module.css'

type Props = {
  title: string
  onBack?: () => void
  backLabel?: string
  right?: ReactNode
  /** 大标题（34px，用于一级页）或小标题（22px，用于二级页） */
  size?: 'xl' | 'lg'
}

/** 二级页通用头部：返回 + 标题 + 可选右槽 */
export function PageHeader({ title, onBack, backLabel, right, size = 'xl' }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        {onBack ? (
          <button type="button" className={styles.back} onClick={onBack} aria-label="返回">
            <span className={styles.chev} aria-hidden="true">
              ‹
            </span>
            {backLabel && <span className={styles.backText}>{backLabel}</span>}
          </button>
        ) : (
          <span />
        )}
        {right && <div className={styles.right}>{right}</div>}
      </div>
      <h1 className={`${styles.title} ${size === 'lg' ? styles.titleLg : ''}`}>{title}</h1>
    </header>
  )
}
