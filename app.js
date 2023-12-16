const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const staticDir = require('koa-static');
const { UPLOAD_DIRIMGS } = require('./config/serverConfig');
const InitManager = require('./core/initManage');
const cors = require('@koa/cors');
const jwtUnless = require('./config/jwt_unless');
const koajwt = require('koa-jwt');
const sequelizeDB = require('./core/sequelize');

// error handler
onerror(app)

// 挂载 middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(cors())
app.use(json())
app.use(logger())

// 注册服务器静态图片资源目录
app.use(staticDir(UPLOAD_DIRIMGS));

app.use(views(__dirname + '/views', {
  extension: 'pug html'
}))

// logger 日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
});

// 验证 token
// token 验证失败的时候会抛出401错误，因此需要添加【错误处理】，而且要放在 app.use(koajwt()) 之前，否则不执行。
app.use(koajwt({
  secret: jwtUnless.secretToken
}).unless({
  custom: ctx => {
    if (jwtUnless.checkIsNonTokenApi(ctx)) {
      // 需要验证 token 的接口
      return true;
    } else {
      // 不需要验证 token 的接口
      return false;
    }
  }
}))

// 服务接口控制器
InitManager.initCore(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// 自动同步所有模型
// 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// sequelizeDB.mysql_sequelize.sync();

module.exports = app;
