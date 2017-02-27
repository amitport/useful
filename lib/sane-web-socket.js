const sioFactory = require('socket.io')
const bluebird = require('bluebird')

class Connection {
  constructor (socket, msgHandlers) {
    socket.connection = this
    Reflect.defineProperty(this, 'socket', {value: socket})

    this.isAuthenticated = false // todo authentication

    msgHandlers.forEach(({id, fn}) => {
      // todo bind fn to connection instead of socket after transforming tbs
      socket.on(id, fn)
    })
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
}

module.exports = function (server, messageSets) {
  const msgHandlers = [];

  Object.entries(messageSets).forEach(([msgSetId, msgSet]) => {
    Object.entries(msgSet).forEach(([msgTypeId, msgHandler]) => {
      const promiseFn = bluebird.method(msgHandler)
      msgHandlers.push({
        id: `${msgSetId}:${msgTypeId}`,
        fn: function (/*connection, */msg, cb) {
          const ackPromise = promiseFn.call(this, /*connection,*/ msg).catch((err) => {
            console.error(err)  // log error
            return Promise.reject(err)
          })
          if (cb) {
            ackPromise
              .catch(cb)
              .then((ack) => {cb(null, ack)})
          }
        }
      })
    })
  })
  return sioFactory(server)
    .on('connection', function (socket) {
      new Connection(socket, msgHandlers)
    })
}
