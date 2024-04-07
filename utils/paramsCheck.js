/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 13:37:38
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 13:37:42
 * @FilePath: \koa-generator\utils\paramsCheck.js
 * @Description: 参数字段检查工具函数
 */

/**
 * 表单参数检查
 * @param object params 接收参数
 * @param array requestParam 必有参数
 */
exports.check = (params, requestParam) => {
  if (typeof params !== typeof requestParam) throw new Error('参数校验失败');
  const keys = Object.keys(params);
  for (let index = 0; index < requestParam.length; index++) {
    const element = requestParam[index];
    if (!keys.some(item => item === element)) {
      return `${element}字段必填`;
    } else if (index + 1 === requestParam.length) {
      return true;
    }
  }
};
