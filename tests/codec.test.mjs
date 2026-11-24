import test from 'node:test'
import assert from 'node:assert/strict'
import { emptyState } from '../src/domain/engine.ts'
import { decodeState } from '../src/domain/codec.ts'
test('valid state roundtrips; malformed storage cannot reach the engine', () => {
  const s = emptyState()
  assert.deepEqual(decodeState(JSON.parse(JSON.stringify(s))), s)
  for (const bad of [
    null,
    {},
    { ...s, plans: [] },
    { ...s, goals: [{}] },
    { ...s, session: { status: 'running' } },
    { ...s, reminder: { ...s.reminder, reminderTime: '99:99' } },
  ])
    assert.equal(decodeState(bad), null)
})
