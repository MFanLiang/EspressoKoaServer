/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-09 13:01:38
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-10 17:55:23
 * @FilePath: \koa-generator\middleware\validate\index.js
 * @Description: validate 输入参数校验中间件
 */

const { joiReplace, joiRequired, joiReplaceSpace } = require('./validate');

module.exports = async (ctx, next) => {
  ctx.joiReplace = joiReplace.bind(null, ctx);
  ctx.joiRequired = joiRequired.bind(null, ctx);
  ctx.joiReplaceSpace = joiReplaceSpace.bind(null, ctx);
  await next();
};
