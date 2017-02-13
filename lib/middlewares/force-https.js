module.exports = function forceHttps ({httpsPort}) {
  return function forceHttps (ctx, next) {
    if (ctx.protocol !== 'https') {
      ctx.redirect(`http://${ctx.hostname}${httpsPort ? `:${httpsPort}` : ''}${ctx.url}`)
    } else {
      return next()
    }
  }
}
