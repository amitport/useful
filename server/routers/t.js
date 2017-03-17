const Router = require('koa-router')

module.exports = new Router({prefix: '/xx'})
  .get('/', (ctx) => {
    ctx.body = [1, 3]
  })
