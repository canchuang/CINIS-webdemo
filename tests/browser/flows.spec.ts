import { expect, test } from '@playwright/test'
const key = 'cinis:state:v3'
test('new goal, checkbox, history and growth persist across reload', async ({
  page,
}) => {
  await page.goto('/#goals')
  await page.getByRole('button', { name: '＋ 新建目标' }).click()
  await page.getByLabel('目标名称').fill('浏览器验收目标')
  await page.getByRole('button', { name: '下一步', exact: true }).click()
  await page.getByRole('button', { name: '确认，开始试炼' }).click()
  const done = page.getByRole('button', {
    name: '完成：浏览器验收目标',
    exact: true,
  })
  await done.click()
  await page.reload()
  await page.goto('/#today')
  await expect(
    page.getByRole('button', { name: '已完成：浏览器验收目标', exact: true }),
  ).toBeDisabled()
  await page.goto('/#growth')
  await expect(page.getByText('40 XP', { exact: true })).toBeVisible()
  await page.goto('/#history')
  await expect(page.getByText('浏览器验收目标', { exact: true })).toBeVisible()
  const state = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    key,
  )
  expect(
    state.goals.some((g: { title: string }) => g.title === '浏览器验收目标'),
  ).toBeTruthy()
  expect(state.completions).toHaveLength(1)
})
test('goal edits and reminder settings survive leaving and refreshing', async ({
  page,
}) => {
  await page.goto('/#goals')
  await page
    .getByRole('button')
    .filter({ has: page.getByRole('heading', { name: '精听 BBC 6 Minute' }) })
    .first()
    .click()
  await page.getByRole('button', { name: '编辑目标' }).click()
  await page.getByLabel('目标名称').fill('编辑后目标')
  await page.getByRole('button', { name: '保存修改' }).click()
  await page.reload()
  await expect(page.getByRole('heading', { name: '编辑后目标' })).toBeVisible()
  await page.goto('/#reminderSettings')
  await page.getByRole('button', { name: '07:30', exact: true }).click()
  // Time picker is independently covered by existing controls; cancel preserves selected preset.
  await page.getByRole('button', { name: '关闭', exact: true }).click()
  await page.reload()
  const stored = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    key,
  )
  expect(stored.reminder.reminderTime).toBe('07:30')
})
for (const mode of ['traveler', 'knight', 'abyss'])
  test(`${mode}: focus recovers after reload and enforces pause availability`, async ({
    page,
  }) => {
    await page.goto('/#today')
    await page.evaluate(
      ({ key, mode }) => {
        const s = JSON.parse(localStorage.getItem(key)!)
        s.mode = mode
        localStorage.setItem(key, JSON.stringify(s))
      },
      { key, mode },
    )
    await page.reload()
    await page
      .getByText(mode === 'abyss' ? '整理错题本' : '精听 BBC 6 Minute', {
        exact: true,
      })
      .first()
      .click()
    await page.getByRole('button', { name: /点火专注/ }).click()
    await expect(page.getByRole('timer')).toBeVisible()
    await page.reload()
    if (mode === 'abyss')
      await expect(
        page.getByRole('button', { name: '暂停', exact: true }),
      ).toHaveCount(0)
    else {
      await page.getByRole('button', { name: '暂停', exact: true }).click()
      await page.getByRole('button', { name: '继续', exact: true }).click()
      if (mode === 'knight')
        await expect(
          page.getByRole('button', { name: '暂停', exact: true }),
        ).toBeDisabled()
    }
    await expect(
      page.getByRole('button', { name: '计时完成后结算' }),
    ).toBeDisabled()
  })
test('no broken scene or character requests on main pages', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  for (const route of [
    'today',
    'goals',
    'growth',
    'characterFile',
    'achievements',
    'history',
    'me',
  ]) {
    await page.goto('/#' + route)
    await expect(page.locator('#root')).not.toBeEmpty()
    const broken = await page
      .locator('img')
      .evaluateAll((imgs) =>
        imgs
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.src),
      )
    expect(broken).toEqual([])
  }
  expect(errors).toEqual([])
})
