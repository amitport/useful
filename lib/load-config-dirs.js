const requireDir = require('require.dir')
const isThere = require('is-there')

const path = require('path')

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
