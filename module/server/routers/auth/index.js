const Router = require('koa-router')
const {googleCb} = require('./google')
const {signInWithEmail, verifyEmail} = require('./email')

const auth = Router({prefix: '/auth'})

auth.get('/google', googleCb)

auth.post('/actions/sign-in-with-email', signInWithEmail)
auth.get('/actions/verify-email', verifyEmail)

module.exports = auth
