import { assetUrl } from '../data/assets'
import { useEffect, useState } from 'react'
import styles from './CardFxEditorPage.module.css'
import { HologramCard } from '../components/HologramCard'
import {
  defaultCardFx,
  loadCardFx,
  saveCardFx,
  type CardFxConfig,
} from '../data/cardFx'

type RangeField = {
  key: keyof CardFxConfig
  label: string
  min: number
  max: number
  step: number
}

const RANGES: RangeField[] = [
  { key: 'maxTilt', label: '最大倾斜角度(°)', min: 0, max: 20, step: 1 },
  { key: 'tiltMs', label: '倾斜过渡(ms)', min: 0, max: 500, step: 10 },
  { key: 'holoBase', label: '虹彩·静止', min: 0, max: 1, step: 0.01 },
  { key: 'holoTilt', label: '虹彩·倾斜增强', min: 0, max: 1, step: 0.01 },
  { key: 'foilBase', label: '条纹·静止', min: 0, max: 1, step: 0.01 },
  { key: 'foilTilt', label: '条纹·倾斜增强', min: 0, max: 1, step: 0.01 },
  { key: 'glareBase', label: '眩光·静止', min: 0, max: 1, step: 0.01 },
  { key: 'glareTilt', label: '眩光·倾斜增强', min: 0, max: 1, step: 0.01 },
  { key: 'borderBase', label: '描边·静止', min: 0, max: 1, step: 0.01 },
  { key: 'borderTilt', label: '描边·倾斜增强', min: 0, max: 1, step: 0.01 },
  { key: 'depthZ', label: '角色深度(px)', min: 0, max: 120, step: 2 },
  { key: 'shadow', label: '落影强度', min: 0, max: 1, step: 0.01 },
]

const TOGGLES: { key: keyof CardFxConfig; label: string }[] = [
  { key: 'enabled', label: '启用全息卡片' },
  { key: 'showFoil', label: '全息条纹' },
  { key: 'showGlare', label: '眩光' },
  { key: 'showGrain', label: '光栅颗粒' },
  { key: 'showBorder', label: '彩虹描边' },
]

export default function CardFxEditorPage() {
  const [cfg, setCfg] = useState<CardFxConfig>(() => loadCardFx())

  useEffect(() => {
    saveCardFx(cfg)
  }, [cfg])

  const set = <K extends keyof CardFxConfig>(k: K, v: CardFxConfig[K]) =>
    setCfg((p) => ({ ...p, [k]: v }))

  return (
    <div className={styles.wrap}>
      <header className={styles.topbar}>
        <a className={styles.back} href="#today">
          ‹ 返回原型
        </a>
        <span className={styles.title}>卡片特效编辑器（全息）</span>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnGhost}
            onClick={() => setCfg({ ...defaultCardFx })}
          >
            恢复默认
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.panel}>
          {TOGGLES.map((t) => (
            <label key={t.key} className={styles.switchRow}>
              <span>{t.label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={Boolean(cfg[t.key])}
                className={`${styles.switch} ${cfg[t.key] ? styles.switchOn : ''}`}
                onClick={() => set(t.key, !cfg[t.key] as never)}
              >
                <span className={styles.knob} />
              </button>
            </label>
          ))}

          {RANGES.map((f) => (
            <div key={f.key} className={styles.field}>
              <div className={styles.fieldHead}>
                <span className={styles.fieldLabel}>{f.label}</span>
                <span className={styles.fieldValue}>
                  {Number(cfg[f.key]).toFixed(f.step < 1 ? 2 : 0)}
                </span>
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
            鼠标悬浮到右侧卡片上即可查看倾斜与彩虹效果。改动自动保存，三个模式今日页同步生效。
          </p>
        </aside>

        <main className={styles.previewArea}>
          <div className={styles.previewHint}>实时预览 · 悬浮卡片查看效果</div>
          <div className={styles.phone}>
            <div className={styles.pageBg}>
              <div className={styles.head}>
                <div className={styles.date}>3 月 12 日 · 周三</div>
                <div className={styles.lv}>Lv.08</div>
              </div>

              <HologramCard
                className={styles.card}
                maxTilt={cfg.maxTilt}
                fxOverride={cfg}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardTop}>
                    <span>旅者 · 第一阶段</span>
                    <span>第 3 / 7 天</span>
                  </div>
                  <div className={styles.quote}>走多远，算多远</div>
                  <div className={styles.soulRow}>
                    <span className={styles.soulLabel}>魂火</span>
                    <span className={styles.soulVal}>
                      100<em>/ 120</em>
                    </span>
                    <span className={styles.gate}>无门槛</span>
                  </div>
                  <div className={styles.track}>
                    <div className={styles.trackFill} />
                  </div>
                  <div className={styles.cardFoot}>
                    <span>今日 2 / 3</span>
                    <span>第 3 / 7 天</span>
                  </div>
                  <img
                    className={styles.character}
                    src={assetUrl(`/assets/character-traveler.png`)}
                    alt=""
                  />
                </div>
              </HologramCard>

              <div className={styles.tasks}>
                <div className={styles.tasksHead}>今日任务</div>
                <div className={styles.taskRow}>跟读复述 1 段</div>
                <div className={styles.taskRow}>背诵 20 个生词</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
