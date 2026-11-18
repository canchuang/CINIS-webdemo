import { useEffect, useState } from 'react'
import styles from './CharSizeEditorPage.module.css'
import { defaultCharSize, loadCharSize, saveCharSize, type CharSizeConfig } from '../data/charSize'
import type { GameMode } from '../data/content'

const META: { key: GameMode; name: string; en: string; src: string }[] = [
  { key: 'traveler', name: '旅者', en: 'TRAVELER', src: '/assets/character-traveler.png' },
  { key: 'knight', name: '骑士', en: 'KNIGHT', src: '/assets/character-knight.png' },
  { key: 'abyss', name: '深渊', en: 'ABYSS', src: '/assets/character-abyss.png' },
]

export default function CharSizeEditorPage() {
  const [cfg, setCfg] = useState<CharSizeConfig>(() => loadCharSize())

  useEffect(() => {
    saveCharSize(cfg)
  }, [cfg])

  const set = (k: GameMode, v: number) => setCfg((p) => ({ ...p, [k]: v }))

  return (
    <div className={styles.wrap}>
      <header className={styles.topbar}>
        <a className={styles.back} href="#roles">
          ‹ 返回角色选择
        </a>
        <span className={styles.title}>角色大小编辑器</span>
        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={() => setCfg({ ...defaultCharSize })}>
            恢复默认
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.panel}>
          {META.map((m) => (
            <div key={m.key} className={styles.field}>
              <div className={styles.fieldHead}>
                <span className={styles.fieldLabel}>
                  {m.name} <em>{m.en}</em>
                </span>
                <span className={styles.fieldValue}>{cfg[m.key]}%</span>
              </div>
              <input
                type="range"
                className={styles.range}
                min={40}
                max={180}
                step={2}
                value={cfg[m.key]}
                onChange={(e) => set(m.key, Number(e.target.value))}
              />
              <div className={styles.scaleBtns}>
                {[80, 100, 120, 140].map((v) => (
                  <button key={v} type="button" className={styles.miniBtn} onClick={() => set(m.key, v)}>
                    {v}%
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className={styles.tip}>
            改动自动保存，角色选择页与今日页的角色形象同步缩放。
          </p>
        </aside>

        <main className={styles.previewArea}>
          <div className={styles.previewHint}>实时预览</div>
          <div className={styles.phone}>
            <div className={styles.cards}>
              {META.map((m) => (
                <div key={m.key} className={styles.card}>
                  <div className={styles.figure}>
                    <img
                      src={m.src}
                      alt={m.name}
                      style={{ transform: `scale(${cfg[m.key] / 100})` }}
                    />
                  </div>
                  <div className={styles.cardName}>{m.name}</div>
                  <div className={styles.cardEn}>{m.en}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
