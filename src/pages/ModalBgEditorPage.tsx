import { useEffect, useState } from 'react'
import styles from './ModalBgEditorPage.module.css'
import { ModalBackdrop } from '../components/ModalBackdrop'
import { sheetFxStyle } from '../components/sheetFx'
import { defaultModalBg, loadModalBg, saveModalBg, type ModalBgConfig } from '../data/modalBg'

type Field =
  | { key: keyof ModalBgConfig; label: string; type: 'range'; min: number; max: number; step: number }
  | { key: keyof ModalBgConfig; label: string; type: 'color' }
  | { key: keyof ModalBgConfig; label: string; type: 'toggle' }

const FIELDS: { group: string; items: Field[] }[] = [
  {
    group: '光晕',
    items: [
      { key: 'glowColor', label: '光晕颜色', type: 'color' },
      { key: 'glowOpacity', label: '光晕不透明度', type: 'range', min: 0, max: 1, step: 0.01 },
      { key: 'glowScale', label: '光晕大小', type: 'range', min: 0.5, max: 2, step: 0.05 },
      { key: 'breathSpeed', label: '呼吸速度（秒）', type: 'range', min: 0.5, max: 8, step: 0.1 },
      { key: 'breathAmount', label: '呼吸幅度', type: 'range', min: 0, max: 0.6, step: 0.01 },
      { key: 'riseEnabled', label: '上浮入场', type: 'toggle' },
    ],
  },
  {
    group: '遮罩',
    items: [
      { key: 'maskColor', label: '遮罩颜色', type: 'color' },
      { key: 'maskOpacity', label: '遮罩不透明度', type: 'range', min: 0, max: 1, step: 0.01 },
    ],
  },
  {
    group: '粒子',
    items: [
      { key: 'particleCount', label: '粒子数量', type: 'range', min: 0, max: 40, step: 1 },
      { key: 'particleSpeed', label: '上升速度（秒）', type: 'range', min: 1, max: 12, step: 0.5 },
      { key: 'particleSize', label: '粒子大小', type: 'range', min: 1, max: 8, step: 1 },
      { key: 'particleColor', label: '粒子颜色', type: 'color' },
      { key: 'particleOpacity', label: '粒子不透明度', type: 'range', min: 0, max: 1, step: 0.01 },
    ],
  },
  {
    group: '弹窗面板特效（磨砂暖白）',
    items: [
      { key: 'sheetFxEnabled', label: '启用面板特效', type: 'toggle' },
      { key: 'sheetBgTop', label: '顶部颜色', type: 'color' },
      { key: 'sheetBgBottom', label: '底部颜色', type: 'color' },
      { key: 'sheetBgOpacity', label: '不透明度（越低越透）', type: 'range', min: 0.3, max: 1, step: 0.01 },
      { key: 'sheetBlur', label: '磨砂模糊(px)', type: 'range', min: 0, max: 40, step: 1 },
    ],
  },
]

export default function ModalBgEditorPage() {
  const [cfg, setCfg] = useState<ModalBgConfig>(() => loadModalBg())
  const [copied, setCopied] = useState(false)

  // 每次改动都写入 localStorage，弹窗立即生效
  useEffect(() => {
    saveModalBg(cfg)
  }, [cfg])

  const set = <K extends keyof ModalBgConfig>(key: K, value: ModalBgConfig[K]) =>
    setCfg((prev) => ({ ...prev, [key]: value }))

  const fx = sheetFxStyle(cfg)

  const copyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(cfg, null, 2))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.topbar}>
        <a className={styles.back} href="#today">
          ‹ 返回原型
        </a>
        <span className={styles.title}>弹窗背景动效编辑器</span>
        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={() => setCfg({ ...defaultModalBg })}>
            恢复默认
          </button>
          <button type="button" className={styles.btnGhost} onClick={copyJSON}>
            {copied ? '已复制 ✓' : '复制参数'}
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {/* 左：参数面板 */}
        <aside className={styles.panel}>
          <label className={styles.masterRow}>
            <span>启用动效背景</span>
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

          {FIELDS.map((group) => (
            <section key={group.group} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.group}</h3>
              {group.items.map((f) => (
                <div key={f.key} className={styles.field}>
                  <div className={styles.fieldHead}>
                    <span className={styles.fieldLabel}>{f.label}</span>
                    {f.type === 'range' && (
                      <span className={styles.fieldValue}>
                        {Number(cfg[f.key]).toFixed(f.step < 1 ? 2 : 0)}
                      </span>
                    )}
                  </div>

                  {f.type === 'range' && (
                    <input
                      type="range"
                      className={styles.range}
                      min={f.min}
                      max={f.max}
                      step={f.step}
                      value={Number(cfg[f.key])}
                      onChange={(e) => set(f.key, Number(e.target.value) as never)}
                    />
                  )}

                  {f.type === 'color' && (
                    <div className={styles.colorRow}>
                      <input
                        type="color"
                        className={styles.colorInput}
                        value={String(cfg[f.key])}
                        onChange={(e) => set(f.key, e.target.value as never)}
                      />
                      <input
                        type="text"
                        className={styles.colorText}
                        value={String(cfg[f.key])}
                        onChange={(e) => set(f.key, e.target.value as never)}
                      />
                    </div>
                  )}

                  {f.type === 'toggle' && (
                    <button
                      type="button"
                      role="switch"
                      aria-checked={Boolean(cfg[f.key])}
                      className={`${styles.switch} ${cfg[f.key] ? styles.switchOn : ''}`}
                      onClick={() => set(f.key, !cfg[f.key] as never)}
                    >
                      <span className={styles.knob} />
                    </button>
                  )}
                </div>
              ))}
            </section>
          ))}
        </aside>

        {/* 右：实时预览 */}
        <main className={styles.previewArea}>
          <div className={styles.previewHint}>实时预览 · 点背景可关闭</div>
          <div className={styles.phone}>
            {/* 底层页面示意 */}
            <div className={styles.fakePage}>
              <div className={styles.fakeTitle}>3 月 12 日 · 周三</div>
              <div className={styles.fakeCard}>
                <span>骑士 · 第一阶段</span>
                <strong>七日之后，誓言兑现</strong>
              </div>
              <div className={styles.fakeRow}>跟读复述 1 段</div>
              <div className={styles.fakeRow}>背诵 20 个生词</div>
            </div>

            <ModalBackdrop config={cfg} />

            <div className={`${styles.sheet} ${fx.className}`} style={fx.style}>
              <div className={styles.grabber} />
              <div className={styles.sheetHead}>
                <div>
                  <div className={styles.sheetTask}>跟读复述 1 段</div>
                  <div className={styles.sheetMeta}>20 分钟 · +40 XP · +10 魂火</div>
                </div>
                <div className={styles.sheetCancel}>取消</div>
              </div>
              <div className={styles.sheetMain}>
                <span>点火专注</span>
                <small>⏱ 20 min · +40 XP</small>
              </div>
              <div className={styles.sheetQuick}>快速打卡</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
