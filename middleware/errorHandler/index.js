/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 20:16:16
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 21:24:45
 * @FilePath: \koa-generator\middleware\errorHandler\index.js
 * @Description: 统一错误异常处理
 */

/** 捕获异常生成返回的接口 */
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log('error :>> ', error);
    // mysql报错处理
    if (error.errno) {
      // sql报错处理
      ctx.errorLog('sql查询报错', error); // 记录异常日志
      ctx.error([0, 'sql查询报错'], error.sqlMessage);
    } else if (error.original && error.original.errno) {
      // sequelize报错处理
      ctx.errorLog('seq查询报错', error.original); // 记录异常日志
      ctx.error([0, 'seq查询报错'], error.original.sqlMessage);
    } else if (error.code) {
      ctx.errorLog(error.code, error); // 记录异常日志
      ctx.error([error.code, error.msg]);
    } else {
      // 对于未知的异常，采用特别处理
      ctx.errorLog('未知的异常', error); // 记录异常日志
      ctx.error([-1, '未知的异常'], 'we made a mistake');
    }
  }
};

module.exports = catchError;
