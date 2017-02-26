const Router = require('koa-router')

module.exports = function serveSpa (spaRoutes) {
  const middleware = new Router()
    .get(spaRoutes, async (ctx, next) => {
      // simple rewrite to index.html
      const originalUrl = ctx.url
      ctx.url = 'index.html'
      await next();
      ctx.url = originalUrl;
    })
    .routes()
  middleware._name = 'serveSpa'
  return middleware
}
