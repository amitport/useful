const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const combineRouters = require('koa-combine-routers')

module.exports = function (apiRouters) {
  const router = new Router({prefix: '/api'})
  router.use(bodyParser())
  router.use(combineRouters(apiRouters))
  const middleware = router.routes()
  middleware._name = 'apiRoutes'
  return middleware
}
