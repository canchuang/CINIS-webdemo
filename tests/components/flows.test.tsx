import React from 'react'
import { beforeEach, afterEach, expect, test, vi } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
let store: (typeof import('../../src/data/appStore'))['appStore']
let user: ReturnType<typeof userEvent.setup>
beforeEach(async () => {
  localStorage.clear()
  sessionStorage.clear()
  window.location.hash = '#today'
  vi.resetModules()
  HTMLElement.prototype.scrollTo = function (opts: ScrollToOptions | number) {
    if (typeof opts === 'object') this.scrollTop = opts.top ?? 0
  }
  store = (await import('../../src/data/appStore')).appStore
  user = userEvent.setup()
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
async function mount(route = 'today') {
  window.location.hash = '#' + route
  const App = (await import('../../src/App')).default
  return render(<App />)
}
test('create goal, check task, reload store and render truthful growth/history', async () => {
  await mount('goals')
  await user.click(screen.getByRole('button', { name: '＋ 新建目标' }))
  await user.type(screen.getByLabelText('目标名称'), '组件验收目标')
  await user.click(screen.getByRole('button', { name: '下一步', exact: true }))
  await user.click(screen.getByRole('button', { name: '确认，开始试炼' }))
  await user.click(
    screen.getByRole('button', { name: '完成：组件验收目标', exact: true }),
  )
  expect(store.getSnapshot().completions).toHaveLength(1)
  cleanup()
  vi.resetModules()
  store = (await import('../../src/data/appStore')).appStore
  await mount('growth')
  expect(screen.getByText('40 XP', { exact: true })).toBeTruthy()
  cleanup()
  await mount('history')
  expect(screen.getByText('组件验收目标', { exact: true })).toBeTruthy()
})
test('editing goal persists and reminder time survives reinitialization', async () => {
  await mount('goals')
  await user.click(
    screen
      .getAllByRole('button')
      .find((b) => b.textContent?.includes('精听 BBC 6 Minute'))!,
  )
  await user.click(screen.getByRole('button', { name: '编辑目标' }))
  const input = screen.getByLabelText('目标名称')
  await user.clear(input)
  await user.type(input, '修改后的目标')
  await user.click(screen.getByRole('button', { name: '保存修改' }))
  expect(
    store.getSnapshot().goals.some((g) => g.title === '修改后的目标'),
  ).toBe(true)
  cleanup()
  await mount('reminderSettings')
  await user.click(screen.getByRole('button', { name: '07:30', exact: true }))
  await user.click(screen.getByRole('button', { name: '关闭', exact: true }))
  cleanup()
  vi.resetModules()
  store = (await import('../../src/data/appStore')).appStore
  expect(store.getSnapshot().reminder.reminderTime).toBe('07:30')
})
for (const mode of ['traveler', 'knight', 'abyss'] as const)
  test(`${mode}: focus refresh and pause rule match UI`, async () => {
    store.setMode(mode)
    const task = store.tasks(mode)[0]
    store.start(task.id)
    await mount('focus')
    expect(screen.getByRole('timer')).toBeTruthy()
    expect(
      screen
        .getByRole('button', { name: '计时完成后结算' })
        .hasAttribute('disabled'),
    ).toBe(true)
    if (mode === 'abyss')
      expect(
        screen.queryByRole('button', { name: '暂停', exact: true }),
      ).toBeNull()
    else {
      await user.click(
        screen.getByRole('button', { name: '暂停', exact: true }),
      )
      expect(store.getSnapshot().session?.status).toBe('paused')
      await user.click(
        screen.getByRole('button', { name: '继续', exact: true }),
      )
      if (mode === 'knight')
        expect(
          screen
            .getByRole('button', { name: '暂停', exact: true })
            .hasAttribute('disabled'),
        ).toBe(true)
    }
    cleanup()
    vi.resetModules()
    store = (await import('../../src/data/appStore')).appStore
    await mount('focus')
    expect(store.getSnapshot().session?.task.id).toBe(task.id)
    const due = store.getSnapshot().session!.deadlineAt + 1
    vi.spyOn(Date, 'now').mockReturnValue(due)
    act(() => store.reconcile())
    await user.click(
      screen.getByRole('button', { name: '确认完成', exact: true }),
    )
    expect(store.getSnapshot().completions).toHaveLength(1)
    expect(store.getSnapshot().completions[0].task.id).toBe(task.id)
  })
test('valid legacy goals/reminders migrate; undated done state is backed up', async () => {
  cleanup()
  vi.resetModules()
  localStorage.clear()
  localStorage.setItem(
    'cinis:goals',
    JSON.stringify({
      v: 1,
      data: [
        {
          id: 'legacy',
          title: '原目标',
          mode: '骑士',
          status: '进行中',
          scheduledDays: [true, true, true, true, true, true, true],
          dailyTasks: 2,
        },
      ],
    }),
  )
  localStorage.setItem(
    'cinis:reminder',
    JSON.stringify({
      v: 1,
      data: {
        enabled: true,
        reminderTime: '07:45',
        weekdays: Array(7).fill(true),
      },
    }),
  )
  localStorage.setItem(
    'cinis:demo-state',
    JSON.stringify({
      v: 2,
      mode: 'knight',
      store: { done: { knight: ['t1'] } },
    }),
  )
  store = (await import('../../src/data/appStore')).appStore
  expect(store.getSnapshot().goals[0].title).toBe('原目标')
  expect(store.getSnapshot().reminder.reminderTime).toBe('07:45')
  expect(store.getSnapshot().legacy['cinis:demo-state']).toBeTruthy()
  expect(store.getSnapshot().completions).toHaveLength(0)
})
test('goal progress belongs to its own tasks rather than the whole mode', async () => {
  const tasks = store.tasks('traveler')
  store.check(tasks[0].id, 'check')
  await mount('goals')
  const cards = screen
    .getAllByRole('button')
    .filter((b) => b.textContent?.includes('旅者 · 每周'))
  expect(
    cards.find((b) => b.textContent?.includes(tasks[0].title))?.textContent,
  ).toContain('100%')
  expect(
    cards.find((b) => b.textContent?.includes(tasks[1].title))?.textContent,
  ).toContain('0%')
})
