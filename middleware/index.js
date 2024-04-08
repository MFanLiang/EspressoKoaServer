/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 20:10:43
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 22:59:35
 * @FilePath: \koa-generator\middleware\index.js
 * @Description: 公共方法中间件
 */

const { accessSync, constants } = require("fs");

/** 
 * 验证文件系统是否存在
 * @param String path 文件路径
 */
exports.checkPath = (ctx, path) => {

  try {
    // * 针对 accessSync API 的用法参考：https://nodejs.cn/api/fs/fs_accesssync_path_mode.html
    const fileProtype = accessSync(path, constants.R_OK, constants.W_OK);
    if (fileProtype === undefined) return true;
  } catch (error) {
    ctx.errorLog('文件不存在！', error);
    return false;
  }
};

module.exports = async (ctx, next) => {
  ctx.checkPath = this.checkPath.bind(null, ctx); // 文件存在性检验
  await next();
};
