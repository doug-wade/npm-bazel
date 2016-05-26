import test from 'ava'
import l from '.'
import s from 'playground-singleton'

test.beforeEach('set the state to zero', () => {
  s.set(0)
})

test(t => {
  t.is(0, l.mutateAndGet(0), 'mutates zero')
})

test(t => {
  t.is(2, l.mutateAndGet(2), 'mutates positive numbers')
})

test(t => {
  t.is(-42, l.mutateAndGet(-42), 'mutates negative numbers')
})
