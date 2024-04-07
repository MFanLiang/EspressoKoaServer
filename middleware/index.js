/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 20:10:43
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 20:10:53
 * @FilePath: \koa-generator\middleware\index.js
 * @Description: 公共方法中间件
 */

const fs = require("fs");

/** 
 * 验证文件系统是否存在
 * @param String path 文件路径
 */
exports.checkPath = (ctx, path) => {
  try {
    fs.accessSync(path);
  } catch (error) {
    ctx.errorLog('文件不存在！', error);
    return false;
  }
};

module.exports = async (ctx, next) => {
  ctx.checkPath = this.checkPath.bind(null, ctx); // 文件存在性检验
  await next();
};
