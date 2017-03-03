#!/usr/bin/env node
if (process.argv[2] === 'build') {
  require('../lib/build')
} else {
  const UsefulHttp = require('../lib/index')
  const path = require('path')
  const fs = require('fs');
  const requireDir = require('require-dir')

  const root = process.cwd()
  const configPath = path.resolve(root, 'useful.config.js')
  const config = (fs.existsSync(configPath)) ? require(configPath) : {}

  if (!config.apiRouters) {
    const files = fs.readdirSync(path.resolve(root, 'server/api-routers'))

    config.apiRouters = files.map(_ => require(path.resolve(root, `server/api-routers/${_}`)))
  }

  new UsefulHttp(config).listen()
}
