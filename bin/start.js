#!/usr/bin/env node --harmony
const UsefulHttp = require('../lib/index')
const path = require('path')
const requireDir = require('require-dir')

const baseDir = process.cwd()

let config
try {
  config = require(path.resolve(baseDir, 'useful.config'))
} catch (e) {
  console.warn('failed to load \'useful.config\'')
  config = {}
}
if (!config.apiRoutes) {
  try {
    config.apiRoutes = Object.values(requireDir(path.resolve(baseDir, 'api-routes')))
  } catch (e) {}
}

new UsefulHttp(config).listen()
