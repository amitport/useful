const Koa = require('koa')
const http = require('http')
const defaults = require('defaults')

const _forceHttps = require('./middlewares/force-https')
const _apiRoutes = require('./middlewares/api-routes')
const disableFrame = require('./middlewares/disable-frame')
const handleRobotsTxt = require('./middlewares/handle-robots-txt')
const serveStatic = require('./middlewares/serve-static')
const cache = require('./middlewares/cache')
const serveSpa = require('./middlewares/serve-spa')

const conditionalGet = require('koa-conditional-get')
const nativeTemplateRender = require('./native-template-render')

const logger = require('koa-logger')
const saneWs = require('./sane-web-socket')
const webpack = require('./middlewares/webpack')

// default ENV is DEBUG=koa*,-koa-router;NODE_ENV=development
class UsefulHttp extends Koa {
  constructor (options) {
    super()

    const {
      log,
      port,
      wsMessageSets,
      apiRouters,
      enableCacheAndZip,
      dynamicTemplatesRoot,
      forceHttps,
      runningBehindReverseProxy,
      serveApp,
      spaRoutes
    } = defaults(options, {
      log: {info: console.log.bind(console)},
      port: 5000,
      wsMessageSets: false,
      apiRouters: false,
      enableCacheAndZip: this.env !== 'development',
      dynamicTemplatesRoot: './views',
      forceHttps: false,
      runningBehindReverseProxy: false,
      serveApp: this.env !== 'development' ? serveStatic(['./client/build']) : webpack(),
      spaRoutes: ['/', '/index.html']
    })
    Object.assign(this, {log, wsMessageSets, port})

    if (runningBehindReverseProxy) {
      this.proxy = true
    }

    this.context.render = nativeTemplateRender({
      root: dynamicTemplatesRoot,
      enableCache: enableCacheAndZip
    })

    this
      .useIf(forceHttps ? _forceHttps(forceHttps) : false)
      .use(disableFrame())
      .use(handleRobotsTxt(this))
      .use(logger())
      .use(conditionalGet())
      .use(serveSpa(spaRoutes))
      .useIf(apiRouters ? _apiRoutes(apiRouters) : false)
      .useIf(enableCacheAndZip ? cache.negotiate() : false)
      .useIf(enableCacheAndZip ? cache.serveIfFound() : false)
      .use(serveApp)

    this.server = http.createServer(this.callback())
  }

  useIf (fn) {
    return fn ? this.use(fn) : this
  }

  listen () {
    const log = this.log
    if (this.wsMessageSets) {
      saneWs(this.server, this.wsMessageSets)
    }
    this.server.listen(this.port, function () {
      log.info(`server listening on ${this.address().port}`)
    })
  }

  close () {
    // todo
  }
}

module.exports = UsefulHttp
