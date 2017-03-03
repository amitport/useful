const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const compose = require('koa-compose')

module.exports = function (apiRouters) {
  const router = new Router({prefix: '/api'})

  router.use(bodyParser())
  router.use(...(apiRouters
                  .map(_ => [_.routes(), _.allowedMethods()])
                  .reduce(((combined, partial) => combined.concat(partial)), [])))
  const middleware = compose([router.routes(), router.allowedMethods()])
  middleware._name = 'apiRoutes'
  return middleware
}
