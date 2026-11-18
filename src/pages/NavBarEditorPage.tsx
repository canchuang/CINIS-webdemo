import { useEffect, useState } from 'react'
import styles from './NavBarEditorPage.module.css'
import { BottomNav } from '../components/BottomNav'
import { defaultNavBar, loadNavBar, saveNavBar, withAlpha, type NavBarConfig } from '../data/navBar'

type RangeField = {
  key: keyof NavBarConfig
  label: string
  min: number
  max: number
  step: number
}

const RANGES: RangeField[] = [
  { key: 'opacity', label: '背景不透明度', min: 0, max: 1, step: 0.01 },
  { key: 'blur', label: '高斯模糊(px)', min: 0, max: 40, step: 1 },
  { key: 'shadowOpacity', label: '阴影不透明度', min: 0, max: 1, step: 0.01 },
  { key: 'shadowBlur', label: '阴影模糊(px)', min: 0, max: 60, step: 1 },
  { key: 'shadowY', label: '阴影位移(px)', min: 0, max: 30, step: 1 },
  { key: 'borderOpacity', label: '描边强度', min: 0, max: 1, step: 0.01 },
]

export default function NavBarEditorPage() {
  const [cfg, setCfg] = useState<NavBarConfig>(() => loadNavBar())

  useEffect(() => {
    saveNavBar(cfg)
  }, [cfg])

  const set = <K extends keyof NavBarConfig>(k: K, v: NavBarConfig[K]) =>
    setCfg((p) => ({ ...p, [k]: v }))

  return (
    <div className={styles.wrap}>
      <header className={styles.topbar}>
        <a className={styles.back} href="#today">
          ‹ 返回原型
        </a>
        <span className={styles.title}>底部导航栏生成器</span>
        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={() => setCfg({ ...defaultNavBar })}>
            恢复默认
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.panel}>
          <label className={styles.masterRow}>
            <span>启用自定义导航栏</span>
            <button
              type="button"
              role="switch"
              aria-checked={cfg.enabled}
              className={`${styles.switch} ${cfg.enabled ? styles.switchOn : ''}`}
              onClick={() => set('enabled', !cfg.enabled)}
            >
              <span className={styles.knob} />
            </button>
          </label>

          <div className={styles.field}>
            <div className={styles.fieldHead}>
              <span className={styles.fieldLabel}>背景色</span>
            </div>
            <div className={styles.colorRow}>
              <input
                type="color"
                className={styles.colorInput}
                value={cfg.bgColor}
                onChange={(e) => set('bgColor', e.target.value)}
              />
              <input
                type="text"
                className={styles.colorText}
                value={cfg.bgColor}
                onChange={(e) => set('bgColor', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.fieldHead}>
              <span className={styles.fieldLabel}>阴影颜色</span>
            </div>
            <div className={styles.colorRow}>
              <input
                type="color"
                className={styles.colorInput}
                value={cfg.shadowColor}
                onChange={(e) => set('shadowColor', e.target.value)}
              />
              <input
                type="text"
                className={styles.colorText}
                value={cfg.shadowColor}
                onChange={(e) => set('shadowColor', e.target.value)}
              />
            </div>
          </div>

          {RANGES.map((f) => (
            <div key={f.key} className={styles.field}>
              <div className={styles.fieldHead}>
                <span className={styles.fieldLabel}>{f.label}</span>
                <span className={styles.fieldValue}>{Number(cfg[f.key]).toFixed(f.step < 1 ? 2 : 0)}</span>
              </div>
              <input
                type="range"
                className={styles.range}
                min={f.min}
                max={f.max}
                step={f.step}
                value={Number(cfg[f.key])}
                onChange={(e) => set(f.key, Number(e.target.value) as never)}
              />
            </div>
          ))}

          <p className={styles.tip}>
            修改后自动保存，所有页面的底部导航栏同步生效。
          </p>
        </aside>

        <main className={styles.previewArea}>
          <div className={styles.previewHint}>实时预览 · 可点 tab 看滑动效果</div>
          <div className={styles.phone} id="navpreview">
            <div className={styles.fakeContent}>
              <div className={styles.fakeTitle}>3 月 12 日 · 周三</div>
              <div className={styles.fakeCard} />
              <div className={styles.fakeRow} />
              <div className={styles.fakeRow} />
              <div className={styles.fakeRowShort} />
            </div>
            <BottomNav active="today" onChange={() => {}} />
          </div>
          <div className={styles.codeLine}>
            <code>
              background: {withAlpha(cfg.bgColor, cfg.opacity)} · blur({cfg.blur}px) · shadow 0 {cfg.shadowY}px{' '}
              {cfg.shadowBlur}px {withAlpha(cfg.shadowColor, cfg.shadowOpacity)}
            </code>
          </div>
        </main>
      </div>
    </div>
  )
}
