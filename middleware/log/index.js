/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-09 13:01:38
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-10 17:53:26
 * @FilePath: \koa-generator\middleware\log\index.js
 * @Description: 日志中间件
 */

const { logResponse, logHandle, logError, logInfo } = require('./log');

module.exports = async (ctx, next) => {
  ctx.responseLog = logResponse.bind(null, ctx);
  ctx.consoleLog = logInfo.bind(null, ctx);
  ctx.errorLog = logError.bind(null, ctx);
  ctx.handleLog = logHandle.bind(null, ctx);
  await next();
};
