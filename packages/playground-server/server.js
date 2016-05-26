'use strict'

const app        = require('koa')()
const bodyParser = require('koa-bodyparser')
const lib        = require('playground-lib')
const path       = require('path')
const serve      = require('koa-static')
const singleton  = require('playground-singleton')
const router     = require('koa-router')()

module.exports = function makeApp() {
  router.get('/', function *(next) {
    console.log('GET /')
    this.redirect('/index.html')
  })

  router.post('/event', function *(next) {
    console.log('POST /event')
    console.log(this.request.body)
    this.body = this.request.body
  })

  router.get('/error', function *(next) {
    console.log('GET /error')
    throw new Error('I promise I am expected.')
  })

  router.get('/inc', function *(next) {
    singleton.inc()
    this.body = {val: singleton.get()}
  })

  router.get('/dec', function *(next) {
    singleton.dec()
    this.body = {val: singleton.get()}
  })

  router.post('/mutate', function *(next) {
    this.body = {val: lib.mutateAndGet(this.request.body.val)}
  })

  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.use(serve(path.join(__dirname, 'scripts')))
  app.use(serve(path.join(__dirname, 'views')))
  return app;
}
