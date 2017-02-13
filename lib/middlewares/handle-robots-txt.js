module.exports = function handleRobotsTxt (app) {
  const robotsTxt = `\
User-agent: *
Disallow: ${app.env === 'production' ? '' : '/'}
`

  return function handleRobotsTxt (ctx, next) {
    if (ctx.url === '/robots.txt') {
      ctx.body = robotsTxt
    } else {
      return next()
    }
  }
}
