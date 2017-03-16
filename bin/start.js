#!/usr/bin/env node --preserve-symlinks
if (process.argv[2] === 'build') {
  require('../lib/build')
} else {
  const UsefulHttp = require('../lib/index')
  const path = require('path')
  const fs = require('fs')

  const root = process.cwd()
  const configPath = path.resolve(root, 'useful.config.js')
  const config = (fs.existsSync(configPath)) ? require(configPath) : {}

  if (!config.apiRouters) {
    const files = fs.readdirSync(path.resolve(root, 'server/api-routers'))

    config.apiRouters = files.map(_ => require(path.resolve(root, `server/api-routers/${_}`)))
  }

  if (__dirname !== root) {
    config.apiRouters.push(...(fs.readdirSync(path.resolve(__dirname, '../server/api-routers'))
                            .map(_ => require(path.resolve(__dirname, `../server/api-routers/${_}`)))))
  }
  new UsefulHttp(config).listen()
}
