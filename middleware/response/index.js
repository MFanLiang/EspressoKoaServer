/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-09 13:01:38
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-10 17:53:39
 * @FilePath: \koa-generator\middleware\response\index.js
 * @Description: 返回实体中间件
 */

const { success, error } = require('./response');

module.exports = async (ctx, next) => {
  ctx.success = success.bind(null, ctx);
  ctx.error = error.bind(null, ctx);
  await next();
};
