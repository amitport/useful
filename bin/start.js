#!/usr/bin/env node
if (process.argv[2] === 'build') {
  require('../lib/build')
} else {
  const UsefulHttp = require('../lib/index')
  const path = require('path')
  const requireDir = require('require-dir')

  const root = process.cwd()

  let config
  try {
    // todo check if file exists
    config = require(path.resolve(root, 'useful.config'))
  } catch (e) {
    console.warn('failed to load \'useful.config\'', e)
    config = {}
  }

  if (!config.apiRoutes) {
    try {
      config.apiRoutes = Object.values(requireDir(path.resolve(root, 'api-routes')))
    } catch (e) {
    }
  }

  if (!config.sioMessageHandlers) {
    try {
      config.sioMessageHandlers = Object.values(requireDir(path.resolve(root, 'sio-nessage-handlers')))
    } catch (e) {
    }
  }

  new UsefulHttp(config).listen()
}
