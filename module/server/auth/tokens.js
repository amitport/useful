const jwt = require('jwt-simple')
const moment = require('moment')

const secret = 'auth.tokens.secret' // todo read from var

module.exports = {
  encodeUser ({_id, role}) {
    return jwt.encode({sub: _id, role}, secret)
  },
  decodeUser (token) {
    const {sub, role} = jwt.decode(token, secret)

    return {_id: sub, role}
  },
  encodeAuth (auth) {
    return jwt.encode({
      auth,
      exp: moment().add(1, 'hours').unix()
    },
      secret)
  },
  decodeAuth (token) {
    return jwt.decode(token, secret).auth
  }
}
