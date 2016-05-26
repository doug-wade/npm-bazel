import test from 'ava'
import request from 'supertest-as-promised'
import makeApp from './server'
import s from 'playground-singleton'

test.beforeEach('set the state to zero', () => {
  s.set(0)
})

test('/error:error', async t => {
  const res = await request(makeApp().listen())
    .get('/error')

  t.is(res.status, 500)
})

test('/:success', async t => {
  const res = await request(makeApp().listen())
    .get('/')

  t.is(res.status, 302)
})

test('/index.html:success', async t => {
  t.plan(3)
  const res = await request(makeApp().listen())
    .get('/index.html')

  t.is(res.status, 200)
  t.is(res.header['content-type'], 'text/html; charset=utf-8')
  t.true(res.text.includes('<h1>Index.html</h1>'))
})

test('/inc:success', async t => {
  t.plan(2)
  const res = await request(makeApp().listen())
    .get('/inc')

  t.is(res.status, 200)
  t.is(res.body.val, 1)
})

test('/dec:success', async t => {
  t.plan(2)
  const res = await request(makeApp().listen())
    .get('/dec')

  t.is(res.status, 200)
  t.is(res.body.val, 0)
})

test('/mutate:success', async t => {
  t.plan(2)
  const res = await request(makeApp().listen())
    .post('/mutate')
    .send({ val: 42 })

  t.is(res.status, 200)
  t.is(res.body.val, 42)
})
