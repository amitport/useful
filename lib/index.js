const Koa = require('koa')
const http = require('http')
const defaults = require('defaults')

const _forceHttps = require('./middlewares/force-https')
const _apiRoutes = require('./middlewares/api-routes')
const disableFrame = require('./middlewares/disable-frame')
const handleRobotsTxt = require('./middlewares/handle-robots-txt')
const _serveStatic = require('./middlewares/serve-static')
const cache = require('./middlewares/cache')
const serveSpa = require('./middlewares/serve-spa')

const conditionalGet = require('koa-conditional-get')
const nativeTemplateRender = require('./native-template-render')

const logger = require('koa-logger')
const sio = require('./sio')

// default ENV is DEBUG=koa*,-koa-router;NODE_ENV=development
class UsefulHttp extends Koa {
  constructor (options) {
    super()

    const {
      log,
      port,
      sioMessageSets,
      apiRoutes,
      enableCacheAndZip,
      dynamicTemplatesRoot,
      forceHttps,
      runningBehindReverseProxy,
      serveStatic,
      spaRoutes
    } = defaults(options, {
      log: {info: console.log.bind(console)},
      port: 5000,
      sioMessageSets: false,
      apiRoutes: false,
      enableCacheAndZip: this.env !== 'development',
      dynamicTemplatesRoot: './views',
      forceHttps: false,
      runningBehindReverseProxy: false,
      serveStatic: ['./static'],
      spaRoutes: ['/', '/index.html']
    })
    Object.assign(this, {log, sioMessageSets, port})

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
      .useIf(apiRoutes ? _apiRoutes(apiRoutes) : false)
      .useIf(enableCacheAndZip ? cache.negotiate() : false)
      .useIf(enableCacheAndZip ? cache.serveIfFound() : false)
      .useIf(serveStatic ? _serveStatic(serveStatic) : false)

    this.server = http.createServer(this.callback())
  }

  useIf (fn) {
    return fn ? this.use(fn) : this
  }

  listen () {
    const log = this.log
    if (this.sioMessageSets) {
      sio(this.server, this.sioMessageSets)
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
