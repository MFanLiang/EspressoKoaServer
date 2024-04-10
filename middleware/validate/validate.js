/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-09 13:01:38
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-10 17:55:39
 * @FilePath: \koa-generator\middleware\validate\validate.js
 * @Description: 验证方法封装
 */

const Joi = require('joi'); // 参数校验

/**
 * 通配符替换
 */
exports.joiReplace = () => {
  // eslint-disable-next-line quotes
  return Joi.string().replace(/%/gi, `\\%`).replace(/_/gi, `\\_`);
};
/**
 * %替换
 */
exports.joiReplaceSpace = () => {
  // eslint-disable-next-line quotes
  return Joi.string().replace(/%/gi, `\\%`);
};

/**
 * 必备字符
 */
exports.joiRequired = (ctx, name) => {
  return Joi.required()
    .invalid('')
    .error(new Error(`${name}参数不得为空`));
};
