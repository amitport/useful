const koaCash = require('koa-cash')
const cache = require('lru-cache')(1000)
const convert = require('koa-convert')

module.exports = {
  negotiate () {
    const middleware = convert(koaCash({
      get: key => cache.get(key),
      set: (key, value) => cache.set(key, value)
    }))
    middleware._name = 'negotiateCache'
    return middleware
  },
  serveIfFound () {
    return async function serveFromCacheIfFound (ctx, next) {
      if (await ctx.cashed()) {
        return
      }
      return next()
    }
  }
}
