const Router = require('koa-router');

module.exports = new Router().get('/test', (ctx) => {ctx.body = 'test'}).routes()