
const isThere = require('is-there')

const path = require('path')
const fs = require('fs')

function requireDir(dir) {
  return fs.readdirSync(dir).reduce((config, filename) => {
    const key = filename.replace(/\.js$/i, '')
    config[key] = require(path.resolve(dir, filename))
    return config
  }, {})
}

function loadConfigDir (directories, configDirName) {
  return Object.assign({}, ...directories.map((dir) => {
        // normalize dir
    dir = path.resolve(dir, configDirName)

    return isThere(dir) ? requireDir(dir) : {}
  }))
}

module.exports = function loadConfigDirs (...directories) {
  return  {
    routers: loadConfigDir(directories, 'server/routers'),
    messageSets: loadConfigDir(directories, 'server/message-sets')
  }
}
