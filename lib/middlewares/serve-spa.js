const Router = require('koa-router')

module.exports = function serveSpa (spaRoutes) {
  const middleware = new Router()
    .get(spaRoutes, (ctx) => {
      ctx.render('index')
    })
    .routes()
  middleware._name = 'serveSpa'
  return middleware
}
