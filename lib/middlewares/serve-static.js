const send = require('koa-send')

module.exports = function serveStatic (roots) {
  return async function serveStatic (ctx, next) {
    if (ctx.method === 'HEAD' || ctx.method === 'GET') {
      for (let root of roots) {
        if (await send(ctx, ctx.path, {root})) {
          return next()
        }
      }
    }
    return next()
  }
}
