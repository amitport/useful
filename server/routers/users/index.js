const userRecord = {
  uid: 1,
  displayName: 'me',
  photoURL: 'a',
  email: 'a@a.com',
  emailVerified: 'a',
  disabled: false,
  // providers: [{
  //   providerId, uid, displayName, photoURL, email
  // }],
  metadata: {
    createdAt: 'now', lastSignedInAt: 'then'
  }
}

const Router = require('koa-router')

module.exports = new Router({prefix: '/xx2'})
  // .post('/auth/actions/sign-in', (ctx) => {
  //   // todo sign in
  // })
  // .post('/auth/actions/sign-out', (ctx) => {
  //   // todo sign in
  // })
  .get('/', (ctx) => {
    console.log('what?')
    ctx.body = [1, 3, 54]
  })
  // .get('/users/me', (ctx) => {
  //   ctx.body = userRecord
  // })
