/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-09 13:01:38
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-10 17:53:57
 * @FilePath: \koa-generator\middleware\token\index.js
 * @Description: token中间件
 */

const { getToken, checkToken, decryptToken, decryptRSAToken, verifyToken } = require('./token');

module.exports = async (ctx, next) => {
  ctx.getToken = getToken.bind(null, ctx);
  ctx.checkToken = checkToken.bind(null, ctx);
  ctx.verifyToken = verifyToken.bind(null, ctx);
  ctx.decryptToken = decryptToken.bind(null, ctx);
  ctx.decryptRSAToken = decryptRSAToken.bind(null, ctx);
  await next();
};
