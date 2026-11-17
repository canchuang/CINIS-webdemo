import { useCallback, useEffect, useState } from 'react'
import styles from './App.module.css'
import { BottomNav } from './components/BottomNav'
import { Screen } from './components/Screen'
import type { RouteKey } from './data/routes'
import { TABS, type TabKey } from './data/tabs'
import type { GameMode } from './data/content'
import { AchievementsPage } from './pages/AchievementsPage'
import { AbyssRestartPage } from './pages/AbyssRestartPage'
import { AbyssTerminalPage } from './pages/AbyssTerminalPage'
import { CharacterFilePage } from './pages/CharacterFilePage'
import { ChooseModeSheet } from './pages/ChooseModeSheet'
import { FocusPage } from './pages/FocusPage'
import { GoalDetailPage } from './pages/GoalDetailPage'
import { GoalEditPage } from './pages/GoalEditPage'
import { GoalsPage } from './pages/GoalsPage'
import { GrowthPage } from './pages/GrowthPage'
import { HistoryPage } from './pages/HistoryPage'
import { KnightRecoverPage } from './pages/KnightRecoverPage'
import { KnightTerminalPage } from './pages/KnightTerminalPage'
import { MePage } from './pages/MePage'
import { OnboardingPage } from './pages/OnboardingPage'
import { PrivacyPage } from './pages/PrivacyPage'
import EditorPage from './pages/EditorPage'
import { annotations } from './data/annotations'
import { TrialConfirmPage } from './pages/TrialConfirmPage'
import { NewGoalPage } from './pages/NewGoalPage'
import { taskStore } from './data/taskStore'
import { RekindlePage } from './pages/RekindlePage'
import { ReminderPage } from './pages/ReminderPage'
import { RoleSelectPage } from './pages/RoleSelectPage'
import { SettlePage } from './pages/SettlePage'
import { SplashPage } from './pages/SplashPage'
import { TaskDonePage } from './pages/TaskDonePage'
import { StageProgressPage } from './pages/StageProgressPage'
import { ComebackPage } from './pages/ComebackPage'
import { TerminalPage } from './pages/TerminalPage'
import { TodayPage } from './pages/TodayPage'

/** 主 tab 页对应的路由，用来判断底部导航高亮 */
const TAB_OF: Partial<Record<RouteKey, TabKey>> = {
  today: 'today',
  goals: 'goals',
  growth: 'growth',
  me: 'me',
}

/** 哪些页面显示底部导航 */
const WITH_NAV: RouteKey[] = ['today', 'goals', 'growth', 'me']

export default function App() {
  // 支持用 #route 直接打开某页，便于演示和截图
  const initial = (): RouteKey => {
    const h = window.location.hash.replace('#', '')
    const allowed: RouteKey[] = [
      'splash', 'roles', 'onboarding', 'today', 'goals', 'goalDetail', 'goalEdit',
      'growth', 'me', 'taskDetail', 'focus', 'taskDone', 'settle', 'terminal',
      'rekindle', 'achievements', 'characterFile', 'history', 'reminderSettings', 'privacy', 'trialConfirm', 'newGoal', 'stageProgress', 'comeback', 'editor',
    ]
    return (allowed as string[]).includes(h) ? (h as RouteKey) : 'splash'
  }
  const [route, setRoute] = useState<RouteKey>(initial)
  const [sheet, setSheet] = useState(false)
  const [, setStack] = useState<RouteKey[]>([])
  const [mode, setMode] = useState<GameMode>('traveler')

  const go = useCallback((next: RouteKey) => {
    setStack((prev) => [...prev, route])
    setSheet(false)
    setRoute(next)
  }, [route])

  const back = useCallback(() => {
    setStack((prev) => {
      if (prev.length === 0) {
        setRoute('today')
        return prev
      }
      const copy = [...prev]
      const target = copy.pop()!
      setRoute(target)
      return copy
    })
    setSheet(false)
  }, [])

  // 浏览器返回键支持
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      e.preventDefault()
      back()
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [back])

  // 监听 hash 变化，支持用 #route 直接跳转/刷新某页
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#', '') as RouteKey
      if (h) setRoute(h)
    }
    window.addEventListener('hashchange', onHash)
    onHash()
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const tab = TAB_OF[route] ?? 'today'

  // 可视化编辑器是全屏独立页，不套手机外壳
  if (route === 'editor') {
    return <EditorPage />
  }

  const renderPage = () => {
    switch (route) {
      case 'splash':
        return <SplashPage onStart={() => go('roles')} />
      case 'roles':
        return (
          <RoleSelectPage
            onConfirm={(picked) => {
              setMode(picked)
              go('newGoal')
            }}
          />
        )
      case 'onboarding':
        return <OnboardingPage onBack={back} onNext={() => setRoute('today')} />
      case 'today':
        return (
          <TodayPage
            mode={mode}
            onStartTask={(taskId) => {
              taskStore.setFocusing(taskId)
              setSheet(true)
            }}
            onSwitchMode={() => go('roles')}
          />
        )
      case 'goals':
        return <GoalsPage onOpen={() => go('goalDetail')} onNew={() => go('newGoal')} />
      case 'goalDetail':
        return (
          <GoalDetailPage
            onBack={back}
            onEdit={() => go('goalEdit')}
            onEnter={() => go('focus')}
          />
        )
      case 'goalEdit':
        return <GoalEditPage onBack={back} onSave={back} />
      case 'growth':
        return (
          <GrowthPage
            onOpenCharacter={() => go('characterFile')}
            onOpenAchievements={() => go('achievements')}
          />
        )
      case 'me':
        return <MePage onNavigate={(r) => go(r as RouteKey)} />
      case 'focus':
        return (
          <FocusPage
            mode={mode}
            onBack={back}
            onFinish={() => {
              const id = taskStore.getFocusing()
              if (id) taskStore.markDone(mode, id)
              // 结束并结算 -> 阶段结算页
              go('settle')
            }}
            onGiveUp={() => go('terminal')}
          />
        )
      case 'taskDone':
        return (
          <TaskDonePage
            onBack={back}
            onNext={() => setRoute('today')}
            onHome={() => setRoute('today')}
          />
        )
      case 'settle':
        return (
          <SettlePage
            mode={mode}
            onContinue={() => setRoute('today')}
            onSkip={() => setRoute('today')}
            onViewProgress={() => go('stageProgress')}
            onBackHome={() => setRoute('today')}
          />
        )
      case 'terminal':
        if (mode === 'knight') {
          return (
            <KnightTerminalPage
              onBack={back}
              onChangeMode={() => go('roles')}
              onRecover={() => go('rekindle')}
            />
          )
        }
        if (mode === 'abyss') {
          return (
            <AbyssTerminalPage
              onBack={back}
              onChangeMode={() => go('roles')}
              onRestart={() => go('rekindle')}
            />
          )
        }
        return (
          <TerminalPage
            onBack={back}
            onChangeMode={() => go('roles')}
            onContinue={() => setRoute('today')}
          />
        )
      case 'rekindle':
        if (mode === 'knight') {
          return (
            <KnightRecoverPage
              onBack={back}
              onRest={() => setRoute('today')}
              onAccept={() => setRoute('today')}
            />
          )
        }
        if (mode === 'abyss') {
          return (
            <AbyssRestartPage
              onBack={back}
              onAnother={() => setRoute('today')}
              onFromAshes={() => setRoute('today')}
            />
          )
        }
        return (
          <RekindlePage
            onBack={back}
            onChangeMode={() => go('roles')}
            onIgnite={() => setRoute('today')}
          />
        )
      case 'achievements':
        return <AchievementsPage onBack={back} />
      case 'characterFile':
        return <CharacterFilePage onBack={back} />
      case 'history':
        return <HistoryPage onBack={back} />
      case 'reminderSettings':
        return <ReminderPage onBack={back} />
      case 'privacy':
        return <PrivacyPage onBack={back} />
      case 'comeback':
        return <ComebackPage onBack={back} onRestart={() => setRoute('today')} />
      case 'stageProgress':
        return (
          <StageProgressPage
            mode={mode}
            onBack={back}
            onSettings={() => go('goalEdit')}
            onGoTasks={() => setRoute('today')}
          />
        )
      case 'trialConfirm':
        return (
          <TrialConfirmPage
            mode={mode}
            onBack={back}
            onChangeMode={() => go('roles')}
            onConfirm={() => setRoute('today')}
          />
        )
      case 'newGoal':
        return (
          <NewGoalPage
            onBack={back}
            onNext={() => go('trialConfirm')}
            onOpenReminder={() => go('reminderSettings')}
          />
        )
      default:
        return null
    }
  }

  const isImmersive = [
    'splash',
    'roles',
    'onboarding',
    'focus',
    'settle',
    'trialConfirm',
    'newGoal',
  ].includes(route)

  const anno = annotations[route]

  return (
    <div className={styles.stage}>
      {/* 左：手机预览 */}
      <div className={styles.previewArea}>
        <div className={`${styles.phone} ${isImmersive ? styles.immersive : ''}`}>
          {isImmersive ? (
            <div key={route} className={styles.fullBleed}>
              {renderPage()}
            </div>
          ) : (
            <Screen withNav={WITH_NAV.includes(route)}>
              <div key={route} className={styles.pageEnter}>
                {renderPage()}
              </div>
              {WITH_NAV.includes(route) && (
                <BottomNav active={tab} onChange={(t) => setRoute(t)} />
              )}
              {sheet && (
                <ChooseModeSheet
                  onClose={() => setSheet(false)}
                  onFocus={() => go('focus')}
                  onQuick={() => {
                    const id = taskStore.getFocusing()
                    if (id) taskStore.quickCheckin(mode, id)
                    setSheet(false)
                    setRoute('today')
                  }}
                />
              )}
            </Screen>
          )}
        </div>
      </div>

      {/* 右：内容与功能标注 */}
      <aside className={styles.panel}>
        <div className={styles.panelInner}>
          <span className={styles.panelStage}>{anno.stage}</span>
          <h2 className={styles.panelTitle}>{anno.title}</h2>

          <section className={styles.panelSection}>
            <h3 className={styles.sectionLabel}>本页内容</h3>
            <ul className={styles.panelList}>
              {anno.content.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          {anno.actions.length > 0 && (
            <section className={styles.panelSection}>
              <h3 className={styles.sectionLabel}>可交互</h3>
              <ul className={`${styles.panelList} ${styles.actionList}`}>
                {anno.actions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          )}

          <p className={styles.panelHint}>提示：左侧可直接点击操作，右侧会随页面自动更新。</p>
        </div>
      </aside>
    </div>
  )
}

// 暴露给 TABS 的类型使用，避免未使用告警
void TABS










