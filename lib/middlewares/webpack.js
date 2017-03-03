const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')

module.exports = () => {
  const middleware = webpackDevMiddleware(webpack(webpackConfig), {noInfo: true})

  return (ctx, next) => {
    middleware(ctx.req, {
      end: (content) => {
        ctx.body = content
      },
      setHeader: ctx.set.bind(ctx),
      locals: ctx.state
    }, next)
  }
}
