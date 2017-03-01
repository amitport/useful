#!/usr/bin/env node
const UsefulHttp = require('../lib/index')
const path = require('path')
const requireDir = require('require-dir')

const baseDir = process.cwd()

let config
try {
  config = require(path.resolve(baseDir, 'useful.config'))
} catch (e) {
  console.warn('failed to load \'useful.config\'', e)
  config = {}
}

if (!config.apiRoutes) {
  try {
    config.apiRoutes = Object.values(requireDir(path.resolve(baseDir, 'api-routes')))
  } catch (e) {}
}

if (!config.sioMessageHandlers) {
  try {
    config.sioMessageHandlers = Object.values(requireDir(path.resolve(baseDir, 'sio-nessage-handlers')))
  } catch (e) {}
}

new UsefulHttp(config).listen()
