const sioFactory = require('socket.io')
const bluebird = require('bluebird')

class Connection {
  constructor (socket) {
    this.socket = socket
    this.isAuthenticated = false
  }

  send (msgId, msg) {
    this.socket.emit(msgId, msg)
  }

  subscribe (channelId) {
    this.socket.join(channelId)
  }

  publish (channelId, msgId, msg) {
    this.socket.server.sockets.in(channelId).emit(msgId, msg)
  }

  publishExcludeSelf (channelId, msgId, msg) {
    this.socket.broadcast.to(channelId).emit(msgId, msg)
  }

  static registerMsgHandlers (msgHandlers) {
    Object.entries(msgHandlers).forEach(([msgTypeId, msgHandler]) => {
      this.socket.on(msgTypeId, msgHandler.fn.bind(msgHandler.thisObj, this))
    })
  }
}

module.exports = function (server, msgHandlers) {
  for (let msgHandler of msgHandlers) {
    const promiseFn = bluebird.method(msgHandler.fn)
    msgHandler.fn = function (connection, msg, cb) {
      const ackPromise = promiseFn.call(this, connection, msg).catch((err) => {
        console.error(err)  // log error
        return Promise.reject(err)
      })
      if (cb) {
        ackPromise.then(cb)
      }
    }
  }
  return sioFactory(server)
    .on('connection', function (socket) {
      socket.connection = new Connection(socket)

      Connection.registerMsgHandlers(msgHandlers)
    })
}
