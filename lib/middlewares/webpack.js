const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')

module.exports = () => {
  const compiler = webpack(webpackConfig)
  const middleware = webpackDevMiddleware(compiler)

  return async(ctx, next) => {
    await new Promise((resolve, reject) => {
      middleware.waitUntilValid(() => {
        resolve(true)
      })

      compiler.plugin('failed', (error) => {
        reject(error)
      })
    })
    await middleware(ctx.req, {
      end: (content) => {
        ctx.body = content
      },
      setHeader: ctx.set.bind(ctx),
      locals: ctx.state
    }, next)
  }
}
