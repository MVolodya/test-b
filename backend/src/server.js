const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const mongoose = require('mongoose');
require('dotenv').config();

const app = new Koa()
const router = new Router()

mongoose.connect(`mongodb://root:LGmC5wA2xjKePuL@ds137863.mlab.com:37863/todo_app`,
{ useNewUrlParser: true })

app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

app.use(respond())

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API server started on ${port}`))
