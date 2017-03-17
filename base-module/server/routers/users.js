// todo
// const UserRecord = {
//   uid,
//   displayName,
//   photoURL,
//   email,
//   emailVerified,
//   disabled,
//   providers: [{
//     providerId, uid, displayName, photoURL, email
//   }],
//   metadata: {
//     createdAt, lastSignedInAt
//   }
// }
//
// module.exports = {
//   getAllUsers () {},
//   getUser (uid) {},
//   createUser () {},
//   deleteUser (uid) {},
//   updateUser (uid, properties) {},
//
//   createCustomToken (uid, developerClaims) {},
//   verifyIdToken (idToken) {}
// }

const Router = require('koa-router')

const ensure = require('../auth/ensure')
const User = require('../models/user')
const {encodeUser} = require('../auth/tokens')

const users = Router({prefix: '/users'})

users.get('/me', ensure.user, async (ctx) => {
  const user = await User.findById(ctx.state.user._id, '-_id username role avatarImageUrl', {lean: true}).exec()
  if (user == null) {
    ctx.throw(404)
  }
  ctx.body = user
})

users.get('/', ensure.admin, async (ctx) => {
  ctx.body = await User.find({}, 'username role avatarImageUrl', {lean: true}).exec()
})

users.post('/', ensure.auth, async (ctx) => {
  const user = new User()
  user.username = ctx.request.body.username
  const auth = ctx.state.auth
  user[auth.method] = ctx.state.auth[auth.method]

  try {
    ctx.body = {access: encodeUser(await user.trySave())}
  } catch (err) {
    if (err.name === 'ValidationError' &&
      err.errors.hasOwnProperty('username') &&
      err.errors.username.kind === 'Duplicate value') {
      ctx.throw(409)
    }
    throw err
  }
})

module.exports = users
