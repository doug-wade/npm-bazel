import test from 'ava'
import s from '.'

test.beforeEach('set the state to zero', () => {
	s.set(0)
});

test(t => {
  t.is(0, s.get(), 'starts at zero')
})

test(t => {
  s.inc()
  t.is(1, s.get(), 'inc increments by one')
})

test(t => {
  s.dec()
  t.is(-1, s.get(), 'dec decrements by one')
})

test(t => {
  s.inc()
  s.dec()
  t.is(0, s.get(), 'inc then dec is idempotent')
})

test(t => {
	s.inc()
	s.inc()
	t.is(2, s.get(), 'singleton maintains state between calls')
})
