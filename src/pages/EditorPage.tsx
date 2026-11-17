import { useEffect, useRef, useState } from 'react'
import grapesjs, { type Editor } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import styles from './EditorPage.module.css'

/**
 * 浏览器内可视化拖拽编辑器（GrapesJS）
 * 预置「我的」「今日」两个模板，可拖拽、改字、改色、导出 HTML。
 */

const PHONE_BASE = `
* { box-sizing: border-box; }
body { margin: 0; font-family: "OPPO Sans 4.0", -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; }
.screen { width: 390px; min-height: 844px; background: #F5F7FB; color: #16181D; overflow: hidden; padding-bottom: 24px; }
.statusbar { height: 44px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; font-size: 15px; font-weight: 600; }
.pad { padding: 0 24px; }
.h1 { font-size: 34px; line-height: 42px; font-weight: 700; letter-spacing: -0.5px; margin: 0 0 18px; }
.row-card { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 0; border-bottom: 1px solid #EEF0F4; }
.row-title { font-size: 16px; font-weight: 600; color: #16181D; }
.row-desc { font-size: 13px; color: #98A2B3; margin-top: 3px; }
.chev { color: #C4CAD4; font-size: 18px; }
.group-label { font-size: 16px; font-weight: 700; color: #98A2B3; margin: 18px 0 6px; }
.avatar { width: 72px; height: 72px; border-radius: 50%; background: #EEF0F4; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #5F6773; }
.xptrack { height: 3px; background: #E4E7EC; border-radius: 2px; overflow: hidden; margin: 18px 0 8px; }
.xpfill { height: 100%; width: 85%; background: #16181D; border-radius: 2px; }
.muted { font-size: 13px; color: #98A2B3; }
.nav { margin: 24px 0 0; height: 70px; background: #fff; border: 1px solid #ECEFF5; border-radius: 35px; display: grid; grid-template-columns: repeat(4, 1fr); align-items: center; box-shadow: 0 6px 24px rgba(22,24,29,.06); }
.nav-item { text-align: center; font-size: 12px; color: #98A2B3; }
.nav-item.on { color: #FF7A1A; font-weight: 600; }
.card-dark { background: #15211C; color: #EFEAE1; border-radius: 16px; padding: 16px; }
.card-kicker { font-size: 12px; color: #8FA79B; }
.card-quote { font-size: 20px; font-weight: 700; margin: 6px 0 10px; }
.soul { font-size: 28px; font-weight: 700; }
.soul em { font-style: normal; font-size: 13px; color: #8FA79B; font-weight: 400; }
.task { display: flex; gap: 14px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #EEF0F4; }
.check { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #CFD5DE; flex: none; margin-top: 2px; }
.check.done { background: #287D68; border-color: transparent; }
.task-title { font-size: 16px; font-weight: 600; margin: 0; }
.task-meta { font-size: 13px; color: #98A2B3; margin: 4px 0 0; }
.btn-start { flex: none; padding: 8px 18px; border-radius: 999px; background: #FF7A1A; color: #fff; font-size: 14px; font-weight: 600; border: none; align-self: center; }
`

const ME_TPL = `
<div class="screen">
  <div class="statusbar"><span>9:41</span><span>▮▮▮</span></div>
  <div class="pad">
    <h1 class="h1">我的</h1>
    <div style="display:flex;align-items:center;gap:16px">
      <div class="avatar">乐</div>
      <div>
        <div style="font-size:22px;font-weight:700">乐乐</div>
        <div class="muted" style="margin-top:4px">踏火之人 · Lv.08 · 680 / 800 XP</div>
      </div>
    </div>
    <div class="xptrack"><div class="xpfill"></div></div>
    <div class="muted">距 微光段位 还差 120 XP</div>
    <div class="group-label">成长</div>
    <div class="row-card"><div><div class="row-title">通知设置</div><div class="row-desc">提醒时间、频率</div></div><div class="chev">›</div></div>
    <div class="row-card"><div><div class="row-title">成就墙</div><div class="row-desc">12 / 32 枚</div></div><div class="chev">›</div></div>
    <div class="row-card"><div><div class="row-title">历史记录</div><div class="row-desc">41 轮</div></div><div class="chev">›</div></div>
    <div class="group-label">偏好</div>
    <div class="row-card"><div><div class="row-title">成长反馈偏好</div><div class="row-desc">要不要每次打卡都提示</div></div><div class="chev">›</div></div>
    <div class="row-card"><div><div class="row-title">数据与隐私</div><div class="row-desc">本地存储、导出、清除</div></div><div class="chev">›</div></div>
    <div class="nav"><div class="nav-item">今日</div><div class="nav-item">目标</div><div class="nav-item">成长</div><div class="nav-item on">我的</div></div>
  </div>
</div>`

const TODAY_TPL = `
<div class="screen">
  <div class="statusbar"><span>9:41</span><span>▮▮▮</span></div>
  <div class="pad">
    <div style="display:flex;justify-content:space-between;align-items:flex-start">
      <div>
        <h1 class="h1" style="margin-bottom:10px">3 月 12 日 · 周三</h1>
        <div style="font-size:14px"><strong style="color:#FF7A1A">Lv.08</strong> <span class="muted">680 / 800 XP · 微光段位</span></div>
      </div>
      <div style="background:#EEF0F4;border-radius:999px;padding:6px 12px;font-size:12px;color:#5F6773">⇄ 换模式</div>
    </div>
    <div class="card-dark" style="margin-top:16px">
      <div style="display:flex;justify-content:space-between"><span class="card-kicker">旅者 · 第一阶段</span><span class="card-kicker">第 3 / 7 天</span></div>
      <div class="card-quote">走多远，算多远</div>
      <div class="soul">100 <em>/ 120</em></div>
      <div style="height:2px;background:#2A3A32;border-radius:1px;margin-top:14px;overflow:hidden"><div style="height:100%;width:83%;background:#287D68"></div></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin:22px 0 6px">
      <div style="font-size:16px;font-weight:700;color:#FF7A1A">今日任务</div>
      <div class="muted">已完成 2 项 · 还剩 1 项</div>
    </div>
    <div class="task"><div class="check"></div><div style="flex:1"><div class="task-title">跟读复述 1 段</div><div class="task-meta">20 分钟 · +40 XP · +10 魂火</div></div><button class="btn-start">开始</button></div>
    <div class="task"><div class="check done"></div><div style="flex:1"><div class="task-title" style="color:#B6BCC7;text-decoration:line-through">背诵 20 个生词</div><div class="task-meta">15 分钟 · +20 XP · +5 魂火</div></div></div>
    <div class="task"><div class="check done"></div><div style="flex:1"><div class="task-title" style="color:#B6BCC7;text-decoration:line-through">精听 BBC 6 Minute</div><div class="task-meta">25 分钟 · +40 XP · +10 魂火</div></div></div>
    <div class="nav"><div class="nav-item on">今日</div><div class="nav-item">目标</div><div class="nav-item">成长</div><div class="nav-item">我的</div></div>
  </div>
</div>`

const BLOCKS = [
  { id: 'h1', label: '大标题', content: '<h1 class="h1">标题文字</h1>' },
  { id: 'row', label: '设置行', content: '<div class="row-card"><div><div class="row-title">标题</div><div class="row-desc">说明文字</div></div><div class="chev">›</div></div>' },
  { id: 'group', label: '分组标题', content: '<div class="group-label">分组</div>' },
  { id: 'card', label: '深色卡片', content: '<div class="card-dark" style="margin:12px 0"><div class="card-kicker">旅者 · 第一阶段</div><div class="card-quote">一句箴言</div><div class="soul">100 <em>/ 120</em></div></div>' },
  { id: 'task', label: '任务行', content: '<div class="task"><div class="check"></div><div style="flex:1"><div class="task-title">新任务</div><div class="task-meta">20 分钟 · +40 XP</div></div><button class="btn-start">开始</button></div>' },
  { id: 'text', label: '文本', content: '<div style="font-size:15px;color:#16181D;margin:8px 0">一段文字</div>' },
]

export default function EditorPage() {
  const hostRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<Editor | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!hostRef.current || editorRef.current) return
    const editor = grapesjs.init({
      container: hostRef.current,
      height: '100%',
      width: 'auto',
      fromElement: false,
      storageManager: false,
      canvas: { styles: [], scripts: [] },
      deviceManager: {
        devices: [{ id: 'phone', name: '手机 390', width: '390px' }],
      },
      blockManager: {
        appendTo: '#gjs-blocks',
        blocks: BLOCKS.map((b) => ({ id: b.id, label: b.label, content: b.content, category: '区块' })),
      },
      styleManager: { appendTo: '#gjs-styles' },
      selectorManager: { appendTo: '#gjs-selectors' },
      traitManager: { appendTo: '#gjs-traits' },
    })

    const injectBase = () => {
      try {
        const doc = editor.Canvas.getDocument()
        if (doc && !doc.getElementById('phone-base')) {
          const s = doc.createElement('style')
          s.id = 'phone-base'
          s.textContent = PHONE_BASE
          doc.head.appendChild(s)
        }
      } catch {
        /* ignore */
      }
    }

    editor.Commands.add('load-me', {
      run() {
        editor.setComponents(ME_TPL)
        injectBase()
      },
    })
    editor.Commands.add('load-today', {
      run() {
        editor.setComponents(TODAY_TPL)
        injectBase()
      },
    })
    editor.Commands.add('export-html', {
      run() {
        const html = editor.getHtml()
        const extra = editor.getCss() || ''
        const full = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${PHONE_BASE}\n${extra}</style></head><body>${html}</body></html>`
        const blob = new Blob([full], { type: 'text/html' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = 'cinis-page.html'
        a.click()
        URL.revokeObjectURL(a.href)
      },
    })

    editor.on('load', () => {
      editor.setComponents(ME_TPL)
      editor.setDevice('phone')
      injectBase()
      setReady(true)
    })
    editor.on('canvas:frame:load', injectBase)

    editorRef.current = editor
    return () => {
      editor.destroy()
      editorRef.current = null
    }
  }, [])

  const run = (cmd: string) => editorRef.current?.runCommand(cmd)

  return (
    <div className={styles.wrap}>
      <header className={styles.topbar}>
        <a className={styles.back} href="#me">
          ‹ 返回原型
        </a>
        <span className={styles.title}>CINIS · 可视化编辑</span>
        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={() => run('load-me')}>
            载入「我的」
          </button>
          <button type="button" className={styles.btnGhost} onClick={() => run('load-today')}>
            载入「今日」
          </button>
          <button type="button" className={styles.btnExport} onClick={() => run('export-html')}>
            导出 HTML
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.left}>
          <div className={styles.asideTitle}>区块（拖到画布）</div>
          <div id="gjs-blocks" className={styles.blocks} />
        </aside>

        <main className={styles.center}>
          <div className={styles.tip}>双击文字直接改 · 选中元素后右侧调样式</div>
          <div className={styles.canvasScroll}>
            <div className={styles.phoneFrame}>
              <div className={styles.gjsHost} ref={hostRef} />
            </div>
          </div>
        </main>

        <aside className={styles.right}>
          <div className={styles.asideTitle}>样式</div>
          <div id="gjs-selectors" className={styles.selectors} />
          <div id="gjs-styles" className={styles.stylesPanel} />
          <div id="gjs-traits" className={styles.traits} />
        </aside>
      </div>

      {!ready && <div className={styles.loading}>编辑器加载中…</div>}
    </div>
  )
}
