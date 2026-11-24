import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import styles from './App.module.css'
import { BottomNav } from './components/BottomNav'
import { Screen } from './components/Screen'
import type { RouteKey } from './data/routes'
import { TABS, type TabKey } from './data/tabs'

import { AchievementsPage } from './pages/AchievementsPage'
import { CharacterFilePage } from './pages/CharacterFilePage'
import { ChooseModeSheet } from './pages/ChooseModeSheet'
import { FocusPage } from './pages/FocusPage'
import { GoalDetailPage } from './pages/GoalDetailPage'
import { GoalEditPage } from './pages/GoalEditPage'
import { GoalsPage } from './pages/GoalsPage'
import { GrowthPage } from './pages/GrowthPage'
import { HistoryPage } from './pages/HistoryPage'
import { MePage } from './pages/MePage'
import { OnboardingPage } from './pages/OnboardingPage'
import { PrivacyPage } from './pages/PrivacyPage'
const EditorPage = lazy(() => import('./pages/EditorPage'))
import { TrialConfirmPage } from './pages/TrialConfirmPage'
import { NewGoalPage } from './pages/NewGoalPage'
import { taskStore } from './data/taskStore'
import { appStore, useAppState, startStateLifecycle } from './data/appStore'
import { startReminderDelivery } from './data/reminderDelivery'
import type { GoalDraft } from './domain/engine'
import { ReminderPage } from './pages/ReminderPage'
import { RoleSelectPage } from './pages/RoleSelectPage'
import { SettlePage } from './pages/SettlePage'
import { SplashPage } from './pages/SplashPage'
import { TaskDonePage } from './pages/TaskDonePage'
import { StageProgressPage } from './pages/StageProgressPage'
import { ComebackPage } from './pages/ComebackPage'
const ModalBgEditorPage = lazy(() => import('./pages/ModalBgEditorPage'))
const NavBarEditorPage = lazy(() => import('./pages/NavBarEditorPage'))
const CardFxEditorPage = lazy(() => import('./pages/CardFxEditorPage'))
const CharSizeEditorPage = lazy(() => import('./pages/CharSizeEditorPage'))

/** 各模式强调色（按钮/选中态） */
const MODE_ACCENT: Record<import('./domain/engine').Mode, string> = {
  traveler: '#2E7D5B',
  knight: '#3B6FF5',
  abyss: '#7C3AED',
}
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
      'splash',
      'roles',
      'onboarding',
      'today',
      'goals',
      'goalDetail',
      'goalEdit',
      'growth',
      'me',
      'taskDetail',
      'focus',
      'taskDone',
      'settle',
      'terminal',
      'rekindle',
      'achievements',
      'characterFile',
      'history',
      'reminderSettings',
      'privacy',
      'trialConfirm',
      'newGoal',
      'stageProgress',
      'comeback',
      'modalBgEditor',
      'navBarEditor',
      'cardFxEditor',
      'charSizeEditor',
      'editor',
    ]
    return (allowed as string[]).includes(h) ? (h as RouteKey) : 'splash'
  }
  const [route, setRoute] = useState<RouteKey>(initial)
  const [sheet, setSheet] = useState(false)
  const [, setStack] = useState<RouteKey[]>([])
  const state = useAppState()
  const mode = state.mode
  const [goalId, setGoalId] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('cinis:selected-goal')
    } catch {
      return null
    }
  })
  const [draft, setDraft] = useState<GoalDraft | null>(null)
  const [notice, setNotice] = useState('')
  useEffect(() => {
    const stop = startStateLifecycle()
    const reminders = startReminderDelivery()
    return () => {
      stop()
      reminders()
    }
  }, [])

  const go = useCallback(
    (next: RouteKey) => {
      setStack((prev) => [...prev, route])
      setSheet(false)
      window.history.pushState(null, '', `#${next}`)
      setRoute(next)
    },
    [route],
  )

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

  // Browser location changes select a route; they must not also pop the in-app stack.
  useEffect(() => {
    const onLocation = () => {
      const h = window.location.hash.slice(1) as RouteKey
      if (h) {
        setRoute(h)
        setSheet(false)
      }
    }
    window.addEventListener('popstate', onLocation)
    window.addEventListener('hashchange', onLocation)
    return () => {
      window.removeEventListener('popstate', onLocation)
      window.removeEventListener('hashchange', onLocation)
    }
  }, [])

  useEffect(() => {
    window.history.replaceState(null, '', `#${route}`)
  }, [route])
  useEffect(() => {
    try {
      if (goalId) sessionStorage.setItem('cinis:selected-goal', goalId)
    } catch {
      /* Optional navigation memory. */
    }
  }, [goalId])

  const tab = TAB_OF[route] ?? 'today'

  // 全屏独立页（编辑器），不套手机外壳
  if (route === 'editor') {
    return (
      <Suspense fallback={<p>正在打开编辑器…</p>}>
        <EditorPage />
      </Suspense>
    )
  }
  if (route === 'modalBgEditor') {
    return (
      <Suspense fallback={<p>正在打开编辑器…</p>}>
        <ModalBgEditorPage />
      </Suspense>
    )
  }
  if (route === 'navBarEditor') {
    return (
      <Suspense fallback={<p>正在打开编辑器…</p>}>
        <NavBarEditorPage />
      </Suspense>
    )
  }
  if (route === 'cardFxEditor') {
    return (
      <Suspense fallback={<p>正在打开编辑器…</p>}>
        <CardFxEditorPage />
      </Suspense>
    )
  }
  if (route === 'charSizeEditor') {
    return (
      <Suspense fallback={<p>正在打开编辑器…</p>}>
        <CharSizeEditorPage />
      </Suspense>
    )
  }

  const renderPage = () => {
    switch (route) {
      case 'splash':
        return <SplashPage onStart={() => go('roles')} />
      case 'roles':
        return (
          <RoleSelectPage
            onConfirm={(picked) => {
              try {
                appStore.setMode(picked)
                go('today')
              } catch (e) {
                setNotice((e as Error).message)
              }
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
              if (
                state.session?.task.id === taskId &&
                ['running', 'paused', 'due'].includes(state.session.status)
              )
                go('focus')
              else setSheet(true)
            }}
            onSwitchMode={() => go('roles')}
          />
        )
      case 'goals':
        return (
          <GoalsPage
            onOpen={(id) => {
              const goal = state.goals.find((g) => g.id === id)
              if (goal) {
                try {
                  appStore.setMode(goal.mode)
                  setGoalId(id)
                  go('goalDetail')
                } catch (e) {
                  setNotice((e as Error).message)
                }
              }
            }}
            onNew={() => go('newGoal')}
          />
        )
      case 'goalDetail':
        return (
          <GoalDetailPage
            goalId={goalId}
            onBack={back}
            onEdit={() => go('goalEdit')}
            onEnter={(id) => {
              taskStore.setFocusing(id)
              go('today')
              setSheet(true)
            }}
          />
        )
      case 'goalEdit':
        return (
          <GoalEditPage
            goalId={goalId}
            onBack={back}
            onSave={() => go('goals')}
          />
        )
      case 'growth':
        return (
          <GrowthPage
            mode={mode}
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
              if (appStore.settle()) go('taskDone')
              else {
                setNotice('本次会话已处理，不会重复结算。')
                go('today')
              }
            }}
            onGiveUp={() => {
              appStore.abandon()
              go('terminal')
            }}
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
      case 'rekindle':
        return (
          <TerminalPage
            mode={mode}
            onBack={() => setRoute('today')}
            onChangeMode={() => go('roles')}
            onContinue={() => setRoute('today')}
          />
        )
      case 'achievements':
        return <AchievementsPage onBack={back} />
      case 'characterFile':
        return <CharacterFilePage mode={mode} onBack={back} />
      case 'history':
        return <HistoryPage onBack={back} />
      case 'reminderSettings':
        return <ReminderPage onBack={back} />
      case 'privacy':
        return <PrivacyPage onBack={back} />
      case 'comeback':
        return (
          <ComebackPage onBack={back} onRestart={() => setRoute('today')} />
        )
      case 'stageProgress':
        return (
          <StageProgressPage
            mode={mode}
            onBack={back}
            onSettings={() => go('goals')}
            onGoTasks={() => setRoute('today')}
          />
        )
      case 'trialConfirm':
        return (
          <TrialConfirmPage
            mode={mode}
            draft={draft}
            onBack={back}
            onChangeMode={() => go('roles')}
            onConfirm={() => {
              if (draft) {
                try {
                  appStore.createGoal(draft)
                  setDraft(null)
                  setRoute('today')
                } catch (e) {
                  setNotice((e as Error).message)
                }
              } else setRoute('today')
            }}
          />
        )
      case 'newGoal':
        return (
          <NewGoalPage
            mode={mode}
            onBack={back}
            onNext={(value) => {
              setDraft(value)
              go('trialConfirm')
            }}
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

  return (
    <div className={styles.stage}>
      {(notice || appStore.getError()) && (
        <div className="appNotice" role="status" onClick={() => setNotice('')}>
          {notice || appStore.getError()}
        </div>
      )}
      <div
        className={`${styles.phone} ${isImmersive ? styles.immersive : ''}`}
        style={{ ['--mode-accent' as string]: MODE_ACCENT[mode] }}
      >
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
                mode={mode}
                onClose={() => setSheet(false)}
                onFocus={() => {
                  const id = taskStore.getFocusing()
                  if (id) {
                    try {
                      appStore.start(id)
                      go('focus')
                    } catch (e) {
                      setNotice((e as Error).message)
                      setSheet(false)
                    }
                  }
                }}
                onQuick={() => {
                  const id = taskStore.getFocusing()
                  if (id) {
                    try {
                      appStore.check(id, 'quick')
                    } catch (e) {
                      setNotice((e as Error).message)
                    }
                  }
                  setSheet(false)
                  setRoute('today')
                }}
              />
            )}
          </Screen>
        )}
      </div>
    </div>
  )
}

// 暴露给 TABS 的类型使用，避免未使用告警
void TABS
