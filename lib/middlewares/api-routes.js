const Router = require('koa-router')
const bodyParser = require('koa-bodyparser');

module.exports = function (apiRoutes) {
  const router = new Router()
  router.use(bodyParser())
  for (let apiRoute of apiRoutes) {
    router.use(apiRoute)
  }
  const middleware = router.routes()
  middleware._name = 'apiRoutes'
  return middleware
}
