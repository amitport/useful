#!/usr/bin/env node
if (process.argv[2] === 'build') {
  require('../lib/build')
} else {
  const UsefulHttp = require('../lib/index')
  const path = require('path')
  const fs = require('fs')

  const root = process.cwd()
  const configPath = path.resolve(root, 'useful.config.js')
  const config = (fs.existsSync(configPath)) ? require(configPath) : {}

  const loadConfigDirs = require('../lib/load-config-dirs')
  Object.assign(config, loadConfigDirs(`${__dirname}/../module`, root))

  new UsefulHttp(config).listen()
}
