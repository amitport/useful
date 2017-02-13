module.exports = function disableFrame () {
  return function disableFrame (ctx, next) {
    ctx.set('X-Frame-Options', 'DENY')
    return next()
  }
}
