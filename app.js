// 引入 koa 核心主程序
const Koa = require('koa');
// 创建 koa 实例 app
const app = new Koa();

const onerror = require('koa-onerror');
const views = require('koa-views');
const json = require('koa-json');
const cors = require('@koa/cors');
const koajwt = require('koa-jwt');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const staticDir = require('koa-static');
const InitManager = require('./core/initManage');
const jwtUnless = require('./core/jwt_unless');
const { UPLOAD_DIRIMGS } = require('./config/serverConfig');
require('module-alias/register'); // 路径别名

// 加载全局环境配置
InitManager.loadConfig();

// 引入日志格式化输出工具函数
const logsUtils = require("./utils/logs.js");

// 引入中间件
const baseCheckPath = require('./middleware/index.js');
const errorHandler = require('./middleware/errorHandler');
const validate = require('./middleware/validate');
const token = require('./middleware/token');
const myLog = require('./middleware/log');
const response = require('./middleware/response');
const httpProxy = require('./middleware/httpProxy');

// * 引入 NodeJS 环境变量配置
require("./env/env.config.js");

// * error handler
onerror(app);

// * 挂载 middlewares
app.use(errorHandler); // 统一错误异常处理，中间件
app.use(validate); // 验证的方法，中间件
app.use(response); // 返回体，中间件
app.use(token); // token，中间件
app.use(myLog); // 日志中间件，中间件
app.use(baseCheckPath); // 检查文件路径有效性，中间件
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(cors());
app.use(json());
app.use(logger());

// apiHost即是你要转发请求到后端的host，其他的参数可以参考axioshttps://github.com/axios/axios
// 请求转发中间件，暂时只支持转发到另一个地址
// TODO: 支持多转发
// app.use(
//   httpProxy({
//     // 全局端口
//     apiHost: 'localhost:5050'
//   })
// );

// * 注册服务器静态图片资源目录
app.use(staticDir(UPLOAD_DIRIMGS));

app.use(views(__dirname + '/views', {
  extension: 'pug html'
}));

// * 未鉴权接口访问错误处理
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

// * 验证 token
// * token 验证失败的时候会抛出401错误，因此需要添加【错误处理】，而且要放在 app.use(koajwt()) 之前，否则不执行。
app.use(koajwt({
  secret: jwtUnless.secretToken
}).unless({
  custom: ctx => {
    if (jwtUnless.checkIsNonTokenApi(ctx)) {
      // * 需要验证 token 的接口
      return true;
    } else {
      // * 不需要验证 token 的接口
      return false;
    }
  }
}));

// * logger 日志
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  let ms = 0; // 接口耗时
  ms = new Date() - start;
  // 若在开发环境下，记录响应日志；生产环境下不输出，为了减少服务器磁盘使用
  if (process.env.NODE_ENV) {
    logsUtils.logResponse(ctx, ms);
  };
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// * 系统路由注册
InitManager.initCore(app);

module.exports = app;
